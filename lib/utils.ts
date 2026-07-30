export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Flattens a Contentful rich-text document to plain text, truncated on a
// word boundary — used for meta descriptions.
export function richTextToPlainText(node: unknown, maxLength = 160): string {
  const collect = (n: any): string => {
    if (!n) return "";
    if (typeof n.value === "string") return n.value;
    if (Array.isArray(n.content)) return n.content.map(collect).join(" ");
    return "";
  };
  const text = collect(node).replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, "")}…`;
}

export function formatPrice(
  amount: number,
  currency: string
): string | undefined {
  if ((amount && currency) || (amount === 0 && currency)) {
    const price = (amount / 100).toFixed(2);
    const numberFormat = new Intl.NumberFormat(["en-US"], {
      style: "currency",
      currency: currency,
      currencyDisplay: "symbol",
    });
    return numberFormat.format(Number(price));
  }
}
