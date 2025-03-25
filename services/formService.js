const prisma = require("../configs/prisma");
const categoryMapping = require("../configs/categoryMapping");


const saveFormData = async (data) => {
  const formData = await prisma.formData.create({
    data,
  });

  return formData;
};

// Fungsi untuk Draft
const saveDraft = async (data) => {
  const draft = await prisma.draft.create({
    data,
  });
  return draft;
};

const deleteDraft = async (id) => {
  return await prisma.draft.delete({
    where: { id: parseInt(id, 10) }
  });
};

const moveDraftToForm = async (draftId) => {
  const draft = await prisma.draft.findUnique({
    where: { id: parseInt(draftId, 10) }
  });
  
  if (!draft) {
    throw new Error("Draft tidak ditemukan");
  }

  // Validation happens in the controller, so we just move the data
  
  // Extract draft data without the ID
  const { id, ...draftData } = draft;
  
  // Create form data with the draft data
  const formData = await prisma.formData.create({
    data: draftData
  });

  // Delete the draft
  await prisma.draft.delete({ 
    where: { id: parseInt(draftId, 10) } 
  });

  return formData;
};

module.exports = { saveFormData,saveDraft,deleteDraft,moveDraftToForm };
