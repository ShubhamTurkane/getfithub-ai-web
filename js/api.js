const API_KEY = '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'; 

async function generateFitnessPlan(userData) {
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
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  return data.content[0].text;
}
