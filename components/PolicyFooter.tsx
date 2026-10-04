import Link from "next/link";

// The two policy links, set small and to the right at the foot of any page a
// buyer might be reading on their way to paying. Meta requires both to be
// reachable from the shop, and the cart is where someone actually wonders
// what happens if a book turns up damaged.
export default function PolicyFooter() {
  return (
    <h4 className="--muted ta-right mt-md">
      <Link href="/returns">return policy</Link> \\{" "}
      <Link href="/privacy">privacy policy</Link>
    </h4>
  );
}
