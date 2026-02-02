import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Comprehensive list of supported countries (ISO 3166-1 alpha-2 codes)
const ALLOWED_COUNTRIES = [
  'US', 'CA', 'GB', 'AU', 'NZ', 'IE', 'DE', 'FR', 'IT', 'ES', 'PT', 'NL', 'BE', 'AT', 'CH',
  'SE', 'NO', 'DK', 'FI', 'PL', 'CZ', 'HU', 'RO', 'GR', 'HR', 'SI', 'SK', 'LT', 'LV', 'EE',
  'JP', 'KR', 'SG', 'HK', 'TW', 'TH', 'MY', 'ID', 'PH', 'VN', 'IN', 'PK', 'BD',
  'BR', 'MX', 'AR', 'CL', 'CO', 'PE', 'VE', 'ZA', 'EG', 'NG', 'CN', 'RU', 'IL', 'AE', 'SA'
];

export async function POST(request) {
  try {
    const body = await request.json();
    const { cart, email } = body || {};

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return new Response(JSON.stringify({ error: 'Cart is empty' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const lineItems = cart.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: item.thumbnail ? [item.thumbnail] : [],
        },
        unit_amount: Math.round(Number(item.price || 0) * 100), // Stripe expects cents
      },
      quantity: Math.max(1, item.quantity || 1),
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      billing_address_collection: 'required',
      shipping_address_collection: { allowed_countries: ALLOWED_COUNTRIES },
      customer_email: email || undefined,
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'}/cancel`,
    });

    return new Response(JSON.stringify({ id: session.id, url: session.url || null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Internal error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}