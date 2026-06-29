import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  try {
    const { destination, duration, budget, interests, notes } = req.body;

    const prompt = `
Generate a detailed travel itinerary in JSON format for a trip to "${destination}".
Duration: ${duration} days.
Budget Level: ${budget}.
Travel Style/Interests: ${interests}.
Additional requests/notes: ${notes || "None"}.

You MUST respond ONLY with a JSON object. Do not include markdown code block formatting or any preamble.

The JSON object must follow this structure exactly:
{
  "title": "A string describing the trip title",
  "days": [
    {
      "day": 1,
      "theme": "A short description of this day's focus",
      "activities": [
        {
          "time": "e.g. '09:00 AM' or 'Morning'",
          "desc": "Detail of the activity including location and tips"
        }
      ]
    }
  ]
}

Provide realistic timings and detailed local descriptions for 3 to 4 activities per day.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an elite travel planner that outputs itineraries in strict JSON format. Never include normal conversational text. Always return valid JSON matching the requested structure.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const responseText = response.choices[0]?.message?.content || "{}";
    const parsedData = JSON.parse(responseText);

    return res.status(200).json(parsedData);
  } catch (error) {
    console.error("Itinerary API error:", error);
    return res.status(500).json({
      error: "Failed to generate itinerary",
    });
  }
}