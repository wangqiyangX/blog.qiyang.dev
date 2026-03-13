# blog.qiyang.dev

[中文说明](./README.zh-CN.md)

Personal blog and documentation site for Qiyang, built with Next.js 16 and
Fumadocs.

## Overview

This project is a content-first blog that combines:

- Fumadocs-powered MDX content
- localized routing for English and Simplified Chinese
- built-in full-text search with locale-aware tokenization
- generated OG images, LLM-friendly exports, and Giscus comments

## Stack

- Next.js 16 App Router
- React 19
- Fumadocs UI + Fumadocs MDX
- Tailwind CSS 4
- Bun for local package management

## Getting Started

### Prerequisites

- Bun 1.3+

### Install

```bash
bun install
```

### Run locally

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Type check

```bash
bun run types:check
```

### Production build

```bash
bun run build
bun run start
```

## Project Structure

```text
app/          Next.js routes, layouts, API handlers, OG image routes
components/   UI building blocks, search UI, comments, MDX helpers
content/      MDX content and localized section/index pages
lib/          content loader, i18n helpers, shared layout config
```

## Content Authoring

- Put docs and blog content in `content/`
- Use `index.mdx` and `index.zh.mdx` for localized section landing pages
- Use `meta.json` and `meta.zh.json` for localized navigation metadata
- New content is automatically picked up by `fumadocs-mdx`

## Localization

The site currently supports:

- `en`
- `zh`

Localization includes:

- route-level locale handling
- localized content entry pages
- localized navigation metadata
- localized search UI and search indexing
- localized date formatting and site title

## Search

Search is powered by Fumadocs built-in search and the `/api/search` route.
Chinese search uses `@orama/tokenizers/mandarin` for better tokenization.

## Notes

- `postinstall` runs `fumadocs-mdx` to generate content artifacts
- OG images are generated from page metadata
- `llms.txt` and markdown export routes are available for LLM-friendly access

## License

Private project.
