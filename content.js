const clickButton = (selector) => {
  const button = document.querySelector(selector);
  if (button) {
    button.click();
    return true;
  }
  return false;
};

const setValue = (selector, value) => {
  const inputElement = document.querySelector(selector);
  if (inputElement) {
    inputElement.value = value;
    // Dispatch an input event to ensure any listeners are triggered
    const event = new Event('input', { bubbles: true });
    inputElement.dispatchEvent(event);
    return true;
  }
  return false;
};

const observeAndAct = () => {
  const observer = new MutationObserver((mutationsList, observer) => {
    // Check if the "Modifier ma contribution" button is present
    const modifyButton = document.querySelector('button[data-testid="button-change-contribution"]');

    if (modifyButton) {
      console.log("Found 'Modifier ma contribution' button.");
      modifyButton.click();

      // Wait for the modal to appear and then interact with its elements
      setTimeout(() => {
        const inputAmount = document.querySelector('input[data-testid="input-cv-amount"]');
        if (inputAmount) {
          console.log("Found donation input field.");
          inputAmount.value = "0";
          // Dispatch an input event to ensure any listeners are triggered
          const event = new Event('input', { bubbles: true });
          inputAmount.dispatchEvent(event);

          // Short delay to ensure value is processed before clicking save
          setTimeout(() => {
            const saveButton = document.querySelector('button[data-testid="button-save"]');
            if (saveButton) {
              console.log("Found 'Valider' button.");
              saveButton.click();
              console.log("Donation set to 0 and saved.");
              observer.disconnect(); // Stop observing once the action is done
            } else {
              console.log("'Valider' button not found after setting amount.");
            }
          }, 500); // Delay for save button click

        } else {
          console.log("Donation input field not found.");
        }
      }, 1000); // Delay for modal to appear and input field to be ready
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  console.log("Observer started, waiting for 'Modifier ma contribution' button...");
};

// Start observing when the content script is injected
// Using window.onload to ensure the initial DOM is somewhat ready, though MutationObserver is more robust for dynamic content.
if (document.readyState === 'loading') {  // Or 'interactive' or 'complete'
    document.addEventListener('DOMContentLoaded', observeAndAct);
} else {
    observeAndAct();
} 