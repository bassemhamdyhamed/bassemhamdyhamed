# Project — Agri Remote Sensing & Crop Monitoring (مراقبة المحاصيل بالاستشعار عن بُعد)

last-updated: 2026-10-01 | sources: 1 | confidence: med

## Summary

Customer-facing service line selling **satellite-only** analytics to farms in KSA and
Egypt (drone services dropped by founder decision, 2026-10-01). The first concrete artifact is an Arabic Google Forms intake questionnaire that
captures farm geometry, crop/irrigation context, pain points and requested service
tier. It doubles as the lead-capture front end of the sales funnel. A hardened v2 of the
script lives in `tools/google-forms/agri-intake-form.gs`.

## Service catalog (as offered on the intake form)

| Service | Data source | Model |
|---|---|---|
| Periodic vegetation-index monitoring (NDVI / NDRE) | Satellite | Subscription |
| Very-high-resolution imagery (30–50 cm) for tree counting & condition | Commercial VHR satellite | Per-order |
| Water stress & soil moisture | Thermal / SAR satellite | Subscription |
| Satellite DEM & slope analysis | Satellite stereo / global DEM | Per-project |
| Reporting cadence: one-off · monthly · weekly (per season) | Satellite | Tiered by frequency |

Original v1 catalog also listed drone surveys and drone-based DEM/DSM — removed in v2.
Source: [raw/2026-10-01-agri-remote-sensing-intake-form.gs](../raw/2026-10-01-agri-remote-sensing-intake-form.gs)

## Decisions

- 2026-10-01 — Satellite only. Drone services removed from the form and catalog
  (founder instruction, chat). Removes aviation-permit exposure and field-ops cost;
  keeps the offer scalable and remote-delivered.
- 2026-10-01 — Platform: **Microsoft Forms** (company has a Microsoft 365 Business
  tenant). Rationale: client data stays in the company's own Microsoft 365 account
  (PDPL story for enterprise/government buyers), branching,
  Excel → Power BI → Dynamics path, alignment with Microsoft as a prospective partner.
  Build kit: `tools/microsoft-forms/` (Quick Import .docx + SETUP.md). The Google
  Apps Script version is kept as a fallback.
  Constraint (verified, Microsoft Learn): Forms file-upload disables "Anyone can
  respond" → boundary files are collected via a OneDrive *Request files* link instead.

## Customer pain points targeted

Weak vegetative growth / yield variance · irrigation efficiency & water use ·
fungal/pest hotspots · soil salinity & drainage · tree counting & spacing ·
topography for land levelling and flash-flood drainage.
Source: same as above.

## Intake data model

1. Contact — name, organization, phone (WhatsApp), email, country/region.
2. Geography — area + unit, coordinates / Google Maps pin, boundary file (KML/KMZ/SHP).
3. Agronomy — crop, growth stage, irrigation system (drip / pivot / flood / sprinkler).
4. Scope — challenges, requested services, notes.
5. (v2 additions) timeline, budget band, data-processing consent.

## v1 → v2 changes (tools/google-forms/agri-intake-form.gs)

- Required flags added to all choice questions (v1 left boundary, stage, irrigation,
  service optional → incomplete leads).
- Email validation; area split into numeric field + unit dropdown so the Sheet can
  drive per-area pricing directly.
- Country as a dropdown (KSA / Egypt / other) → clean market routing.
- Boundary file: FormApp cannot create file-upload items, so v2 asks for a shared link.
- Lead qualification: start timeline + package question tying report frequency to an
  indicative USD budget per season (~6 months): one-off $1–3K · monthly $3–10K ·
  weekly $10–25K · enterprise >$25K (founder direction 2026-10-01; no sub-$1K tier).
  One-off/seasonal options removed from the service-type question to avoid overlap.
- Consent checkbox referencing KSA PDPL and Egypt Law 151/2020 `[unverified — confirm
  wording with counsel]`.
- Responses → linked Google Sheet; optional email notification on each submission.

## Open questions / contradictions

- Pricing per hectare/feddan and per VHR order not yet defined → needs a
  `commercial-` page (CONFIDENTIAL).
- Satellite-only limits: tree counting and DEM depend on VHR / stereo tasking cost;
  Sentinel-2 (10 m) can't resolve individual trees or fine topography `[unverified]`.
- Imagery provider for NDVI/NDRE cadence (Sentinel-2 free vs. commercial VHR) not
  documented → `tech-` gap.
- Budget bands (USD) are indicative `[unverified]` — align with real price list once set.
- Farm coordinates are personal/location data; storage location of responses
  (Google, outside KSA) may matter under PDPL cross-border transfer rules `[unverified]`.

## Sources

- [raw/2026-10-01-agri-remote-sensing-intake-form.gs](../raw/2026-10-01-agri-remote-sensing-intake-form.gs)

## Related pages

- [index](index.md)
- Planned: `commercial-agri-pricing`, `reg-imagery-licensing-ksa-egypt`, `tech-eo-data-sources`
