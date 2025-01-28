const ImageKit = require("imagekit");

// Konfigurasi ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadImageToImageKit = async (file) => {
    try {
      const uploadResponse = await imagekit.upload({
        file: file.buffer, // Assuming file buffer from multer
        fileName: file.originalname,
      });
  
      return uploadResponse.url;
    } catch (error) {
      console.error("ImageKit Upload Error:", error.message); // Tambahkan log untuk debugging
      throw new Error("Image upload failed: " + error.message);
    }
  };
  

module.exports = { uploadImageToImageKit };
