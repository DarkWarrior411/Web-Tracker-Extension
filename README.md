# <img src="icon.png" width="35" align="top"> Web Tracker Pro

A smart Chrome extension that goes beyond standard bookmarks. Web Tracker Pro allows you to manually save text inputs or instantly clip the active tab's URL for later reference. 

Currently serving as a foundational list manager, this project is actively evolving into a full-fledged "Read-It-Later" tool capable of deep-linking directly to your exact scroll position on a saved web page.

## 🚀 Current Features
* **Manual Entry & Tab Clipping:** Save custom text/links via the input field, or grab the active tab's URL with a single click.
* **Smart Validation:** Prevents empty saves, trims whitespace, and features dynamic warning messages that clear as you type.
* **Keyboard Support:** Hit "Enter" to quickly save inputs without reaching for the mouse.
* **Precision Deletion:** Delete individual items using the inline trash icon, or clear everything at once using the double-click "Delete All" safeguard.

## 📦 Installation (Developer Mode)
1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Toggle on **Developer mode** in the top right corner.
4. Click **Load unpacked** in the top left corner.
5. Select the extension folder.
6. Pin the extension to your toolbar for easy access!

## 📂 Project Structure
* `manifest.json`: Extension configuration and permissions.
* `index.html` / `style.css`: The UI layout and styling for the popup.
* `index.js`: The core logic for saving, rendering, and deleting items via `localStorage`.
* `icon.png` / `trash.png`: Visual assets for the extension and UI.

## 🗺️ Upcoming Phases
* **Phase 1: Smart Saving (Data Quality)** Prevent duplicate entries and automatically fetch the active tab's actual Page Title (instead of just showing raw URLs) for better readability.
* **Phase 2: The "Read-It-Later" Superpower** Inject a temporary script to capture the user's exact Y-axis scroll position when saving a tab. Clicking the saved link will auto-scroll them back to that exact spot.
* **Phase 3: Cloud Sync & Backup** Migrate from `localStorage` to `chrome.storage.sync` so links follow the user across devices, and add Export/Import buttons for data portability.
* **Phase 4: Power User UI** Implement a live search/filter bar at the top of the popup to easily navigate massive lists of saved articles.
