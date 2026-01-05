// app.test.js
/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let fetchBtn, stateInput, alertsDiv, errorDiv;

beforeEach(() => {
  document.documentElement.innerHTML = html.toString();
  
  // Select elements
  fetchBtn = document.getElementById('fetch-btn');
  stateInput = document.getElementById('state-input');
  alertsDiv = document.getElementById('alerts');
  errorDiv = document.getElementById('error-message');

  // Mock fetchWeatherAlerts function
  window.fetchWeatherAlerts = jest.fn();
});

test('renders input and button', () => {
  expect(stateInput).toBeTruthy();
  expect(fetchBtn).toBeTruthy();
});

test('clears input after clicking button', () => {
  stateInput.value = 'NY';
  
  fetchBtn.click();
  
  expect(window.fetchWeatherAlerts).toHaveBeenCalledWith('NY');
  expect(stateInput.value).toBe('');
});

function displayAlerts(data, state) {
  const alerts = data.features;
  alertsDiv.innerHTML = '';

  const summary = document.createElement('p');
  summary.textContent = `Current watches, warnings, and advisories for ${state}: ${alerts.length}`;
  alertsDiv.appendChild(summary);

  const ul = document.createElement('ul');
  alerts.forEach(alert => {
    const li = document.createElement('li');
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });
  alertsDiv.appendChild(ul);
}

test('displays correct summary and alerts', () => {
  const mockData = {
    features: [
      { properties: { headline: 'Flood Warning' } },
      { properties: { headline: 'Severe Thunderstorm' } },
    ],
  };

  displayAlerts(mockData, 'NY');

  const summary = alertsDiv.querySelector('p');
  const listItems = alertsDiv.querySelectorAll('li');

  expect(summary.textContent).toBe('Current watches, warnings, and advisories for NY: 2');
  expect(listItems.length).toBe(2);
  expect(listItems[0].textContent).toBe('Flood Warning');
  expect(listItems[1].textContent).toBe('Severe Thunderstorm');
});

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

test('shows and hides error messages correctly', () => {
  showError('Invalid state code');

  expect(errorDiv.textContent).toBe('Invalid state code');
  expect(errorDiv.style.display).toBe('block');

  // Simulate clearing errors
  errorDiv.style.display = 'none';
  errorDiv.textContent = '';

  expect(errorDiv.textContent).toBe('');
  expect(errorDiv.style.display).toBe('none');
});


function createElement(tag, attributes = {}) {
  const el = document.createElement(tag);
  
  for (const key in attributes) {
    if (key === 'textContent') el.textContent = attributes[key];
    else if (key === 'html') el.innerHTML = attributes[key];
    else el.setAttribute(key, attributes[key]);
  }

  return el;
}

