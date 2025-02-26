const prisma = require('../configs/prisma');

const updateProfile = async (userId, data) => {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
};

// Tambahkan fungsi getProfile
const getProfile = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
  });
};

module.exports = {
  updateProfile,
  getProfile, // ekspor fungsi getProfile
};
