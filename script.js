document.addEventListener('DOMContentLoaded', () => {
  const smsButton = document.getElementById('clickToSMS');
  const smsModal = document.getElementById('smsModal');
  const closeButton = document.querySelector('.close-button');
  const smsForm = document.getElementById('smsForm');
  const loadingSpinner = document.getElementById('loadingSpinner');

  // Function to open the SMS app with pre-populated message
  const sendSMS = (phoneNumber, message) => {
    const smsURI = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    window.location.href = smsURI;
  };

  // Function to open the modal
  const openModal = () => {
    smsModal.style.display = 'block';
    smsModal.setAttribute('aria-hidden', 'false');
  };

  // Function to close the modal
  const closeModal = () => {
    smsModal.style.display = 'none';
    smsModal.setAttribute('aria-hidden', 'true');
  };

  // Event Listener for SMS Button Click
  smsButton.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  // Event Listener for Close Button in Modal
  closeButton.addEventListener('click', closeModal);

  // Event Listener for Clicking Outside the Modal Content
  window.addEventListener('click', (event) => {
    if (event.target === smsModal) {
      closeModal();
    }
  });

  // Real-Time Validation Feedback
  const phoneNumberInput = document.getElementById('phoneNumber');
  const smsMessageInput = document.getElementById('smsMessage');

  phoneNumberInput.addEventListener('input', () => {
    phoneNumberInput.setCustomValidity(validatePhoneNumber(phoneNumberInput.value) ? '' : 'Invalid phone number');
  });

  smsMessageInput.addEventListener('input', () => {
    smsMessageInput.setCustomValidity(smsMessageInput.value.length <= 160 ? '' : 'Message exceeds 160 characters');
  });

  // Event Listener for SMS Form Submission
  smsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const message = document.getElementById('smsMessage').value.trim();

    // Basic Validation
    if (!validatePhoneNumber(phoneNumber)) {
      alert('Please enter a valid phone number.');
      return;
    }

    if (message.length > 160) {
      alert('Your message exceeds 160 characters. Please shorten it.');
      return;
    }

    // Show Loading Spinner
    loadingSpinner.style.display = 'block';

    // Simulate Sending SMS
    setTimeout(() => {
      sendSMS(phoneNumber, message);
      closeModal();
      loadingSpinner.style.display = 'none';
    }, 1000);

    // Enhanced Analytics Tracking
    trackFormSubmission();
  });

  // Function to Validate Phone Number
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return phoneRegex.test(number);
  };

  // Analytics Tracking Example
  const trackButtonClick = () => {
    if (typeof gtag === 'function') {
      gtag('event', 'click', {
        'event_category': 'Click-to-SMS',
        'event_label': 'User clicked to send SMS'
      });
    }
  };

  // Enhanced Analytics Tracking
  const trackFormSubmission = () => {
    if (typeof gtag === 'function') {
      gtag('event', 'submit', {
        'event_category': 'Click-to-SMS',
        'event_label': 'User submitted SMS form'
      });
    }
  };

  // Modify the sendSMS function to include tracking
  const sendSMSWithTracking = (phoneNumber, message) => {
    trackButtonClick();
    sendSMS(phoneNumber, message);
  };
});