const { updateProfile, getProfile } = require('../services/profileService');

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, email } = req.body;

    if (!name && !phone && !email) {
      return res
        .status(400)
        .json({ message: 'At least one field (name, phone, or email) must be provided' });
    }

    const updatedUser = await updateProfile(userId, { name, phone, email });

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating profile',
      error: error.message,
    });
  }
};

// Fungsi baru untuk mengambil data profil
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // userId didapat dari authMiddleware
    const user = await getProfile(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Contoh: menghilangkan field password saat mengirim response
    const { password, ...safeUserData } = user;

    return res.status(200).json({
      message: 'Profile fetched successfully',
      user: safeUserData,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching profile',
      error: error.message,
    });
  }
};

module.exports = {
  updateUserProfile,
  getUserProfile,
};
