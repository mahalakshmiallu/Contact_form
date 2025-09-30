const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const successMsg = document.getElementById('successMsg');
const toggleBtn = document.getElementById('toggleTheme');

// Character counter
const charCounter = document.createElement("div");
charCounter.style.fontSize = "0.85em";
charCounter.style.textAlign = "right";
charCounter.style.marginTop = "4px";
charCounter.style.color = "#555";
messageInput.parentNode.appendChild(charCounter);

const MAX_CHARS = 200;
charCounter.textContent = `0 / ${MAX_CHARS}`;

// Update counter dynamically
messageInput.addEventListener("input", () => {
  const currentLength = messageInput.value.length;
  charCounter.textContent = `${currentLength} / ${MAX_CHARS}`;
  charCounter.style.color = currentLength > MAX_CHARS ? "red" : "#555";
});

// Email validation
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();

  let valid = true;

  // Reset errors and hide success message
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  successMsg.style.opacity = 0;

  // Validate Name
  if (nameInput.value.trim() === '') {
    nameError.textContent = 'Name is required';
    valid = false;
  }

  // Validate Email
  if (emailInput.value.trim() === '') {
    emailError.textContent = 'Email is required';
    valid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    emailError.textContent = 'Invalid email format';
    valid = false;
  }

  // Validate Message
  if (messageInput.value.trim() === '') {
    messageError.textContent = 'Message is required';
    valid = false;
  } else if (messageInput.value.length > MAX_CHARS) {
    messageError.textContent = `Message cannot exceed ${MAX_CHARS} characters`;
    valid = false;
  }

  // Show success message if valid
  if (valid) {
    successMsg.textContent = '✅ Your message has been sent successfully!';
    successMsg.style.opacity = 1;
    successMsg.style.transition = 'opacity 0.7s';
    form.reset();
    charCounter.textContent = `0 / ${MAX_CHARS}`;

    // Hide success message after 3 seconds
    setTimeout(() => {
      successMsg.style.opacity = 0;
    }, 3000);
  }
});

// Dark mode toggle
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') 
    ? "☀️ Light Mode" 
    : "🌙 Dark Mode";
});

// Live typing effect with blinking cursor
const subtitleText = document.getElementById('subtitleText');
const fullText = "We’d love to hear from you! Fill out the form below.";
let index = 0;

function typeWriter() {
  if (index < fullText.length) {
    subtitleText.textContent += fullText.charAt(index);
    index++;
    setTimeout(typeWriter, 50); // typing speed
  }
}

// Clear text and start typing
subtitleText.textContent = '';
typeWriter();
