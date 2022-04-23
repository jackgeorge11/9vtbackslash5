import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  console.log(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
