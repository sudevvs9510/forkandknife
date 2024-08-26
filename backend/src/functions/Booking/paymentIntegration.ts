import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

type userData = {
  userUsername: string
  userEmail: string
}

export const createPayment = async (userData: userData, totalAmount: number, bookingId:  string, tableSlotId: string) => {
  try {
    const user = await stripe.customers.create({
      name: userData.userUsername,
      email: userData.userEmail,
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: user.id,
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: "Table Booking",
              description: "Table Booking"
            },
            unit_amount: totalAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.ORIGIN}/payment-success?bookingId=${bookingId}&tableSlotId=${tableSlotId}&status=true`,
      cancel_url: `${process.env.ORIGIN}/payment-failure?bookingId=${bookingId}&tableSlotId=${tableSlotId}&status=false`,

    })
    return session
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating payment session: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
}
