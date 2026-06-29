import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  try {
    const { messages } = req.body;

    const apiMessages = [
      {
        role: "system",
        content:
          "You are VoyageAI, an elite digital travel assistant and expert local guide. Provide immersive, highly engaging, and structured travel advice. Help users design itineraries, find hidden gems, avoid tourist traps, understand local etiquettes, and learn useful phrases. Format recommendations using emojis, bullet points, and clean typography.",
      },
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: apiMessages,
      temperature: 0.7,
    });

    return res.status(200).json({
      reply: response.choices[0]?.message?.content || "",
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return res.status(500).json({
      error: "Failed to get response from OpenAI",
    });
  }
}