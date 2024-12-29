document.addEventListener('DOMContentLoaded', () => {
  const smsButton = document.getElementById('clickToSMS');

  // Function to open the SMS app with pre-populated message
  const sendSMS = (phoneNumber, message) => {
    const smsURI = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    window.location.href = smsURI;
  };

  // Pre-populated message and phone number
  const phoneNumber = '+1234567890'; // Replace with the business phone number
  const message = 'Hello, I would like to inquire about your services.'; // Replace with the pre-populated message

  // Event Listener for SMS Button Click
  smsButton.addEventListener('click', (e) => {
    e.preventDefault();
    sendSMS(phoneNumber, message);
  });
});