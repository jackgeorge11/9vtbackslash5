// Contentful stores shipping destinations as prose ("Europe and the United
// Kingdom"), but schema.org's DefinedRegion wants ISO 3166-1 alpha-2 codes.
// This resolves the former to the latter for structured data only.

// Continental Europe as used in the shipping tables — the United Kingdom is
// always priced separately there, so it is deliberately not in this list.
const EUROPE = [
  "AT",
  "BE",
  "BG",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GR",
  "HR",
  "HU",
  "IE",
  "IS",
  "IT",
  "LI",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
];

const NAMES: Record<string, string[]> = {
  "united states": ["US"],
  usa: ["US"],
  us: ["US"],
  "united kingdom": ["GB"],
  uk: ["GB"],
  europe: EUROPE,
  canada: ["CA"],
  mexico: ["MX"],
  australia: ["AU"],
  "new zealand": ["NZ"],
  japan: ["JP"],
  italy: ["IT"],
};

// Returns null when any part of the destination is unrecognised, so an
// unmapped region is omitted from the markup rather than guessed at.
export function countriesForDestination(to: string): string[] | null {
  const parts = to
    .toLowerCase()
    .replace(/\b(?:the|rest of)\b/g, " ")
    .split(/\s+(?:and|or)\s+|,/);
  const codes = new Set<string>();
  for (const part of parts) {
    const name = part.trim();
    if (!name) continue;
    const mapped = NAMES[name];
    if (!mapped) return null;
    mapped.forEach((code) => codes.add(code));
  }
  return codes.size ? [...codes] : null;
}
