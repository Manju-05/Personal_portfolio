# Master Prompt: Portfolio Enhancement — Sai Manjunath Pathapadu

Paste this whole prompt into Claude Code (or any AI coding assistant) inside your existing portfolio project folder. Fill in the `[BRACKETS]` before running.

---

## ROLE

You are a senior frontend engineer and portfolio designer. You are enhancing an **existing** dark-theme AI/ML portfolio site for Manjunath (Manju), a final-year B.Tech AI/ML student. Do not rebuild from scratch — audit the current codebase first, then layer improvements on top of the existing structure, design tokens, and content. Preserve the current visual identity (dark background, purple/violet-to-blue gradient accents, glassmorphic cards) unless an instruction below explicitly overrides it.

---

## STEP 0 — AUDIT FIRST

Before writing any code:
1. Identify the framework (plain HTML/CSS/JS, React, Next.js, etc.), styling approach (CSS/Tailwind/CSS-in-JS), and file structure.
2. List existing sections and components.
3. Note any existing animation library already in use (if none, recommend one — see Tech Constraints).
4. Flag anything broken, inaccessible, or not mobile-responsive before adding new features on top of it.

Report this audit back to me in 5-10 bullet points before proceeding to Step 1, so I can confirm scope.

---

## STEP 1 — PROFESSIONAL ANIMATIONS

Add polish without becoming gimmicky. Specifically:

- **Hero section**: staggered text entrance (headline → subtext → CTA buttons), subtle animated gradient or particle/mesh background that doesn't distract, animated cursor-follow glow (desktop only).
- **Scroll-triggered reveals**: fade+slide-up on section entry for About, Education, Certifications, Tech Stack, Projects, Contact — using IntersectionObserver (vanilla) or Framer Motion `whileInView` (React).
- **Stat counters**: animate numbers counting up when the "Data to Intelligence" stats section scrolls into view.
- **Project cards**: hover tilt (subtle 3D perspective tilt on mousemove) + image zoom + gradient overlay reveal with a "View Project" call-to-action.
- **Tech stack icons**: gentle float/bounce loop or hover scale+glow per icon, staggered entrance.
- **Nav bar**: shrink/blur-on-scroll (glassmorphism), active-section highlight as the user scrolls (scrollspy).
- **Page load**: brief branded loading screen/skeleton (under 1s) — optional, skip if it hurts perceived performance.
- **Micro-interactions**: button hover states with magnetic pull or gradient shift, smooth-scroll for anchor nav links, cursor-aware highlight on cards.
- **Performance rule**: all animations must respect `prefers-reduced-motion`. Use CSS transforms/opacity only (no layout-thrashing properties). Lazy-load below-the-fold animation libraries.

---

## STEP 2 — MISSING PORTFOLIO ESSENTIALS

Add these sections/features if not already present:

