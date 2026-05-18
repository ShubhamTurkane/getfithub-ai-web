export default async function handler(req, res) {
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { userData } = req.body;

    const prompt = `
      User Profile:
      - Name: ${userData.name}
      - Gender: ${userData.gender}
      - Age: ${userData.age} years
      - Weight: ${userData.weight} kg
      - Height: ${userData.height} cm
      - BMR: ${userData.bmr} calories/day
      - Body Type: ${userData.bodyType}
      - Workout Days Per Week: ${userData.workoutDays}
      - Goal: ${userData.goal}
      - Location: India

      Please generate:
      1. A 7-day Indian diet plan with breakfast, lunch, dinner, snacks
         (use: roti, dal, rice, sabzi, paneer, dahi, fruits, chai, etc.)
      2. A workout split plan for ${userData.workoutDays} days
      3. Daily calorie target
      Keep it practical for an Indian college student. Format as JSON.
    `;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY, // from Vercel env vars
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    res.status(200).json({ result: data.content[0].text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}