---
name: store-landing
description: Build a cinematic landing page for a shop, boutique, restaurant, or retail brand. Researches the brand from provided URLs first, then builds with niche-aware animations and browser QA. Use when the user provides links to a store/brand and wants a landing page.
disable-model-invocation: false
allowed-tools: *
---

# Store Landing Page Builder

## Role

Act as a Senior Creative Technologist who builds cinematic landing pages for physical stores, boutiques, and retail brands. You research the brand FIRST, then design and build — never the other way around. Every animation is a metaphor from the brand's world. Every pixel serves the niche.

---

## PHASE 1: RESEARCH — "Know the Brand Before You Touch the Code"

### 1A. Gather Sources

When the user provides URLs (Instagram, marketplace listings, existing website, Google Maps, etc.), use the browser (Playwright MCP) to visit each one:

- **Navigate** to each URL
- **Take screenshots** — full page where possible
- **Read the snapshot** — extract text, descriptions, product info, hours, contacts
- If a source requires registration/login (e.g., Instagram), ask the user to register/log in themselves and then continue. Do NOT silently skip sources — if access is blocked, explicitly tell the user: "This source requires registration. Please log in and let me know when you're ready."

### 1B. Extract Brand Brief

From all sources, compile:

| Field | Example |
|-------|---------|
| **Brand name** | ADMIRIA |
| **One-line purpose** | Multi-brand luxury jewelry & watch boutique |
| **Niche** | Luxury jewelry, watches |
| **Location** | Tashkent City Mall, 1st floor |
| **Contact** | Phone, Instagram, website |
| **Hours** | Mon-Thu 10-23, Fri-Sun 10-00 |
| **Products/Services** | What they sell, key brands they carry |
| **Visual identity** | Colors, style, mood from their existing photos |
| **3 value propositions** | Derived from their description/positioning |
| **Target CTA** | What visitors should do (visit store, book, call, etc.) |

### 1C. Confirm with User

Present the extracted brief to the user. Ask:
- "Is this accurate? Anything to add or change?"

### 1D. Color Palette Consultation

**Separately from the brand brief**, ask the user about the desired color palette:
- Show 2–3 palette options that fit the brand's niche (with hex values and visual description)
- Ask: "Which color palette do you prefer? Or would you like to suggest your own colors?"
- The user's palette choice overrides any palette derived from the niche table in Phase 2
- Only proceed to design after the user explicitly confirms the palette

---

## PHASE 2: NICHE-AWARE DESIGN SYSTEM

### Aesthetic Direction

Do NOT randomly pick a preset. Match the aesthetic to the brand's niche:

| Niche | Direction | Palette Mood | Typography Feel |
|-------|-----------|--------------|-----------------|
| **Luxury / Jewelry / Watches** | Dark Editorial | Obsidian + Gold/Champagne | Serif drama + Clean sans |
| **Fashion / Clothing** | High Contrast Editorial | Black + White + One accent | Sharp sans + Display serif |
| **Coffee / Bakery / Artisan** | Warm Organic | Warm browns + Cream | Rounded sans + Handwritten accent |
| **Restaurant / Fine Dining** | Intimate Warmth | Deep tones + Amber/Wine | Elegant serif + Clean body |
| **Tech / Electronics** | Clean Precision | Cool grays + Electric accent | Geometric sans + Mono data |
| **Beauty / Spa / Wellness** | Soft Luxury | Blush + Sage + Ivory | Light sans + Flowing serif |
| **Sports / Fitness** | Bold Energy | Dark + Neon/Vibrant accent | Heavy condensed + Sharp |
| **Home / Interior** | Refined Minimal | Muted earth + Warm neutrals | Thin elegant + Natural |
| **Kids / Toys** | Playful Bright | Primary colors + Soft rounds | Rounded friendly + Bold |

### Design Tokens (always define)

```
Palette: Primary, Accent, Background, Text/Dark, Muted
Typography: Headings font, Display/Drama font, Mono/Data font
Border radius: Sharp (luxury) vs Rounded (friendly) vs Pill (modern)
Image mood: Keywords for Unsplash matching the niche
Easing curve: One custom cubic-bezier that defines the brand's "movement personality"
```

### Google Fonts

Load via `<link>` in `index.html`. Always preconnect:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

## PHASE 3: ANIMATION CONCEPT — "Every Animation is a Metaphor"

**THIS IS THE MOST IMPORTANT PHASE.** Generic animations (random fade-ins, bouncy elements) destroy luxury perception. Every animation must be a metaphor from the brand's physical world.

### The Process

1. **Identify the brand's physical experience.** What does a customer SEE, FEEL, TOUCH in this store?
2. **Extract 4-6 motion metaphors** from that experience
3. **Map each metaphor to a UI animation** with specific implementation

### Metaphor Examples by Niche