- [ ] **Resume download button** (prominent, in hero + nav) linking to an actual PDF
- [ ] **Testimonials/recommendations** section (LinkedIn recommendations, mentor/professor quotes, or hackathon teammates — even 2-3 is enough)
- [ ] **Detailed project case studies**: each featured project (JobPilot AI, AI News Intelligence Platform, AgriAssist AI, Automated Certificate Management System) should link to a dedicated page or expandable modal with: problem statement, architecture diagram/description, tech stack, your specific role, challenges solved, metrics/outcomes, and links to GitHub/live demo
- [ ] **GitHub activity/stats widget** (contribution graph or pinned repos pulled live via GitHub API)
- [ ] **Blog/writing section** — even 2-3 posts on things you debugged (e.g., "n8n token limit issues," "UiPath DataTable scope gotchas") shows depth; optional but strong signal for GET/entry-level roles
- [ ] **SEO essentials**: meta tags, Open Graph tags/preview image, favicon, sitemap.xml, robots.txt
- [ ] **Accessibility pass**: semantic HTML, alt text on all images, keyboard navigation, sufficient color contrast, ARIA labels on interactive elements
- [ ] **Analytics**: lightweight, privacy-respecting (Plausible, Umami, or GA4)
- [ ] **Dark/light mode toggle** (optional — current dark theme is strong; only add if it doesn't dilute the aesthetic)
- [ ] **Scroll progress indicator** (thin bar at top of viewport)
- [ ] **404 page** matching site theme
- [ ] **Contact form with real backend** (see Step 3) instead of a mailto link
- [ ] **"Currently open to" status badge** near the hero — e.g., "Open to GET / AI-ML Internship roles" with availability date, since you're actively job hunting

---

## STEP 3 — BACKEND / INTERACTIVITY

Keep it lightweight — this is a portfolio, not a product, but it should demonstrably work:

1. **Contact form backend**: serverless function (Vercel/Netlify function or a simple Node/Express endpoint) that sends form submissions to your email via Resend, SendGrid, or Nodemailer + Gmail OAuth2 (you already have Gmail OAuth2 experience from JobPilot AI — reuse that pattern). Include spam protection (honeypot field or simple rate limiting).
2. **GitHub stats API route**: serverless function that fetches your GitHub stats/pinned repos server-side (avoids exposing tokens client-side, avoids rate-limit issues).
3. **View/visitor counter** (optional, nice-to-have): simple serverless counter using a lightweight DB (Supabase — you already know this stack).
4. **Resume view/download tracking** (optional): log downloads to Supabase so you know if recruiters are engaging.

---

## STEP 4 — CHATBOT: "Ask Manju" (Digital Twin)

Build a chat widget (bottom-right floating button → expandable chat panel, styled to match the site) that answers visitor questions **as if it were you**, for recruiters/visitors who want quick answers without scrolling.

**Hybrid architecture** (fast + cost-effective + accurate):

1. **Tier 1 — Instant rule-based/FAQ layer** (no API call, near-zero latency):
   - Pre-written answers for the most common recruiter questions: "What are your skills?", "Tell me about your projects", "Are you available for internships?", "What's your CGPA/college?", "How do I contact you?", "Do you have experience with [specific tech]?"
   - Simple intent matching (keyword/embedding similarity) against a fixed Q&A set stored in a JSON file.

2. **Tier 2 — Gemini API fallback** for anything Tier 1 doesn't confidently match:
   - System prompt grounds Gemini with your actual resume data, project details (JobPilot AI, AI News Intelligence Platform, AgriAssist AI, Automated Certificate Management System, Student Daily Automation Hub), tech stack, education, and certifications — passed as context, not trained-in, so it never hallucinates.
   - Persona instructions: first-person as Manju, concise and direct (matches your own communication style), professional tone, redirects off-topic/inappropriate questions politely, never invents information not in the provided context, never shares personal contact info beyond what's already public on the site.
   - API key stored server-side only (serverless function proxies the request — **never expose the Gemini key client-side**).
   - Rate-limit per visitor session to control API costs.

3. **Chat UI requirements**:
   - Floating action button with subtle pulse/attention animation on first page load (then stops after one cycle, non-annoying)
   - Typing indicator while waiting for response
   - Suggested starter questions as tappable chips ("What projects have you built?", "Are you open to internships?", "What's your tech stack?")
   - Persist conversation in session (not permanently stored) unless you want to log conversations for your own review — if so, store in Supabase with visitor consent notice
   - Mobile-friendly full-screen mode

4. **Content source of truth**: create a single `manju-context.json` (or `.md`) file containing your resume facts, project descriptions, tech stack, education, and certifications. Both Tier 1 and Tier 2 pull from this file, so updating your info updates the chatbot everywhere at once.

---

## TECH CONSTRAINTS

- If React/Next.js: use **Framer Motion** for animations, **Tailwind CSS** for styling if not already in use.
- If plain HTML/CSS/JS: use **GSAP** (with ScrollTrigger) or **AOS (Animate On Scroll)** library via CDN — no build step required.
- Keep bundle size lean — no heavy animation libraries loaded for a handful of effects.
- Deployment target: Vercel or Netlify (both support serverless functions needed for the contact form and chatbot backend).
- All API keys (Gemini, email service) go in environment variables — never hardcoded, never committed.

---

## DELIVERABLE FORMAT

Work in this order and pause for my review after each phase:
1. Audit report (Step 0)
2. Animation pass (Step 1) — show me a diff/summary of what changed per section
3. New sections (Step 2) — implement one at a time, starting with resume download + case studies + status badge, since those matter most for active job applications
4. Backend (Step 3)
5. Chatbot (Step 4) — build Tier 1 first, confirm it works, then layer in Tier 2

Do not implement all steps in one giant commit — I want to review and test incrementally.
