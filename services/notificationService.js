const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

const sendWhatsAppNotification = async (phone, message) => {
  try {
    const data = new FormData();
    data.append('target', phone);
    data.append('message', message);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: process.env.FONNTE_API_URL || 'https://api.fonnte.com/send',
      headers: { 
        'Authorization': process.env.FONNTE_API_KEY, 
        ...data.getHeaders()
      },
      data: data
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Error sending WhatsApp:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = {
  sendWhatsAppNotification
};