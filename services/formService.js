const prisma = require("../configs/prisma");

const saveFormData = async (pendetaCount, jemaatCount, imageUrl, userId) => {
    const formData = await prisma.formData.create({
      data: {
        pendetaCount: parseInt(pendetaCount, 10), // Konversi ke integer
        jemaatCount: parseInt(jemaatCount, 10),  // Konversi ke integer
        imageUrl,
        userId,
      },
    });
  
    return formData;
  };
  
  module.exports = { saveFormData };
  
