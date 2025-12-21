export function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-1 border-b border-ink/10 py-6">
      <dt className="w-32 text-xs uppercase tracking-widest text-ink/40">{label}</dt>
      <dd className="text-sm text-ink/90">{value}</dd>
    </div>
  );
}

