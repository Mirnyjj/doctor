# Premium Neuro Design System

## Foundations
- **Colors**: Primary `#243447`, Accent `#2BB3C0`, Background `#F7FAFC`, Text `#1A202C`.
- **Typography**: Inter / Manrope, fluid headings via `clamp()`.
- **Grid**: 12-column desktop layout with responsive collapse on tablet/mobile.
- **Effects**: soft medical shadows, restrained glassmorphism (`backdrop-filter: blur(10px)`).

## UI Kit (shadcn/ui compatible)
- Buttons: primary and secondary variants.
- Form controls: input, textarea with rounded medical style.
- Card patterns: specialty, post, review, admin panel cards.
- Feedback: skeleton-ready slots and success state styles.

## Interaction
- Smooth scroll, sticky sections.
- Scroll-driven 3D preview section via Three.js.
- IntersectionObserver reveal animation for post content.
- Hover microinteractions (scale + shadow).

## Data source
- Frontend uses local mock data (`lib/data.ts`) for landing, posts, reviews, and admin panel.
- Backend integration is intentionally disabled in this revision.