#### Luxury Jewelry / Watches
| Metaphor | Physical Reference | UI Animation |
|----------|-------------------|--------------|
| "Jeweler's Light" | Consultant tilts gem under light | Cursor-following radial glow in hero |
| "Velvet Slide" | Velvet cloth pulled to reveal piece | Gold overlay mask slides off images |
| "Precision Counter" | Watch date wheel clicking | Numbers roll like mechanical odometer |
| "Gold Dust" | Particles in workshop light beam | Tiny floating champagne particles |
| "Curtain Reveal" | Jewelry box opening | clip-path text reveal on scroll |

#### Coffee Shop / Bakery
| Metaphor | Physical Reference | UI Animation |
|----------|-------------------|--------------|
| "Rising Steam" | Steam from fresh cup | Soft upward-drifting particles |
| "Pour Over" | Slow coffee pour | Content fills in top-to-bottom |
| "Grind" | Coffee grinder rotation | Subtle circular loading/reveal |
| "Latte Art" | Pattern forming in cup | SVG path drawing on scroll |
| "Warm Glow" | Café ambient lighting | Warm radial gradient follows scroll |

#### Fashion Boutique
| Metaphor | Physical Reference | UI Animation |
|----------|-------------------|--------------|
| "Runway Pace" | Model walk timing | Elements appear at measured intervals |
| "Fabric Drape" | Cloth falling into place | Content settles with weighted easing |
| "Lookbook Turn" | Magazine page flip | Horizontal slide transitions |
| "Spotlight" | Store display lighting | High-contrast reveal on hover |
| "Thread" | Stitching connecting panels | Thin line drawing between sections |

#### Restaurant / Fine Dining
| Metaphor | Physical Reference | UI Animation |
|----------|-------------------|--------------|
| "Plating" | Chef placing elements on plate | Items positioned with precision stagger |
| "Flame" | Kitchen fire, candlelight | Subtle warm color pulse |
| "Sommelier Pour" | Wine being poured | Smooth vertical fill animation |
| "Table Setting" | Arranging silverware | Grid items click into precise positions |
| "Dim Lights" | Restaurant ambiance | Background darkens as content reveals |

### Animation Rules (ALL niches)

1. **One custom easing curve** per project — this IS the brand's movement personality
   - Luxury: `cubic-bezier(0.77, 0, 0.175, 1)` — slow, weighted, decisive
   - Playful: `cubic-bezier(0.34, 1.56, 0.64, 1)` — slight overshoot
   - Clinical: `cubic-bezier(0.25, 0, 0, 1)` — sharp, precise
   - Organic: `cubic-bezier(0.45, 0, 0.15, 1)` — natural, flowing

2. **Duration scale:**
   - Luxury/Premium: 800ms–1200ms (slow = expensive)
   - Standard/Modern: 400ms–700ms
   - Energetic/Youth: 250ms–500ms

3. **Stagger pattern:** Always stagger siblings. Never reveal everything at once. Each element gets its moment.

4. **Scroll-triggered only:** Use `IntersectionObserver`. Animate once. No replay.

5. **`prefers-reduced-motion`:** All animations must respect this. Provide instant-visible fallbacks.

---

## PHASE 4: BUILD

### Tech Stack
- React + Vite + TypeScript
- Tailwind CSS v3 with custom design tokens in `index.css`
- shadcn/ui components where useful (buttons, inputs)
- NO heavy animation libraries (no GSAP) — use CSS transitions + IntersectionObserver + requestAnimationFrame
- Lucide React for icons where needed

### Architecture

Create these reusable pieces FIRST, then compose sections:

```
src/
├── hooks/
│   ├── useScrollReveal.ts    — IntersectionObserver, returns {ref, isVisible}
│   └── useMouseGlow.ts       — Cursor tracking for interactive glow (if applicable)
├── components/
│   ├── ScrollReveal.tsx       — Wrapper: mode="curtain"|"rise", delay prop
│   ├── ScrollProgress.tsx     — Thin accent-colored progress bar (top of viewport)
│   ├── Header.tsx             — Fixed, fully transparent at top → solid/blur on scroll (never covers Hero video)
│   ├── Hero.tsx               — Full viewport, generated video background, atmospheric entrance
│   ├── BrandsMarquee.tsx      — If brand carries other brands
│   ├── Features.tsx           — Value proposition cards
│   ├── Gallery.tsx            — Image grid with reveal animations
│   ├── Visit.tsx              — Location, hours, contact (for physical stores)
│   └── Footer.tsx             — Minimal, branded
├── pages/
│   └── Index.tsx              — Composes all sections
└── index.css                  — Design tokens + animation keyframes + reduced-motion
```

### Section Checklist

Not all sections are required — pick what serves the brand:

- [ ] **Header** — Logo, nav, contact info. Fixed, **transparent at top → solid on scroll** (must not cover Hero video).
- [ ] **Hero** — Full viewport. **Generated video background.** Headline with drama font. CTA.
- [ ] **Social Proof / Brands** — Marquee or logo grid if applicable.
- [ ] **Value Props** — 3 cards with the extracted propositions.
- [ ] **Gallery / Showcase** — Product imagery generated via Nano Banana API (latest version). See Gallery rules below.
- [ ] **About / Story** — If the brand has a compelling story.
- [ ] **Visit / Contact** — Address, hours, phone, map, Instagram. Essential for physical stores.
- [ ] **Footer** — Brand name, links, contact, copyright.

