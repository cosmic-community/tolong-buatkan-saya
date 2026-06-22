# Komik Persahabatan

![App Preview](https://imgix.cosmicjs.com/34b74c70-6e46-11f1-a7b1-a329933c1eaf-autopilot-photo-1529156069898-49953e39b3ac-1782138323591.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern comic reader web application built with Next.js and powered by [Cosmic](https://www.cosmicjs.com). This app showcases a heartwarming comic story about the friendship between a boy and two girls, featuring rich character profiles and an immersive scene-by-scene reading experience.

## Features

- 📖 **Immersive Comic Reader** — Read scenes in order with beautiful illustrations, narration, and dialog
- 👥 **Character Profiles** — Explore detailed profiles for each character including personality, role, and signature colors
- 🎨 **Modern Responsive Design** — Optimized for desktop, tablet, and mobile reading
- 🔢 **Sequential Scene Navigation** — Move forward and backward through the comic story
- ⚡ **Fast & SEO-Optimized** — Server-side rendering with Next.js App Router
- 🌈 **Character-Color Theming** — Each character has their own brand color for visual identity

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a3945825b2ac5cef3dfd124&clone_repository=6a39466d5b2ac5cef3dfd185)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Tolong buatkan saya sekerip komik tentang persahabatan cowok dan 2 cewek"

### Code Generation Prompt

> Build a Next.js application for a website called "Tolong buatkan saya". The content is managed in Cosmic CMS with the following object types: characters, scenes. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: Tolong buatkan saya sekerip komik tentang persahabatan cowok dan 2 cewek

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) — React framework with App Router
- [React 19](https://react.dev) — UI library
- [TypeScript](https://www.typescriptlang.org) — Type safety
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with a bucket containing `characters` and `scenes` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables (these are automatically configured when cloning through Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

Fetching all scenes sorted by their sequence number:

```typescript
import { cosmic } from '@/lib/cosmic'

const response = await cosmic.objects
  .find({ type: 'scenes' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const scenes = response.objects.sort((a, b) => {
  const orderA = a.metadata?.nomor_urut ?? 0
  const orderB = b.metadata?.nomor_urut ?? 0
  return orderA - orderB
})
```

Fetching a single character by slug:

```typescript
const response = await cosmic.objects
  .findOne({ type: 'characters', slug })
  .depth(1)

const character = response.object
```

## Cosmic CMS Integration

This application uses two object types from your Cosmic bucket:

- **Characters** (`characters`) — Contains `nama`, `peran`, `kepribadian`, `ilustrasi`, and `warna` metafields
- **Scenes** (`scenes`) — Contains `judul`, `nomor_urut`, `lokasi`, `narasi`, `dialog`, `karakter`, and `ilustrasi_adegan` metafields

Scenes are connected to characters via the `karakter` object relationship metafield, and using the `depth(1)` parameter, character data is automatically included in scene queries. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push your code to a Git repository
2. Import the project into [Vercel](https://vercel.com)
3. Add the environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push your code to a Git repository
2. Import the project into [Netlify](https://netlify.com)
3. Add the environment variables in the Netlify dashboard
4. Deploy

For production, set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your hosting platform's dashboard.
<!-- README_END -->