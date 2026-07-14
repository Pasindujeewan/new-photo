# Ceylon Frame Studio

A production-ready photography studio website built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, React Hook Form, Zod, and `next/image`.

## Run Locally

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` and update public studio details. Never put private API keys in variables beginning with `NEXT_PUBLIC_`.

## Admin Dashboard

The admin area is available at `/admin/login`. Set `ADMIN_PASSWORD` in `.env.local` before using it. Contact form submissions are saved to local JSON storage under `data/admin/messages.json`, and albums added from the dashboard are saved under `data/admin/albums.json`.

This is intentionally mock storage for local development. Replace it with a real database before production.

For fast direct image uploads from the admin dashboard, create an unsigned Cloudinary upload preset and set:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-unsigned-preset
```

Keep `CLOUDINARY_API_SECRET` server-only. Never expose it with `NEXT_PUBLIC_`.

## Replace Mock Data

Mock content lives in `src/data`. A future database can replace those exports behind repository functions without changing page components. Placeholder adapters are in `src/lib/services` for database, Redis cache, cloud storage, and email delivery.

Suggested next integrations:

- Database: add Prisma or a MongoDB client in `src/lib/services/database.ts`.
- Cloud images: replace Unsplash URLs with Cloudinary URLs and keep `next.config.ts` remote patterns updated.
- Email: connect `src/lib/services/email.ts` to your provider from the contact route.
- Cache: use `src/lib/services/cache.ts` for Redis-backed album/service reads.

## Quality Checks

After installing dependencies, run:

```bash
pnpm typecheck
pnpm lint
pnpm build
```
