# Portfolio Rebuild — Context for Claude Code

## Project
Personal portfolio for Raymund Hermoso, an independent web designer and developer.
Built with Vite + React + Tailwind. Deployed to Vercel.

## Current rebuild
Repositioning from a job-seeker developer portfolio to a freelance services portfolio
for small business clients (international primary, local PH secondary).

## Completed
- Hero rewritten: new headline, "Get a quote" CTA replacing "Download CV"
- Header rewritten: same CTA in nav, mobile drawer updated
- index.html: proper title and meta tags added

## Remaining (in order)
1. Add Services section (currently missing) — bundle pricing, four services
2. Restructure Projects — show 6 strongest on homepage; categorize by client/outcome, not tech stack
3. Lightly edit About — keep voice, fix inconsistencies
4. Add Process section
5. Add Contact section with real form (replaces mailto)
6. Add routing for /work and case study pages
7. Cut: Skills (tech-logo wall), Experience-as-resume, GitHubContributions

## Reference docs
Strategy docs in /docs/:
- positioning-onepager.md (anchor service + bundle + pricing floors)
- homepage-copy-v2.md (the copy to lift from)
- persona-doc.md (voice direction: quietly confident with educational warmth)
- faq-knowledge-base.md (prospect Q&A)

## Voice
Quietly confident with educational warmth.
Pattern: acknowledge → explain why → state position.
"I" for the business, "we" for the work together with the client.
Never: passionate, synergy, ecosystem, exclamation points.

## Constraints
- Stay on Vite + React + Tailwind (don't suggest framework migration)
- Hardcode case studies as components in /data/projects.js for now (no CMS)
- Hold pricing floors: $1,500 basic / $3,000 e-commerce
- Plan mode for first sessions — show plan before changing files