export type CartCheckoutItem = {
  priceId: string;
  quantity: number;
};

export async function goToCartCheckout(items: CartCheckoutItem[]) {
  if (items.length === 0) {
    throw new Error('Cart is empty');
  }

  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ items }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Checkout failed');
  if (!data?.url) throw new Error('Checkout failed');

  window.location.href = data.url;
}

