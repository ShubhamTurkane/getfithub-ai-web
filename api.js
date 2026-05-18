async function generateFitnessPlan(userData) {
  const response = await fetch('/api/generate-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userData }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.error || 'Failed to generate plan');

  const text = data.result;
  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}