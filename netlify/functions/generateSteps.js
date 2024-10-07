const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { title, description } = JSON.parse(event.body);
    const prompt = `Generate a step-by-step guide for the following startup idea:
Title: ${title}
Description: ${description}

Please provide 5 concise steps to help implement this startup idea:`;

    const response = await openai.completions.create({
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 200,
      n: 1,
      temperature: 0.7,
    });

    const steps = response.choices[0].text?.trim().split('\n').filter(step => step.trim() !== '');

    return {
      statusCode: 200,
      body: JSON.stringify({ steps }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to generate steps' }) };
  }
};