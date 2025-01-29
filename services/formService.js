const prisma = require("../configs/prisma");

const saveFormData = async (data) => {
  const formData = await prisma.formData.create({
    data,
  });

  return formData;
};

module.exports = { saveFormData };
