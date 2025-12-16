export async function goToCheckout(priceId: string, shade?: string) {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ priceId, quantity: 1, shade }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Checkout failed');
  if (!data?.url) throw new Error('Checkout failed');

  window.location.href = data.url;
}


