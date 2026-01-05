// index.js

// Select DOM elements
const stateInput = document.getElementById('state-input');
const alertsDiv = document.getElementById('alerts');
const errorDiv = document.getElementById('error-message');
const submitBtn = document.getElementById('submit-btn');

// --- Step 1: Utility Functions ---
function createElement(tag, attributes = {}) {
  const el = document.createElement(tag);
  for (const key in attributes) {
    if (key === 'textContent') el.textContent = attributes[key];
    else el.setAttribute(key, attributes[key]);
  }
  return el;
}

function appendElement(parent, element) {
  if (!parent || !element) return;
  parent.appendChild(element);
}

function clearElement(parent) {
  if (!parent) return;
  parent.innerHTML = '';
}

function showError(message, container = errorDiv) {
  if (!container) return;
  container.textContent = message;
  container.style.display = 'block';
}

function clearError(container = errorDiv) {
  if (!container) return;
  container.textContent = '';
  container.style.display = 'none';
}

// --- Step 2: DOM Manipulation Functions ---
function addAlert(text) {
  const li = createElement('li', { textContent: text });
  appendElement(alertsDiv, li);
}

function removeAlerts() {
  clearElement(alertsDiv);
}

// --- Step 3: Button Click Handler ---
function onButtonClick() {
  clearError(); // Clear previous errors
  const value = stateInput.value.trim();

  if (!value) {
    showError('Input cannot be empty'); // Display error for empty input
    return;
  }

  addAlert(`Alert for ${value}`); // Add element to DOM
  stateInput.value = ''; // Clear input field
}

// --- Step 4: Form Submission Handler ---
function onFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission
  onButtonClick(); // Reuse button click logic
}

// --- Step 5: Event Listeners ---
submitBtn.addEventListener('click', onButtonClick);
document.getElementById('alert-form').addEventListener('submit', onFormSubmit);

// --- Export functions for testing (if using Jest) ---
if (typeof module !== 'undefined') {
  module.exports = {
    createElement,
    appendElement,
    clearElement,
    showError,
    clearError,
    addAlert,
    removeAlerts,
    onButtonClick,
    onFormSubmit,
  };
}

 


