const prisma = require("../configs/prisma");

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

  const formData = await prisma.formData.create({
    data: { ...draft, id: undefined } // Hapus ID agar dibuat baru
  });

  await deleteDraft(draftId);
  return formData;
};

module.exports = { saveFormData,saveDraft,deleteDraft,moveDraftToForm };
