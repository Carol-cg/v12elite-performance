const { OpenAI } = require("openai");

const askAssistant = async (req, res) => {
  const { question } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({
      message: "A question is required.",
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is missing.");

    return res.status(500).json({
      message: "The AI assistant is not configured.",
    });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-5.6",
      input: [
        {
          role: "system",
          content:
            "You are the V12 Elite Performance automotive assistant. Answer customer questions about vehicle wraps, ceramic coating, detailing, paint protection, routine maintenance, brakes, engines, diagnostics, and automotive services. Keep answers clear, concise, beginner-friendly, and professional. Do not claim to provide a confirmed diagnosis. For safety concerns, warning lights, brakes, overheating, smoke, fuel smells, or severe mechanical symptoms, recommend an in-person inspection by a qualified technician.",
        },
        {
          role: "user",
          content: question.trim(),
        },
      ],
    });

    return res.status(200).json({
      answer: response.output_text,
    });
  } catch (error) {
    console.error("OpenAI request error:", error.message);

    return res.status(500).json({
      message: "The AI assistant is unavailable right now. Please try again.",
    });
  }
};

module.exports = {
  askAssistant,
};