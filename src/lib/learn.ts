export type Guide = {
  slug: string;
  title: string;
  summary: string;
  readingTime: string;
  sections: { heading: string; paragraphs: string[] }[];
  related: string[];
  comingSoon?: boolean;
};

export const GUIDES: Guide[] = [
  {
    slug: 'builder-gel-foundations', title: 'Builder Gel Foundations', readingTime: '6 min read',
    summary: 'Understand the role of builder gel, how structure supports a service, and how to create a repeatable foundation.',
    sections: [
      { heading: 'Start with the job of the product', paragraphs: ['Builder gel adds controlled structure over a natural nail or enhancement. It is not a replacement for preparation, and more product does not automatically mean more strength.', 'The goal is a balanced surface that follows the client’s nail, supports the stress area, and can be finished cleanly.'] },
      { heading: 'Build in layers', paragraphs: ['A thin, even foundation layer improves contact. The structure layer provides the body of the service. A final refinement pass creates the surface and silhouette you want.', 'Keep product inside the prepared nail area and check the sidewalls before curing.'] },
      { heading: 'Make it repeatable', paragraphs: ['Keep your lamp, tools, and application sequence consistent. When a service performs differently, record what changed instead of changing everything at once.'] },
    ], related: ['nail-preparation-and-retention', 'builder-gel-application'],
  },
  {
    slug: 'nail-preparation-and-retention', title: 'Nail Preparation & Retention', readingTime: '6 min read',
    summary: 'A practical preparation sequence for clean application, thoughtful product placement, and better retention troubleshooting.',
    sections: [
      { heading: 'Preparation is a system', paragraphs: ['Remove surface shine gently, tidy the cuticle area without abrading living tissue, and remove dust thoroughly. The nail should be clean and dry before product is placed.', 'Follow the instructions for the prep products and lamp system you use.'] },
      { heading: 'Placement matters', paragraphs: ['Keep product away from skin and leave a controlled margin at the cuticle. Flooding can create a weak edge and increase the chance of skin contact.', 'If the nail is damp, oily, damaged, or unusually flexible, adjust the service plan rather than forcing the same structure.'] },
      { heading: 'Read the evidence', paragraphs: ['Cuticle lifting, sidewall separation, and free-edge wear point to different parts of the workflow. Photograph the result and test one change at a time.'] },
    ], related: ['builder-gel-foundations', 'troubleshooting-lifting'],
  },
  {
    slug: 'choosing-flex-vs-control-builder', title: 'Choosing Flex vs Control Builder', readingTime: '5 min read',
    summary: 'Choose a builder gel format by matching product movement, nail condition, service length, and working style.',
    sections: [
      { heading: 'Define the service first', paragraphs: ['A short natural overlay, a structured extension, and a sculpted correction have different demands. Start with shape, length, and expected service interval.'] },
      { heading: 'Flex and movement', paragraphs: ['A more flexible workflow can suit natural nails that move with everyday use. Work in thinner, controlled layers and keep the perimeter tidy. Flex does not mean applying more.'] },
      { heading: 'Control and structure', paragraphs: ['A firmer format can give artists more time and support for sculpted structure. Use small amounts, place the bulk where the nail needs it, and refine before finishing.'] },
    ], related: ['builder-gel-foundations', 'builder-gel-application'],
  },
  {
    slug: 'builder-gel-application', title: 'Builder Gel Application', readingTime: '7 min read',
    summary: 'A measured application flow from preparation to final refinement, with checkpoints that make the process repeatable.',
    sections: [
      { heading: 'Prepare and plan', paragraphs: ['Complete preparation, choose the right amount of product, and decide where the apex or highest point belongs before you begin.'] },
      { heading: 'Place the foundation', paragraphs: ['Apply a thin, even layer according to the product instructions. Keep the brush controlled and avoid repeatedly brushing once the layer is even.'] },
      { heading: 'Add structure', paragraphs: ['Place the main bead through the centre of the nail and guide it toward the perimeter without touching skin. Inspect the side profile and free edge before curing.'] },
      { heading: 'Refine and finish', paragraphs: ['Refine only where needed. Check sidewalls, apex, surface transitions, and free edge from multiple angles before applying the finishing layer.'] },
    ], related: ['apex-and-structure', 'safe-product-removal'],
  },
  {
    slug: 'troubleshooting-lifting', title: 'Troubleshooting Lifting', readingTime: '5 min read',
    summary: 'A diagnostic approach to lifting that helps isolate preparation, placement, curing, and service-design variables.',
    sections: [
      { heading: 'Locate the pattern', paragraphs: ['Cuticle lifting often points toward preparation, product placement, or skin contact. Sidewall lifting can point toward perimeter control or nail movement. Free-edge wear may involve length, shape, or daily use.'] },
      { heading: 'Review the workflow', paragraphs: ['Confirm the nail was clean and dry, product stayed off skin, each layer matched the intended thickness, and the lamp was compatible and used as directed.'] },
      { heading: 'Test one change', paragraphs: ['Document the nail condition, product format, service date, and client habits. Adjust one part of the workflow at the next visit so you can learn what affected the result.'] },
    ], related: ['nail-preparation-and-retention', 'troubleshooting-heat-spikes'],
  },
];

const COMING_SOON: [string, string][] = [
  ['apex-and-structure', 'Apex & Structure'], ['rebalancing-and-fill-maintenance', 'Rebalancing & Fill Maintenance'],
  ['safe-product-removal', 'Safe Product Removal'], ['troubleshooting-heat-spikes', 'Troubleshooting Heat Spikes'],
  ['product-storage-and-handling', 'Product Storage & Handling'],
];
for (const [slug, title] of COMING_SOON) GUIDES.push({ slug, title, readingTime: 'Coming soon', summary: 'A practical guide for building a more consistent studio workflow.', sections: [], related: [], comingSoon: true });

export function getGuide(slug: string) { return GUIDES.find((guide) => guide.slug === slug); }
