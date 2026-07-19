export type Guide = {
  slug: string;
  title: string;
  eyebrow: string;
  readingTime: string;
  summary: string;
  whoFor: string;
  concepts: string[];
  sections: { heading: string; body: string[] }[];
  related: string[];
  products: string[];
  comingSoon?: boolean;
};

const starter = (guide: Omit<Guide, 'eyebrow' | 'readingTime'>): Guide => ({
  eyebrow: 'Luster Learning / Foundations', readingTime: '6 min read', ...guide,
});

export const GUIDES: Guide[] = [
  starter({
    slug: 'builder-gel-foundations', title: 'Builder Gel Foundations',
    summary: 'A clear starting point for understanding what builder gel does, how structure supports wear, and how to build a repeatable service.',
    whoFor: 'New and developing nail artists who want a dependable framework before adding speed or complexity.',
    concepts: ['Structure follows preparation', 'Viscosity changes the workflow', 'A balanced apex supports the free edge'],
    sections: [
      { heading: 'Start with the job of the product', body: ['Builder gel adds controlled structure over a natural nail or enhancement. It is not a substitute for preparation, and more product does not automatically mean more strength.', 'The goal is a balanced surface that follows the client’s nail, supports the stress area, and can be finished cleanly.'] },
      { heading: 'Think in layers', body: ['A thin, even foundation layer improves contact. The structure layer provides the body of the service. A final refinement pass creates the surface and silhouette you want.', 'Keep the product inside the prepared nail area and check the sidewalls before curing.'] },
      { heading: 'Build a repeatable service', body: ['Choose a gel format that matches your working pace, keep your lamp and tools consistent, and record what changes when a service performs differently. Consistency is more useful than chasing a single perfect technique.'] },
    ], related: ['nail-preparation-and-retention', 'builder-gel-application'], products: ['builder-in-a-bottle', 'hard-builder-gel'],
  }),
  starter({
    slug: 'nail-preparation-and-retention', title: 'Nail Preparation & Retention',
    summary: 'A practical preparation sequence for clean application, thoughtful product placement, and better retention troubleshooting.',
    whoFor: 'Artists who see lifting, inconsistent wear, or service-to-service variation.',
    concepts: ['Clean, dry, and gently prepared', 'Avoid touching the nail plate', 'Find the failure pattern before changing products'],
    sections: [
      { heading: 'Preparation is a system', body: ['Remove surface shine gently, tidy the cuticle area without abrading living tissue, and remove dust thoroughly. The finished nail should be clean and dry before product is placed.', 'Use the prep products and lamp system you understand, and follow their stated instructions.'] },
      { heading: 'Placement matters', body: ['Keep product away from skin and leave a controlled margin at the cuticle. Flooding can create a weak edge and can increase the chance of skin contact.', 'If the nail is damp, oily, damaged, or unusually flexible, adjust the service plan rather than forcing the same structure.'] },
      { heading: 'Read the evidence', body: ['Lifting at the cuticle, sidewall separation, and free-edge wear point to different parts of the workflow. Photographing the result and noting the client’s habits can help you test one change at a time.'] },
    ], related: ['builder-gel-foundations', 'troubleshooting-lifting'], products: ['builder-in-a-bottle'],
  }),
  starter({
    slug: 'choosing-flex-vs-control-builder', title: 'Choosing Flex vs Control Builder',
    summary: 'How to choose a builder gel format by matching product movement, nail condition, service length, and your own working style.',
    whoFor: 'Artists deciding between a brush format and a firmer jar format for different services.',
    concepts: ['Flex is movement, not weakness', 'Control is a workflow choice', 'Client nail and service design come first'],
    sections: [
      { heading: 'Define the service first', body: ['A short natural overlay, a structured extension, and a sculpted correction have different demands. Start with the shape, length, and expected service interval before choosing a formula.', 'A product that feels comfortable for one service may feel slow or too mobile for another.'] },
      { heading: 'Flex and movement', body: ['A more flexible workflow can suit natural nails that move with everyday use. Work in thinner, controlled layers and keep the perimeter tidy.', 'Flex does not mean applying more. It means allowing the material and the natural nail to work together within the intended service.'] },
      { heading: 'Control and structure', body: ['A firmer format can give experienced artists more time and support for sculpted structure. Use small amounts, place the bulk where the nail needs it, and refine before finishing.', 'Builder in a Bottle offers a precision brush workflow; the hard builder gel jar offers a more sculptural format.'] },
    ], related: ['builder-gel-foundations', 'builder-gel-application'], products: ['builder-in-a-bottle', 'hard-builder-gel'],
  }),
  starter({
    slug: 'builder-gel-application', title: 'Builder Gel Application',
    summary: 'A measured application flow from preparation to final refinement, with checkpoints that make the process easier to repeat.',
    whoFor: 'Artists building confidence with structured gel overlays and professional application habits.',
    concepts: ['Thin foundation', 'Controlled structure', 'Inspect before curing'],
    sections: [
      { heading: 'Prepare and plan', body: ['Complete preparation, choose the right amount of product, and decide where the apex or highest point belongs before you begin. Good planning reduces unnecessary filing.'] },
      { heading: 'Place the foundation', body: ['Apply a thin, even layer according to the product’s instructions. Keep the brush or tool controlled and avoid repeatedly brushing the nail once the layer is even.'] },
      { heading: 'Add structure', body: ['Place the main bead through the centre of the nail and guide it toward the perimeter without touching skin. Turn the hand if helpful, then inspect the side profile and free edge before curing.'] },
      { heading: 'Refine and finish', body: ['After curing, refine only where needed. Check the sidewalls, apex, surface transitions, and free edge from multiple angles before applying the finishing layer.'] },
    ], related: ['apex-and-structure', 'safe-product-removal'], products: ['builder-in-a-bottle', 'hard-builder-gel'],
  }),
  starter({
    slug: 'troubleshooting-lifting', title: 'Troubleshooting Lifting',
    summary: 'A diagnostic approach to lifting that helps you isolate preparation, placement, curing, and service-design variables.',
    whoFor: 'Artists who want a calm, evidence-based way to improve retention rather than changing everything at once.',
    concepts: ['Map where lifting begins', 'Change one variable at a time', 'Check lamp, layers, and contact'],
    sections: [
      { heading: 'Locate the pattern', body: ['Cuticle lifting often points you toward preparation, product placement, or skin contact. Sidewall lifting can point toward perimeter control or nail movement. Free-edge wear may involve length, shape, or daily use.'] },
      { heading: 'Review the workflow', body: ['Confirm the nail was clean and dry, the product stayed off skin, each layer matched the intended thickness, and the lamp was compatible and used as directed.'] },
      { heading: 'Test one change', body: ['Document the client, nail condition, product format, and service date. Adjust one part of the workflow at the next visit so you can learn what actually affected the result.'] },
    ], related: ['nail-preparation-and-retention', 'troubleshooting-heat-spikes'], products: ['builder-in-a-bottle'],
  }),
];

const comingSoon = [
  ['apex-and-structure', 'Apex & Structure'], ['rebalancing-and-fill-maintenance', 'Rebalancing & Fill Maintenance'],
  ['safe-product-removal', 'Safe Product Removal'], ['troubleshooting-heat-spikes', 'Troubleshooting Heat Spikes'],
  ['product-storage-and-handling', 'Product Storage & Handling'],
];

for (const [slug, title] of comingSoon) GUIDES.push({ slug, title, eyebrow: 'Luster Learning', readingTime: 'Coming soon', summary: 'A practical guide for building a more consistent, thoughtful studio workflow.', whoFor: 'Nail artists building a professional practice.', concepts: [], sections: [], related: [], products: [], comingSoon: true });

export function getGuide(slug: string) { return GUIDES.find((guide) => guide.slug === slug); }
