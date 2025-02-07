// services/notificationService.js
const fetch = require('node-fetch');
require('dotenv').config();

const sendWhatsAppNotification = async (phone, message) => {
  try {
    const response = await fetch(process.env.FONNTE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': process.env.FONNTE_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        target: phone,
        message: message
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending WhatsApp:', error);
    throw error;
  }
};

module.exports = {
  sendWhatsAppNotification
};