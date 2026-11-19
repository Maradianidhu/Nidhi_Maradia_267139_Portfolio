// Nidhi Maradia Portfolio — interactive features
const themeButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const menuButton = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const contactForm = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

// Feature 1: Dark / light theme toggle. Remember the choice in this browser.
function applyTheme(theme) {
  const isLight = theme === 'light';
  document.body.classList.toggle('light-theme', isLight);
  themeIcon.textContent = isLight ? '☾' : '☀';
  themeButton.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  themeButton.querySelector('.theme-label').textContent = isLight ? 'Dark mode' : 'Light mode';
}

const savedTheme = localStorage.getItem('nidhi-portfolio-theme') || 'dark';
applyTheme(savedTheme);

themeButton.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
  applyTheme(nextTheme);
  localStorage.setItem('nidhi-portfolio-theme', nextTheme);
});

// Feature 2: Open and close the navigation menu on small screens.
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
  });
});

// Feature 3: Check contact form fields before showing a confirmation.
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  feedback.className = 'form-feedback';

  if (!contactForm.checkValidity()) {
    feedback.textContent = 'Please enter a valid name, email address and message (at least 10 characters).';
    feedback.classList.add('error');
    contactForm.reportValidity();
    return;
  }

  const visitorName = document.getElementById('contact-name').value.trim();
  feedback.textContent = `Thanks, ${visitorName}! Your form entries are valid. This demo does not send the message yet.`;
  feedback.classList.add('success');
  contactForm.reset();
});

// Set the current year automatically in the footer.
document.getElementById('year').textContent = new Date().getFullYear();
