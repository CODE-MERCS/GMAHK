const { saveFormData } = require("../services/formService");
const { validateImageWithGPT } = require("../services/gptValidation");
const { uploadImageToImageKit } = require("../services/imageKitService");

const createFormData = async (req, res) => {
  try {
    const { pendetaCount, jemaatCount } = req.body;
    const file = req.file;

    if (!pendetaCount || !jemaatCount || isNaN(pendetaCount) || isNaN(jemaatCount)) {
      return res.status(400).json({ message: "Pendeta count and Jemaat count must be valid numbers." });
    }

    if (!file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    console.log("Uploading image...");
    const imageUrl = await uploadImageToImageKit(file);

    console.log("Validating with GPT...");
    const validationResult = await validateImageWithGPT(imageUrl, parseInt(pendetaCount, 10), parseInt(jemaatCount, 10));

    console.log("Validation result:", validationResult);

    // Simpan data hanya jika validasi selesai
    const formData = await saveFormData(
      parseInt(pendetaCount, 10),
      parseInt(jemaatCount, 10),
      imageUrl,
      req.user.id
    );

    res.status(201).json({
      message: "Form data successfully created",
      data: {
        ...formData,
        Valid: validationResult.valid,
      },
    });
  } catch (error) {
    console.error("Error in createFormData:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createFormData };
