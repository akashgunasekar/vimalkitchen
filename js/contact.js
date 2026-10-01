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

    // Simulate reliable dispatch
    setTimeout(() => {
      contactForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'SEND ENQUIRY';
      }

      if (formStatus) {
        formStatus.className = 'p-5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm mt-4 space-y-2';
        formStatus.innerHTML = `
          <div class="flex items-center gap-2 font-bold text-emerald-800">
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            ENQUIRY RECEIVED SUCCESSFULLY!
          </div>
          <p class="text-xs text-emerald-700 leading-relaxed">
            Thank you for reaching out to <strong>VIMAL Kitchen Equipment</strong>. Our technical engineering team will review your specifications and get in touch within 24 hours.
          </p>
        `;
        formStatus.classList.remove('hidden');
      }
    }, 900);
  });
});
