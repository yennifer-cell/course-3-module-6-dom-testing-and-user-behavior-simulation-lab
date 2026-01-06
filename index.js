// Add an element to the DOM
function addElementToDOM(containerId, text) {
  const container = document.getElementById(containerId)
  if (container) {
    container.textContent = text
  }
}

// Remove an element from the DOM
function removeElementFromDOM(elementId) {
  const element = document.getElementById(elementId)
  if (element) {
    element.remove()
  }
}

// Simulate a button click by updating the DOM
function simulateClick(containerId, text) {
  const container = document.getElementById(containerId)
  if (container) {
    container.textContent = text
  }
}

// Handle form submission
function handleFormSubmit(formId, containerId) {
  const form = document.getElementById(formId)
  const input = document.getElementById('user-input')
  const container = document.getElementById(containerId)
  const errorMessage = document.getElementById('error-message')

  if (!input.value) {
    errorMessage.textContent = 'Input cannot be empty'
    errorMessage.classList.remove('hidden')
    return
  }

  // Clear error if valid input
  errorMessage.textContent = ''
  errorMessage.classList.add('hidden')

  // Update DOM with input value
  container.textContent = input.value
}

// Export functions for testing
module.exports = {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
}


 





