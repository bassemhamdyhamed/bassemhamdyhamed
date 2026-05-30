# Horizon Satellite LLC — Knowledge Wiki (Schema / Operating Manual)

## Purpose

This repository is an LLM-maintained knowledge base for **Horizon Satellite LLC**
(AI-powered Earth Observation & geospatial analytics; markets: Saudi Arabia + Egypt).
The LLM compiles raw sources into structured, interlinked markdown that compounds over
time. The human curates and directs; the LLM does the bookkeeping.
Principle: **compile, don't re-derive.** Knowledge accumulates — it does not get
re-discovered on every query.

## Architecture (3 layers)

- `raw/`        — immutable source material (decks, reports, meeting notes, emails,
  regulations, articles). NEVER edited after it is dropped in.
- `wiki/`       — LLM-maintained pages. Humans mostly read; the LLM mostly writes.
- `wiki/index.md` — catalog of every page: link + one-line summary + last-updated date.
- `CLAUDE.md`   — this file. The operating manual the agent must follow.

## Branches (topic prefixes for files in wiki/, e.g. `project-aras.md`)

- `entity-`     organizations & people: KACST, Saudi Space Agency / CST, Egyptian Space
  Agency (EgSA), ESRI Saudi, OQ SPACE, Microsoft, GAFI, investors.
- `project-`    ARAS (KACST geological intelligence), EO analytics product,
  IoT-via-satellite, KSA EO campaign, Egypt EO campaign.
- `market-`     KSA (Vision 2030 context), Egypt.
- `reg-`        space / data / imagery licensing & compliance, per country.
- `partner-`    partnership status, terms, next steps.
- `commercial-` pipeline, deals, pricing, the SAR 400K investment round.
- `tech-`       EO data sources, AI analytics stack, constellation / roadmap.

## Page template (every wiki page follows this)

1. `# Title`
1. Status line: `last-updated: YYYY-MM-DD | sources: N | confidence: high/med/low`
1. Summary (3–5 lines)
1. Body (structured sections)
1. Open questions / contradictions
1. Sources (links to files in raw/)
1. Related pages (links to other wiki pages)

## Operations (the three commands you will run)

- **Ingest** — read a new file in `raw/`, extract what matters, update or create the
  relevant wiki pages, add cross-references, update `index.md`. Flag any contradiction
  with what's already in the wiki.
- **Query** — read `index.md` first to find relevant pages, drill into them, synthesize
  an answer. If the answer is a genuine new synthesis, FILE IT BACK as a page and update
  the index (insights should compound, not vanish into chat).
- **Lint** — scan for contradictions, stale pages (live topic untouched >90 days),
  orphaned pages (no inbound links), broken links, and claims with no source. Return a
  short prioritized action list. Do not auto-fix major issues — propose, then wait.

## Conventions

- Language: internal analysis may be bilingual (AR/EN). Commercial & marketing pages
  targeting KSA/Egypt → **Arabic**. Keep entity names consistent across pages.
- Dates: ISO `YYYY-MM-DD`.
- Every factual claim links to a source in `raw/` or is marked `[unverified]`.
- Confidentiality: investor terms, pricing, deal specifics → mark `CONFIDENTIAL` at the
  top of the page.
- Curation stays human. The LLM proposes structural changes; major reorganizations need
  the founder's approval before execution.

## First run

On the first ingest batch: build `wiki/index.md`, create at least one page per branch
that has a source, and explicitly flag the branches that have NO sources yet so the
founder knows where the knowledge gaps are.
