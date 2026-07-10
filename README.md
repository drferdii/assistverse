<!--
  GitHub Repository README — Sentra Compact Governance Style
  Repository target: ASSIST-SITE
-->

> [!WARNING] **This project is an active prototype and is not
> production-ready.** Content, routes, and APIs may change without notice. Not
> intended for public deployment without review.

<table width="100%">
<tr>
<td width="34%" align="center" valign="middle">
  <a href="https://ferdiiskandar.com">
    <img src="public/og-image.png" alt="Sentra Assist" width="280" />
  </a>
  <br />
  <sub><b>Sentra Assist</b> · Clinical Intelligence Division</sub>
  <br />
  <a href="https://ferdiiskandar.com"><sub>ferdiiskandar.com</sub></a>
</td>
<td width="66%" valign="middle">

## Sentra Artificial Intelligence

### ASSIST-SITE — Sentra Assist Marketing & Product Site

SideLab's public-facing web presence. Static site built with Next.js 16 App
Router, deployed as a fully static export.

Covers the product landing page, capabilities, ACARS intelligence dashboard,
manifesto, and legal pages for Sentra Assist — the clinical decision support
layer for Indonesian primary care (FKTP / Puskesmas).

<p>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" />
  <img src="https://img.shields.io/badge/status-prototype-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/framework-Next.js_16-black?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/react-19-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/output-static_export-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/styling-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/language-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
</p>

</td>
</tr>
</table>

---

## Quick Start

```bash
git clone https://github.com/drcodie/assist-site.git
cd assist-site
npm install
```

Copy environment file if needed:

```bash
cp .env.example .env.local
```

Run development server:

```bash
npm run dev       # http://localhost:3000
```

Build static export:

```bash
npm run build     # outputs to out/
```

---

## 1. What This Repository Is

**ASSIST-SITE** is the public web presence for **Sentra Assist** — Sentra
Artificial Intelligence's clinical decision support product targeting Indonesian
primary-care facilities (FKTP / Puskesmas).

The site is built as a fully static Next.js export, designed to be deployable on
any CDN or static host without a Node.js runtime.

It covers:

- product landing page with motion-driven presentation,
- capabilities overview for Sentra Assist's six core pillars,
- ACARS (Automatic Clinical Alert and Reporting System) intelligence dashboard,
- product manifesto and operating principles,
- and legal pages (privacy policy, terms of service).

---

## 2. Tech Stack

| Component     | Technology              | Role                                           |
| ------------- | ----------------------- | ---------------------------------------------- |
| Framework     | Next.js 16 (App Router) | Static export, routing, metadata, SSG          |
| UI            | React 19                | Component rendering                            |
| Styling       | Tailwind CSS 3          | Utility-first layout and design                |
| Motion        | Motion (Framer Motion)  | Page transitions, reveal, parallax, split text |
| Smooth Scroll | Lenis                   | Native-feel scroll behavior                    |
| Maps          | MapLibre GL             | Geospatial ACARS intelligence layer            |
| Language      | TypeScript 5            | Type safety across components and pages        |
| Output        | Static export (`out/`)  | CDN-ready, no server runtime required          |

---

## 3. Project Structure

```text
assist-site/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home / landing page
│   ├── layout.tsx                # Root layout (MotionProvider, SmoothScroll)
│   ├── globals.css               # Global styles
│   ├── acars/page.tsx            # ACARS intelligence dashboard
│   ├── capabilities/page.tsx     # Six capability pillars
│   ├── contact/page.tsx          # Contact form
│   ├── manifesto/page.tsx        # Product manifesto
│   ├── principles/page.tsx       # Operating principles
│   ├── privacy/page.tsx          # Privacy policy
│   └── terms/page.tsx            # Terms of service
├── components/
│   ├── SiteHeader.tsx            # Navigation header
│   ├── SiteFooter.tsx            # Site footer
│   ├── SideRail.tsx              # Side navigation rail
│   ├── SmoothScroll.tsx          # Lenis smooth scroll wrapper
│   ├── SubmitButton.tsx          # Form submit button
│   ├── acars/                    # ACARS dashboard components
│   ├── motion/                   # Motion primitives
│   │   ├── MaskWipe.tsx
│   │   ├── MotionProvider.tsx
│   │   ├── Parallax.tsx
│   │   ├── Reveal.tsx
│   │   ├── SplitText.tsx
│   │   └── Stagger.tsx
│   ├── sentrapedia/              # Sentrapedia data and view helpers
│   └── wiki/                     # Wiki layout and markdown rendering
├── public/                       # Static assets (favicon, OG image, manifest)
├── docs/                         # Internal documentation
├── next.config.ts                # Static export config
├── tailwind.config.ts            # Tailwind configuration
├── package.json
└── tsconfig.json
```

