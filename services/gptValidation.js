const OpenAI = require("openai");

// Inisialisasi OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Pastikan API key diambil dari .env
});

const validateImageWithGPT = async (imageUrl, expectedCount) => {
  try {
    // Kirim permintaan ke API OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Hitung berapa banyak orang dalam gambar ini dan hanya balas dengan angka saja." },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
    });

    // Ambil hasil dari OpenAI API (diharapkan hanya angka)
    const result = completion.choices[0].message.content.trim();

    console.log("GPT Response:", result);

    // Konversi hasil ke angka
    const detectedCount = parseInt(result, 10);
    if (isNaN(detectedCount)) {
      throw new Error("GPT tidak memberikan angka yang valid.");
    }

    // Validasi dengan kelonggaran ±2
    const isValid = Math.abs(detectedCount - expectedCount) <= 2;

    return {
      valid: isValid,
      message: `Detected count: ${detectedCount}, Expected count: ${expectedCount}`,
    };
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
    throw new Error("Validation with GPT failed: " + error.message);
  }
};

module.exports = { validateImageWithGPT };
