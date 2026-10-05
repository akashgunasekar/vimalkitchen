/**
 * VIMAL Kitchen Equipment - Global Site Configuration
 * 
 * Update these details to reflect the actual business information.
 * All phone, email, WhatsApp, and address elements across the website
 * will automatically update based on this configuration.
 */

const SITE_CONFIG = {
  // Brand Details
  BRAND_NAME: "VIMAL Kitchen Equipment",
  TAGLINE: "Powering Great Kitchens",
  
  // WhatsApp Configuration (Digits only, including country code, e.g., '919094353570')
  WHATSAPP_NUMBER: "919094353570", 
  
  // Default WhatsApp Message
  WHATSAPP_MESSAGE: "Hello VIMAL Kitchen Equipment, I would like to enquire about your commercial kitchen solutions.",
  
  // Phone Contact Details
  PHONE_NUMBER: "+91 90943 53570",
  PHONE_RAW: "+919094353570",
  
  // Secondary / Sales Hotline (Optional)
  SECONDARY_PHONE: "+91 90943 53570",
  
  // Email Address
  EMAIL: "contact@vimalkitchen.com",
  SALES_EMAIL: "sales@vimalkitchen.com",
  
  // Business Address
  ADDRESS: "Industrial Estate, Guindy, Chennai, Tamil Nadu - 600032, India",
  
  // Operating Hours
  WORKING_HOURS: "Monday - Saturday: 9:00 AM - 6:30 PM",
  
  // Social Media Links
  SOCIAL_LINKS: {
    facebook: "#",
    instagram: "https://www.instagram.com/vimal_kitchenequipment?utm_source=qr&stkn=MTRrMnU4enZndm5uMQ==",
    linkedin: "#",
    youtube: "#"
  }
};

// Helper function to build dynamic WhatsApp URL
function getWhatsAppUrl(customMessage) {
  const msg = customMessage || SITE_CONFIG.WHATSAPP_MESSAGE;
  return `https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// Automatically sync config with placeholders in DOM when document loads
document.addEventListener('DOMContentLoaded', () => {
  // Update WhatsApp links
  document.querySelectorAll('[data-config="whatsapp-link"]').forEach(el => {
    el.setAttribute('href', getWhatsAppUrl());
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  // Update WhatsApp numbers
  document.querySelectorAll('[data-config="whatsapp-number"]').forEach(el => {
    el.textContent = SITE_CONFIG.WHATSAPP_NUMBER;
  });

  // Update Phone links & text
  document.querySelectorAll('[data-config="phone-link"]').forEach(el => {
    el.setAttribute('href', `tel:${SITE_CONFIG.PHONE_RAW}`);
  });
  document.querySelectorAll('[data-config="phone-number"]').forEach(el => {
    el.textContent = SITE_CONFIG.PHONE_NUMBER;
  });

  // Update Email links & text
  document.querySelectorAll('[data-config="email-link"]').forEach(el => {
    el.setAttribute('href', `mailto:${SITE_CONFIG.EMAIL}`);
  });
  document.querySelectorAll('[data-config="email"]').forEach(el => {
    el.textContent = SITE_CONFIG.EMAIL;
  });

  // Update Address
  document.querySelectorAll('[data-config="address"]').forEach(el => {
    el.textContent = SITE_CONFIG.ADDRESS;
  });

  // Update Instagram links
  document.querySelectorAll('[data-config="instagram-link"]').forEach(el => {
    el.setAttribute('href', SITE_CONFIG.SOCIAL_LINKS.instagram);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
});