---

## 4. Pages

| Route           | Page             | Description                                                         |
| --------------- | ---------------- | ------------------------------------------------------------------- |
| `/`             | Home             | Landing page with motion-driven hero and product overview           |
| `/capabilities` | Capabilities     | Six core pillars of Sentra Assist                                   |
| `/acars`        | ACARS            | Real-time audit log, geospatial intelligence, performance reporting |
| `/manifesto`    | Manifesto        | Product philosophy and mission statement                            |
| `/principles`   | Principles       | Operating doctrine for clinical AI                                  |
| `/contact`      | Contact          | Inquiry and partnership form                                        |
| `/privacy`      | Privacy Policy   | Data handling and privacy statement                                 |
| `/terms`        | Terms of Service | Terms and conditions                                                |

---

## 5. Motion System

All animation primitives live in `components/motion/` and wrap
[Motion](https://motion.dev) (Framer Motion):

| Component                 | Behavior                                 |
| ------------------------- | ---------------------------------------- |
| `Reveal`                  | Fade + slide in on scroll entry          |
| `SplitText`               | Character or word-level staggered reveal |
| `Stagger` / `StaggerItem` | Sequenced reveal for lists               |
| `Parallax`                | Scroll-driven vertical offset            |
| `MaskWipe`                | Clip-path mask reveal on scroll          |
| `MotionProvider`          | App-level animation context              |

Reduced motion is respected via `useReducedMotionSSR` — no animation triggers
for users with `prefers-reduced-motion`.

---

## 6. Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npm run typecheck

# Lint
npm run lint

# Build static export
npm run build
# Output: out/ — deploy this folder to any CDN
```

---

## 7. Known Limitations

| Limitation               | Notes                                                 |
| ------------------------ | ----------------------------------------------------- |
| Static export only       | No server-side rendering, no API routes in production |
| MapLibre GL bundle size  | Adds ~500KB gzipped to the ACARS page                 |
| No contact form backend  | Submit handler requires an external endpoint          |
| Indonesian-first content | Most page copy is in Bahasa Indonesia                 |

---

## 8. Contributor & Agent Rules

```text
Touch only what the task requires.
Match existing motion and styling conventions.
Do not add dependencies without discussion.
Run typecheck and lint before claiming completion.
```

---

## Let's Connect

[![Website](https://img.shields.io/badge/Website-ferdiiskandar.com-black?style=flat-square&logo=google-chrome&logoColor=white)](https://ferdiiskandar.com)
[![Discord](https://img.shields.io/badge/Discord-%237289DA.svg?logo=discord&logoColor=white)](https://discord.gg/1511829076313374745)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/dr-ferdi-iskandar-1b620a3b5)
[![Medium](https://img.shields.io/badge/Medium-12100E?logo=medium&logoColor=white)](https://medium.com/@codieverse)
[![Quora](https://img.shields.io/badge/Quora-%23B92B27.svg?logo=Quora&logoColor=white)](https://quora.com/profile/drferdiiskadar@gmail.com)
[![Reddit](https://img.shields.io/badge/Reddit-%23FF4500.svg?logo=Reddit&logoColor=white)](https://reddit.com/user/SixCupaCoffee)
[![TikTok](https://img.shields.io/badge/TikTok-%23000000.svg?logo=TikTok&logoColor=white)](https://tiktok.com/@drferdii)
[![X](https://img.shields.io/badge/X-black.svg?logo=X&logoColor=white)](https://x.com/ClaudesyI81047)
[![email](https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white)](mailto:drferdiiskadar@gmail.com)

<br />

## Station Stacks

![PowerShell](https://img.shields.io/badge/PowerShell-%235391FE.svg?style=for-the-badge&logo=powershell&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

---

<p align="center">
  ❤️ for Alde, Aimee, Audrey &amp; Del<br /><br />
  From Indonesia, for a more equitable world of healthcare.<br />
  <sub>Offline. Trusted. Sovereign.</sub><br /><br />
  <a href="https://ferdiiskandar.com">ferdiiskandar.com</a>
</p>
