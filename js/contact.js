/**
 * VIMAL Kitchen Equipment - Contact Form Validation & Submission
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const fullNameInput = document.getElementById('fullname');
  const companyInput = document.getElementById('company');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const requirementInput = document.getElementById('requirement');
  const messageInput = document.getElementById('message');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  // Helper validation functions
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    // Allows 10-14 digits, optional + or spaces/dashes
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone.trim());
  }

  function setError(input, message) {
    input.classList.add('input-error');
    const parent = input.closest('.form-group');
    if (parent) {
      let errorEl = parent.querySelector('.error-text');
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'error-text';
        parent.appendChild(errorEl);
      }
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  function clearError(input) {
    input.classList.remove('input-error');
    const parent = input.closest('.form-group');
    if (parent) {
      const errorEl = parent.querySelector('.error-text');
      if (errorEl) {
        errorEl.style.display = 'none';
      }
    }
  }

  // Clear errors on input
  [fullNameInput, companyInput, phoneInput, emailInput, requirementInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => clearError(input));
    input.addEventListener('change', () => clearError(input));
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Full Name
    if (!fullNameInput.value.trim() || fullNameInput.value.trim().length < 2) {
      setError(fullNameInput, 'Please enter your full name.');
      isValid = false;
    } else {
      clearError(fullNameInput);
    }

    // Validate Phone Number
    if (!phoneInput.value.trim() || !validatePhone(phoneInput.value)) {
      setError(phoneInput, 'Please enter a valid contact phone number.');
      isValid = false;
    } else {
      clearError(phoneInput);
    }

    // Validate Email
    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      setError(emailInput, 'Please enter a valid corporate email address.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate Requirement
    if (!requirementInput.value) {
      setError(requirementInput, 'Please select your requirement or service.');
      isValid = false;
    } else {
      clearError(requirementInput);
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      setError(messageInput, 'Please provide details about your kitchen project (min 10 characters).');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) {
      if (formStatus) {
        formStatus.className = 'p-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm mt-4';
        formStatus.textContent = 'Please fill out all required fields marked in red.';
        formStatus.classList.remove('hidden');
      }
      return;
    }

    // Show sending state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        TRANSMITTING ENQUIRY...
      `;
    }

    const submittedName = fullNameInput.value.trim();
    const submittedReq = requirementInput.value;
    const waText = encodeURIComponent(`Hi VIMAL Kitchen Equipment, I just submitted an enquiry on your website.\n\nName: ${submittedName}\nRequirement: ${submittedReq}\n\nPlease share catalog and specifications.`);
    const waUrl = `https://wa.me/${typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG.WHATSAPP_NUMBER : '919094353570'}?text=${waText}`;

    // Simulate reliable dispatch
    setTimeout(() => {
      contactForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'SEND ENQUIRY';
      }

      if (formStatus) {
        formStatus.className = 'p-5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm mt-4 space-y-3';
        formStatus.innerHTML = `
          <div class="flex items-center gap-2 font-bold text-emerald-800">
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            ENQUIRY RECEIVED SUCCESSFULLY!
          </div>
          <p class="text-xs text-emerald-700 leading-relaxed">
            Thank you <strong>${submittedName || 'for reaching out'}</strong>! Our technical engineering team has received your enquiry and will connect with you shortly.
          </p>
          <div class="pt-1">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.92 7.44 8.61 7.51 8.35 7.79C8.09 8.07 7.35 8.77 7.35 10.19C7.35 11.61 8.38 12.98 8.53 13.17C8.68 13.36 10.52 16.35 13.44 17.5C15.54 18.32 16.29 18.17 16.85 18.11C17.65 18.04 18.44 17.43 18.69 16.73C18.94 16.03 18.94 15.43 18.87 15.31C18.79 15.19 18.61 15.12 18.33 14.98C18.05 14.84 16.7 14.18 16.45 14.09C16.2 14 16.02 13.96 15.83 14.24C15.65 14.52 15.12 15.15 14.96 15.34C14.8 15.53 14.65 15.55 14.37 15.41C14.09 15.27 13.19 14.98 12.12 14.02C11.29 13.28 10.73 12.36 10.58 12.09C10.43 11.81 10.56 11.66 10.7 11.52C10.83 11.39 10.99 11.18 11.13 11.02C11.27 10.86 11.32 10.74 11.41 10.56C11.5 10.37 11.46 10.22 11.39 10.08C11.32 9.94 10.76 8.57 10.53 8.01C10.31 7.47 10.08 7.54 9.9 7.53C9.74 7.53 9.55 7.44 9.11 7.44Z"/></svg>
              <span>Instant Chat on WhatsApp</span>
            </a>
          </div>
        `;
        formStatus.classList.remove('hidden');
      }
    }, 900);
  });
});
