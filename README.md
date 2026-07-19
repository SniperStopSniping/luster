# Luster Studio

The public Luster Studio website at https://lusterstudio.ca. It combines the product storefront with professional education, artist community, and wholesale inquiry paths.

## Site architecture

- `/` — homepage with hero, promotions, products, Learn, Join, Wholesale, and About sections.
- `/shop` and `/shop/[slug]` — repository-backed product storefront.
- `/learn` and `/learn/[slug]` — permanent education hub and guide URLs. Incomplete guides use a Coming Soon state rather than a 404.
- `/promotions` — honest empty state for future campaigns.
- `/join` — inclusive artist opportunity and community form.
- `/wholesale` — wholesale inquiry form.
- `/studio` — compatibility redirect to `/join`.

## Inquiry email configuration

The public recipient is hard-coded as `hello@lusterstudio.ca` in `src/lib/site.ts`. Provider secrets are never stored in source control. Configure these deployment environment variables before enabling delivery:

- `RESEND_API_KEY` — provider secret.
- `LUSTER_EMAIL_FROM` — verified sender address supplied by the email provider.

The API returns success to the form only after the email provider returns a successful response. Missing configuration and provider failures remain visible as errors.

## Verification

Run `npm run typecheck`, `npm run lint`, and `npm run build`. The redesign must also be checked across all approved Learn routes, form validation states, responsive layouts, keyboard access, canonical metadata, sitemap, robots, and broken links.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
