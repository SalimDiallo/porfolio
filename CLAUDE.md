# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15-based portfolio website for Salim Diallo, showcasing work as a Data IA and Software Engineer. The site features a blog, project gallery, about page, and work showcase. It uses the Once UI design system for component primitives and styling.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Sass + Once UI CSS tokens
- **UI Components**: `@once-ui-system/core` for all primitives (Flex, Column, Text, etc.)
- **Content**: MDX for blog posts via `next-mdx-remote` and `@next/mdx`
- **Code Quality**: Biome for formatting/linting (not ESLint/Prettier)
- **Package Manager**: pnpm

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Format code with Biome
pnpm biome-write

# Lint with Next.js linter
pnpm lint
```

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with theme system
│   ├── page.tsx             # Home page
│   ├── about/page.tsx       # About page
│   ├── work/                # Work portfolio
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx  # Dynamic work project pages
│   ├── blog/                # Blog section
│   │   ├── page.tsx
│   │   ├── [slug]/page.tsx  # Dynamic blog post pages
│   │   └── posts/           # MDX blog posts
│   ├── gallery/page.tsx     # Gallery (disabled by default)
│   └── api/                 # API routes
│       ├── authenticate/    # Password protection for routes
│       ├── check-auth/      # Auth verification
│       ├── og/              # Open Graph image generation
│       └── rss/             # RSS feed
├── components/              # React components
│   ├── Header.tsx           # Site navigation
│   ├── Footer.tsx           # Site footer
│   ├── RouteGuard.tsx       # Route protection logic
│   ├── Providers.tsx        # React context providers
│   ├── mdx.tsx              # MDX component overrides
│   └── [section]/           # Section-specific components
├── resources/               # Configuration and content
│   ├── once-ui.config.ts    # Once UI configuration (routes, styles, fonts)
│   ├── content.tsx          # Site content (person, home, blog, work, about)
│   ├── icons.ts             # Icon configuration
│   └── custom.css           # Custom CSS overrides
├── types/                   # TypeScript type definitions
│   ├── config.types.ts      # Config-related types
│   └── content.types.ts     # Content-related types
└── utils/                   # Utility functions
    ├── utils.ts             # getPosts() and other helpers
    └── formatDate.ts        # Date formatting
public/
└── images/                  # Static images
    ├── avatar.jpg
    ├── og/                  # Open Graph images
    ├── projects/            # Project images
    └── blog/                # Blog images
```

## Architecture & Key Concepts

### Configuration-Driven Design

The entire site is configured through two main files in `src/resources/`:

1. **once-ui.config.ts**: Controls UI behavior
   - `routes`: Enable/disable pages (`"/blog": true` enables blog)
   - `protectedRoutes`: Password-protect specific pages
   - `display`: Show/hide location, time, theme switcher
   - `style`: Theme, colors, borders, transitions, scaling
   - `effects`: Background gradients, dots, grids, masks
   - `fonts`: Typography (Geist and Geist Mono)

2. **content.tsx**: Defines all site content
   - `person`: Personal info, avatar, email, location
   - `home`: Homepage content and featured work
   - `about`: About page sections and content
   - `work`: Project listings and details
   - `blog`: Blog metadata and settings
   - `gallery`: Gallery content (if enabled)

**Important**: Always update these config files when adding pages, changing content, or modifying styles.

### Route Protection System

Routes can be password-protected via `protectedRoutes` in `once-ui.config.ts`. The `RouteGuard` component (src/components/RouteGuard.tsx:1) wraps all pages and handles:
- Route enabled/disabled checks
- Password authentication via `/api/authenticate`
- Session management via cookies
- 404 for disabled routes

Set the password in `.env` as `PAGE_ACCESS_PASSWORD`.

### MDX Blog Posts

Blog posts live in `src/app/blog/posts/*.mdx` with frontmatter:
```mdx
---
title: "Post Title"
publishedAt: "2024-10-25"
summary: "Brief description"
image: "/images/blog/post.jpg"
---
```

The `getPosts()` utility (src/utils/utils.ts:1) parses all MDX files using `gray-matter`. Posts are rendered with custom MDX components defined in `src/components/mdx.tsx`.

### Once UI Design System

All UI components come from `@once-ui-system/core`. Never use native HTML elements directly:
- Use `<Flex>`, `<Column>`, `<Row>` instead of divs
- Use `<Text>` instead of `<p>`, `<span>`
- Use `<Heading>` instead of `<h1>-<h6>`
- Use `<SmartLink>` instead of `<a>` or `<Link>`

Styling uses design tokens (CSS variables) set in `once-ui.config.ts`. Custom CSS goes in `src/resources/custom.css`.

### Theme System

The theme is initialized inline in `src/app/layout.tsx:47-105` before React hydration to prevent flash. It reads from:
1. localStorage (user preference)
2. `style` config (default values)
3. System preference (prefers-color-scheme)

Theme can be "light", "dark", or "system". All tokens are data attributes on `<html>`.

### Static Site Generation

The site uses Next.js SSG (Static Site Generation):
- `generateStaticParams()` in `[slug]/page.tsx` files pre-renders all blog posts and work projects
- Build output is static HTML/CSS/JS for optimal performance
- Images in `public/` are served as-is
- Dynamic content (like blog posts) is read at build time

### Path Aliases

TypeScript is configured with `@/*` path alias mapping to `src/*`:
```typescript
import { Header } from "@/components"
import { baseURL } from "@/resources"
```

Always use `@/` imports instead of relative paths.

## Content Management

### Adding a Blog Post

1. Create `src/app/blog/posts/your-post-slug.mdx`
2. Add frontmatter with title, publishedAt, summary, image
3. Write content using MDX (supports React components)
4. Images go in `public/images/blog/`
5. Build to regenerate static pages

### Adding a Work Project

1. Add project config to `work.projects` array in `src/resources/content.tsx`
2. Add images to `public/images/projects/[project-name]/`
3. Set `href` to `/work/[slug]` for detail page or external URL
4. For detail pages, content is defined in the config (no separate MDX file needed)

### Enabling/Disabling Pages

In `src/resources/once-ui.config.ts`, set routes:
```typescript
const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/gallery": false,  // disabled
};
```

## Code Style

- **Formatting**: Biome enforces 2-space indentation, 100-char line width, double quotes
- **Run `pnpm biome-write` before committing**
- **Strict TypeScript**: No implicit any, strict null checks enabled
- **React**: Functional components with TypeScript, async Server Components where possible
- **File naming**: kebab-case for files, PascalCase for components

## Important Notes

- The site content is in French (comments and UI may be in French)
- Base URL is `https://www.salimdiallo.com` (used for SEO and metadata)
- Location timezone is `Africa/Casablanca` (for time display)
- Gallery page is disabled by default (`routes["/gallery"]: false`)
- Protected routes example: `/work/automate-design-handovers-with-a-figma-to-code-pipeline`

## MDX Components

Custom MDX components are defined in `src/components/mdx.tsx` and override default elements:
- Headings automatically generate IDs for anchor links
- Links are SmartLinks with styling
- Code blocks use Once UI `<Code>` component
- Images use Next.js `<Image>` with optimization

## API Routes

- `/api/authenticate`: POST password for protected routes, sets HTTP-only cookie
- `/api/check-auth`: Verify authentication status
- `/api/og/generate`: Generate Open Graph images dynamically
- `/api/og/proxy`: Proxy external images for OG
- `/api/rss`: Generate RSS feed for blog posts
