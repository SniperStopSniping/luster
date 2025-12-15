'use client';

import { useEffect, useRef } from 'react';

type ScrollSection = {
  id?: string;
  el: HTMLElement;
};

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function SectionScrollController() {
  const animatingRef = useRef(false);
  const wheelAccumRef = useRef(0);
  const wheelTimerRef = useRef<number | null>(null);

  const touchStartYRef = useRef<number | null>(null);
  const touchLastYRef = useRef<number | null>(null);

  useEffect(() => {
    const container = document.getElementById('main-content');
    if (!container) return;

    const getSections = (): ScrollSection[] => {
      const els = Array.from(
        container.querySelectorAll<HTMLElement>('[data-scroll-section]')
      );
      return els.map((el) => ({ id: el.id || undefined, el }));
    };

    const getTopInContainer = (el: HTMLElement) => {
      const cRect = container.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      return container.scrollTop + (eRect.top - cRect.top);
    };

    const getClosestIndex = () => {
      const sections = getSections();
      const y = container.scrollTop;
      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      sections.forEach((s, i) => {
        const top = getTopInContainer(s.el);
        const dist = Math.abs(y - top);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      return { sections, index: bestIdx };
    };

    const animateTo = (targetTop: number, duration = 1350) => {
      if (animatingRef.current) return;
      animatingRef.current = true;

      const start = container.scrollTop;
      const delta = targetTop - start;
      let startTime: number | null = null;

      const step = (time: number) => {
        if (startTime === null) startTime = time;
        const t = Math.min(1, (time - startTime) / duration);
        container.scrollTo(0, start + delta * easeInOutCubic(t));
        if (t < 1) requestAnimationFrame(step);
        else animatingRef.current = false;
      };

      requestAnimationFrame(step);
    };

    const scrollToIndex = (idx: number, duration = 1350) => {
      const { sections } = getClosestIndex();
      const clamped = Math.max(0, Math.min(sections.length - 1, idx));
      const targetTop = getTopInContainer(sections[clamped].el);
      animateTo(targetTop, duration);
    };

    const scrollToId = (id: string, duration = 1250, offset = 0) => {
      const el = document.getElementById(id);
      if (!el) return;
      const targetTop = getTopInContainer(el) - offset;
      animateTo(targetTop, duration);
    };

    // Intercept hash link clicks so they scroll the container (not window).
    const onClickCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const a = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      if (!id) return;

      e.preventDefault();
      history.replaceState(null, '', `#${id}`);
      scrollToId(id, 1250, 0);
    };
    container.addEventListener('click', onClickCapture, true);

    // If we land on a hash, align on mount.
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      if (id) {
        // Let layout settle.
        window.setTimeout(() => scrollToId(id, 0, 0), 0);
      }
    }

    // Wheel: one section per gesture; slow animation.
    const onWheel = (e: WheelEvent) => {
      if (animatingRef.current) return;
      // Prevent native free-scroll; we want section steps.
      e.preventDefault();

      wheelAccumRef.current += e.deltaY;

      if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = window.setTimeout(() => {
        const delta = wheelAccumRef.current;
        wheelAccumRef.current = 0;
        if (Math.abs(delta) < 18) return;

        const { index } = getClosestIndex();
        scrollToIndex(index + (delta > 0 ? 1 : -1), 1450);
      }, 60);
    };
    container.addEventListener('wheel', onWheel, { passive: false });

    // Touch: on swipe end, step a section.
    const onTouchStart = (e: TouchEvent) => {
      if (animatingRef.current) return;
      const y = e.touches[0]?.clientY;
      if (typeof y !== 'number') return;
      touchStartYRef.current = y;
      touchLastYRef.current = y;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (animatingRef.current) return;
      const y = e.touches[0]?.clientY;
      if (typeof y !== 'number') return;
      touchLastYRef.current = y;
      // Prevent native momentum scroll.
      e.preventDefault();
    };

    const onTouchEnd = () => {
      if (animatingRef.current) return;
      const startY = touchStartYRef.current;
      const lastY = touchLastYRef.current;
      touchStartYRef.current = null;
      touchLastYRef.current = null;
      if (typeof startY !== 'number' || typeof lastY !== 'number') return;

      const delta = startY - lastY; // positive = swipe up (next)
      if (Math.abs(delta) < 36) return;

      const { index } = getClosestIndex();
      scrollToIndex(index + (delta > 0 ? 1 : -1), 1450);
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd);

    return () => {
      container.removeEventListener('click', onClickCapture, true);
      container.removeEventListener('wheel', onWheel as EventListener);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove as EventListener);
      container.removeEventListener('touchend', onTouchEnd);
      if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);
    };
  }, []);

  return null;
}


