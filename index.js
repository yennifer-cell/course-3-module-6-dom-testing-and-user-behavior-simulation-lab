// Utility functions
function createElement(tag, attributes = {}) {
  const el = document.createElement(tag);
  for(const key in attributes) {
    if(key === 'textContent') el.textContent = attributes[key];
    else el.setAttribute(key, attributes[key]);
  }
  return el;
}

function appendElement(parent, element) {
  if(!parent || !element) return;
  parent.appendChild(element);
}

function clearElement(parent) {
  if(!parent) return;
  parent.innerHTML = '';
}

function showError(message, container) {
  if(!container) return;
  container.textContent = message;
  container.style.display = 'block';
}

function clearError(container) {
  if(!container) return;
  container.textContent = '';
  container.style.display = 'none';
}

// Add an element to a container
function addAlert(container, text) {
  const li = createElement('li', { textContent: text });
  appendElement(container, li);
}

// Remove all elements from a container
function removeAlerts(container) {
  clearElement(container);
}

// Simulate button click that adds an element
function onButtonClick(container) {
  clearError(errorDiv);
  const inputValue = stateInput.value.trim();
  if(!inputValue) {
    showError('Input cannot be empty', errorDiv);
    return;
  }

  addAlert(container, `Alert for ${inputValue}`);
  stateInput.value = ''; // clear input
}

// Form submission handler
function onFormSubmit(event, container) {
  event.preventDefault();
  onButtonClick(container);
}

<form id="alert-form">
  <input id="state-input" placeholder="Enter state" />
  <button type="submit" id="submit-btn">Add Alert</button>
</form>

<ul id="alerts"></ul>
<div id="error-message" style="display:none;color:red"></div>

/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let stateInput, alertsDiv, errorDiv, submitBtn;

beforeEach(() => {
  document.documentElement.innerHTML = html.toString();
  stateInput = document.getElementById('state-input');
  alertsDiv = document.getElementById('alerts');
  errorDiv = document.getElementById('error-message');
  submitBtn = document.getElementById('submit-btn');
});

test('simulation adds an element to the DOM', () => {
  stateInput.value = 'NY';
  onButtonClick(alertsDiv);
  const items = alertsDiv.querySelectorAll('li');
  expect(items.length).toBe(1);
  expect(items[0].textContent).toBe('Alert for NY');
});

test('simulation removes elements from the DOM', () => {
  stateInput.value = 'CA';
  onButtonClick(alertsDiv);
  removeAlerts(alertsDiv);
  expect(alertsDiv.querySelectorAll('li').length).toBe(0);
});

test('simulation handles button click and updates DOM', () => {
  stateInput.value = 'TX';
  onButtonClick(alertsDiv);
  expect(alertsDiv.querySelectorAll('li')[0].textContent).toBe('Alert for TX');
});

test('simulation handles form submission and updates DOM', () => {
  const formEvent = { preventDefault: jest.fn() };
  stateInput.value = 'FL';
  onFormSubmit(formEvent, alertsDiv);
  expect(alertsDiv.querySelectorAll('li')[0].textContent).toBe('Alert for FL');
  expect(formEvent.preventDefault).toHaveBeenCalled();
});

test('simulation displays error message for empty input', () => {
  stateInput.value = '';
  onButtonClick(alertsDiv);
  expect(errorDiv.textContent).toBe('Input cannot be empty');
  expect(errorDiv.style.display).toBe('block');
});


 

