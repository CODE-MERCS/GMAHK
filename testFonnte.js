const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

// Fungsi untuk mengirim pesan WhatsApp
const sendWhatsAppNotification = async (phone, message) => {
  try {
    // Buat FormData
    const data = new FormData();
    data.append('target', phone); // Nomor telepon penerima
    data.append('message', message); // Pesan yang akan dikirim
    data.append('delay', '2'); // Delay pengiriman (opsional)
    data.append('countryCode', '62'); // Kode negara (opsional)

    // Konfigurasi request
    const config = {
      method: 'post',
      url: process.env.FONNTE_API_URL || 'https://api.fonnte.com/send',
      headers: { 
        'Authorization': process.env.FONNTE_API_KEY, // Token API Fonnte
        ...data.getHeaders() // Header untuk FormData
      },
      data: data
    };

    // Kirim request
    const response = await axios(config);
    console.log('Pesan berhasil dikirim:', response.data);
  } catch (error) {
    console.error('Gagal mengirim pesan:', error.response ? error.response.data : error.message);
  }
};

// Jalankan fungsi pengiriman pesan
(async () => {
  const phone = '081287901108'; // Ganti dengan nomor telepon tujuan
  const message = 'Ini adalah pesan test dari Node.js!'; // Pesan yang akan dikirim

  console.log('Mengirim pesan ke:', phone);
  await sendWhatsAppNotification(phone, message);
})();