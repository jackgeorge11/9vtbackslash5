export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
