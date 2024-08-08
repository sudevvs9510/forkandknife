import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const handleWalletTopUpSuccess = async (paymentId: string) => {
  try {
    const paymentIntent = await stripe.checkout.sessions.retrieve(paymentId as string);

    if (paymentIntent.payment_status === 'paid') {
      return paymentIntent;
    } else {
      throw new Error('Payment not confirmed');
    }
  } catch (error) {
    throw new Error(`Error handling wallet top-up: ${(error as Error).message}`);
  }
};