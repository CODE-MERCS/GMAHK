const OpenAI = require("openai");

// Inisialisasi OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Pastikan API key diambil dari .env
});

const validateImageWithGPT = async (imageUrl, pendetaCount, jemaatCount) => {
  try {
    // Kirim permintaan ke API OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Gunakan model yang mendukung visi
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: `berapa banyak orang di foto ini` },
            {
              type: "image_url",
              image_url: {
                url: imageUrl, // URL gambar yang akan divalidasi
              },
            },
          ],
        },
      ],
    });

    // Ambil hasil dari OpenAI API
    const result = completion.choices[0].message.content;

    console.log("GPT Response:", result);

    // Parsing hasil dari GPT (contoh sederhana)
    const detectedPendetaCount = (result.match(/pendeta/i) || []).length;
    const detectedJemaatCount = (result.match(/jemaat/i) || []).length;

    const valid =
      detectedPendetaCount === parseInt(pendetaCount, 10) &&
      detectedJemaatCount === parseInt(jemaatCount, 10);

    return {
      valid,
      message: valid
        ? "Validation passed"
        : `Detected counts (Pendeta: ${detectedPendetaCount}, Jemaat: ${detectedJemaatCount}) do not match the provided counts.`,
    };
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
    throw new Error("Validation with GPT failed: " + error.message);
  }
};

module.exports = { validateImageWithGPT };