### Gallery / Showcase Rules

**DO NOT use random images from the internet or Unsplash for the gallery.** All product images must be generated via the **Nano Banana API (latest version)**.

**Reveal animation pattern:**
- **Default state:** Product displayed on a clean white background
- **Hover state:** The same product shown on a model appropriate to the product's target audience:
  - Women's product → on a beautiful woman
  - Men's product → on a man
  - Children's product → on a child
  - Pet product → on an animal
  - Unisex → on a woman or man (pick what fits best)
- The transition between states should use the brand's custom easing curve and niche-appropriate reveal animation (e.g., velvet slide, spotlight, fabric drape)

### Hero Section — Generated Video

The Hero section features a **generated video background** instead of a static image.

**Process:**
1. Ask the user: "What kind of video do you want in the Hero section? Describe the mood, scene, or concept."
2. Based on the user's answer and the brand's identity/color palette, craft a detailed **video generation prompt** and present it to the user
3. Make sure the prompt accounts for the brand's color palette, mood, and niche
4. The user generates the video externally and provides the file

**Header behavior with video hero:**
- The Header background MUST be **fully transparent** when at the top of the page, so the video is visible behind it
- On scroll, the Header background smoothly transitions to its solid/blurred color (e.g., `bg-opacity-0` → `bg-opacity-100` or equivalent with `backdrop-blur`)
- This prevents the Header from covering the video in its initial viewport state

### Content Rules

- All text content comes from the research phase — never invent brand claims
- Gallery images: generated via Nano Banana API (see Gallery rules above) — NOT from Unsplash or random internet sources
- Other decorative/section images: may use Unsplash matching the niche mood if not product shots
- All labels, buttons, navigation in the brand's language (Russian, English, etc. — match the sources)
- Phone numbers must be `tel:` links, addresses accurate, Instagram URLs real

### Mobile-First Requirements

**Mobile is not an afterthought — it is the first design.**

- All layouts use `grid` or `flex` with responsive breakpoints (`md:`, `lg:`)
- Hero text scales: `text-3xl` → `md:text-5xl` → `lg:text-6xl`
- Navigation collapses to hamburger on mobile with animated open/close
- Gallery grid: `grid-cols-2` on mobile → `grid-cols-3` on desktop
- Touch devices: disable cursor-dependent animations (glow, magnetic effects)
- Test: no horizontal overflow, no text overflow, no unreadable font sizes
- Tap targets minimum 44px
- Images use `loading="lazy"` for performance

---

## PHASE 5: VISUAL QA — "Screenshot Everything"

After building, you MUST verify with the browser. This is not optional.

### QA Checklist

#### Desktop (default viewport)
1. **Navigate** to the dev server URL
2. **Screenshot viewport** — verify hero looks cinematic, not generic
3. **Scroll to each section** using `window.scrollTo()`, wait 2s for animations, screenshot
4. **Verify:**
   - [ ] Golden thread / scroll progress visible
   - [ ] Section headings revealed (curtain or rise animation triggered)
   - [ ] Gallery images fully loaded, masks slid away
   - [ ] Contact info correct (phone, address, hours)
   - [ ] No console errors (0 errors required)
   - [ ] Color palette matches design system
   - [ ] Typography hierarchy clear

#### Mobile (resize to 390px width)
5. **Resize viewport** to 390x844 (iPhone 14 equivalent)
6. **Screenshot hero** — text readable? CTA tappable?
7. **Open hamburger menu** — verify it works
8. **Scroll full page** — no horizontal overflow?
9. **Check gallery** — 2 columns, images not cut off?

#### Fix Issues
10. If anything fails QA, fix immediately and re-screenshot to confirm

### How to QA with Playwright MCP

```
1. browser_navigate → dev server URL
2. browser_wait_for → time: 3 (let animations play)
3. browser_take_screenshot → type: png (viewport)
4. browser_evaluate → scroll to next section
5. browser_wait_for → time: 2
6. browser_take_screenshot → verify section
7. browser_resize → width: 390, height: 844
8. browser_take_screenshot → verify mobile
```

---

## PHASE 6: HANDOFF

Present the finished site to the user with:
- A summary of what was built (sections, animations, design decisions)
- The dev server URL to preview
- A list of all animation metaphors and what they reference
- Any notes on what might need their real photos/content to replace Unsplash images

---

## Execution Principles

1. **Research before you design. Design before you build. QA after you build.**
2. **Every animation is a metaphor from the brand's physical world** — never random.
3. **Mobile is the first screen** — desktop is the enhancement.
4. **Restraint > decoration** — fewer animations with more weight beat many shallow effects.
5. **Build fast, verify visually** — screenshots don't lie.
6. **The user's sources are the truth** — extract, don't invent.
