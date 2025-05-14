# HelloAsso No Donation Extension

This Firefox extension automatically finds the donation modification button on HelloAsso checkout pages, clicks it, sets the donation amount to 0, and validates the change.

## How to Install

1.  Clone this repository or download the files (`manifest.json`, `content.js`) into a single folder on your computer.
2.  Open Firefox.
3.  Type `about:debugging` into the address bar and press Enter.
4.  Click on "This Firefox" (or "This Nightly" if you are using Firefox Nightly).
5.  Click on "Load Temporary Add-on...".
6.  Navigate to the folder where you saved the extension files and select the `manifest.json` file.

The extension should now be loaded and active. When you navigate to a HelloAsso payment page, it will attempt to modify the donation amount automatically.

## How it Works

The `content.js` script waits for the specific "Modifier ma contribution" button to appear on the page. Once found, it performs the following actions:

1.  Clicks the "Modifier ma contribution" button (`button[data-testid="button-change-contribution"]`).
2.  Waits for the modal to appear.
3.  Sets the value of the donation input field (`input[data-testid="input-cv-amount"]`) to "0".
4.  Clicks the "Valider" button (`button[data-testid="button-save"]`) to save the changes.

A `MutationObserver` is used to detect when the target elements are added to the DOM, as HelloAsso pages might load content dynamically. 