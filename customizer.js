document.addEventListener('DOMContentLoaded', () => {
  const customizerForm = document.getElementById('customizerForm');
  const embedCodeTextarea = document.getElementById('embedCode');
  const phoneNumberInput = document.getElementById('phoneNumber');
  const smsMessageInput = document.getElementById('smsMessage');
  const buttonColorInput = document.getElementById('buttonColor');
  const buttonTextColorInput = document.getElementById('buttonTextColor');
  const buttonTextInput = document.getElementById('buttonText');

  // Event Listener for Form Submission
  customizerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const phoneNumber = phoneNumberInput.value.trim();
    const smsMessage = smsMessageInput.value.trim();
    const buttonColor = buttonColorInput.value;
    const buttonTextColor = buttonTextColorInput.value;
    const buttonText = buttonTextInput.value.trim();

    // Basic Validation
    if (!validatePhoneNumber(phoneNumber)) {
      alert('Please enter a valid phone number.');
      return;
    }

    if (smsMessage.length > 160) {
      alert('Your message exceeds 160 characters. Please shorten it.');
      return;
    }

    if (buttonText.length === 0) {
      alert('Please enter button text.');
      return;
    }

    // Generate Embed Code
    const embedCode = `
<!-- Click-to-SMS Button -->
<button onclick="window.location.href='sms:${phoneNumber}?body=${encodeURIComponent(smsMessage)}'" style="
  background-color: ${buttonColor};
  color: ${buttonTextColor};
  border: none;
  padding: 15px 25px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
">
  ${buttonText}
</button>
    `.trim();

    embedCodeTextarea.value = embedCode;
    copyToClipboard(embedCode);
    alert('Embed code has been copied to your clipboard!');
  });

  // Function to Validate Phone Number
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return phoneRegex.test(number);
  };

  // Function to Copy Text to Clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  // Real-Time Preview
  const inputs = [phoneNumberInput, smsMessageInput, buttonColorInput, buttonTextColorInput, buttonTextInput];
  inputs.forEach(input => {
    input.addEventListener('input', updatePreview);
  });

  const updatePreview = () => {
    const phoneNumber = phoneNumberInput.value.trim();
    const smsMessage = smsMessageInput.value.trim();
    const buttonColor = buttonColorInput.value;
    const buttonTextColor = buttonTextColorInput.value;
    const buttonText = buttonTextInput.value.trim();

    const previewButton = document.getElementById('previewButton');
    if (previewButton) {
      previewButton.style.backgroundColor = buttonColor;
      previewButton.style.color = buttonTextColor;
      previewButton.textContent = buttonText || 'Send SMS';
    }
  };

  // Initialize Preview Button
  const previewContainer = document.createElement('div');
  previewContainer.innerHTML = `
    <h3>Button Preview:</h3>
    <button id="previewButton" style="
      background-color: #28a745;
      color: #ffffff;
      padding: 15px 25px;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
    ">
      Send SMS
    </button>
  `;
  document.body.appendChild(previewContainer);

  // Load configurations on page load
  loadConfigurations();
});

// Save Configurations Locally
const saveConfigurations = () => {
  const configurations = {
    phoneNumber: phoneNumberInput.value.trim(),
    smsMessage: smsMessageInput.value.trim(),
    buttonColor: buttonColorInput.value,
    buttonTextColor: buttonTextColorInput.value,
    buttonText: buttonTextInput.value.trim()
  };
  localStorage.setItem('smsButtonConfigurations', JSON.stringify(configurations));
};

const loadConfigurations = () => {
  const configurations = JSON.parse(localStorage.getItem('smsButtonConfigurations'));
  if (configurations) {
    phoneNumberInput.value = configurations.phoneNumber;
    smsMessageInput.value = configurations.smsMessage;
    buttonColorInput.value = configurations.buttonColor;
    buttonTextColorInput.value = configurations.buttonTextColor;
    buttonTextInput.value = configurations.buttonText;
    updatePreview();
  }
};

// Save configurations on form input change
inputs.forEach(input => {
  input.addEventListener('input', saveConfigurations);
});

// Real-Time Validation Feedback
phoneNumberInput.addEventListener('input', () => {
  phoneNumberInput.setCustomValidity(validatePhoneNumber(phoneNumberInput.value) ? '' : 'Invalid phone number');
});

smsMessageInput.addEventListener('input', () => {
  smsMessageInput.setCustomValidity(smsMessageInput.value.length <= 160 ? '' : 'Message exceeds 160 characters');
});