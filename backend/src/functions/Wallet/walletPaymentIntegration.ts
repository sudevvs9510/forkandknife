import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type UserData = {
  userId: string,
  userUsername: string,
  userEmail: string
};

export const createWalletTopUpPayment = async (userData: UserData, amount: number, userId: string) => {
  try {
    const user = await stripe.customers.create({
      name: userData.userUsername,
      email: userData.userEmail,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: user.id,
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: "Wallet Top-up",
              description: "Add money to wallet"
            },
            unit_amount: amount * 100,
          },
          quantity: 1
        },
      ],
      mode: 'payment',
      metadata: {
        userId: userId,
        amount: amount.toString()
      },
      success_url: `${process.env.ORIGIN}/profile/${userData.userId}/wallet?status=success`,
      cancel_url: `${process.env.ORIGIN}/profile/${userData.userId}/wallet?status=failure`,
    });

    return session;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(`Error creating payment session: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};
