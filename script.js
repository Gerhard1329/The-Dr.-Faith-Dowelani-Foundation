const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Contact form: build a pre-filled mailto so the enquiry reaches a real inbox
// without needing a backend.

const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('Name') || '';
  const email = data.get('Email') || '';
  const interest = data.get('Interest') || '';
  const message = data.get('Message') || '';

  const subject = `Foundation enquiry — ${interest}`;
  const body =
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `How they'd like to help: ${interest}\n\n` +
    `Message:\n${message}`;

  const mailto = `mailto:EAZYDAZIT2@GMAIL.COM?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;

  if (formNote) formNote.hidden = false;
});

const revealItems = document.querySelectorAll('.mandate-grid article, .programme, .timeline > div');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const button = contactForm.querySelector("button[type='submit']");
    const originalText = button.textContent;

    button.textContent = "Sending...";
    button.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        contactForm.reset();

        button.textContent = "Inquiry Sent ✓";

        const message = document.createElement("p");
        message.className = "form-success";
        message.textContent =
          "Thank you for contacting The Dr. Faith Dowelani Foundation. Your inquiry has been received.";

        contactForm.appendChild(message);

        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 4000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      button.textContent = "Try Again";
      button.disabled = false;

      const errorMessage = document.createElement("p");
      errorMessage.className = "form-error";
      errorMessage.textContent =
        "Something went wrong. Please try again or contact us directly.";

      contactForm.appendChild(errorMessage);
    }
  });
}
