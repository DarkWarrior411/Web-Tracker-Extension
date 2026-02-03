# Web Tracker Extension 🕸️

A simple and efficient Google Chrome Extension designed to help users track leads, save interesting URLs, and store manual notes. The data is persisted locally, ensuring your list remains available even after you close the browser.

## 🚀 Features

* **Save Input:** Manually type any text or URL and save it to your list.
* **Save Tab:** One-click feature to grab the URL of the current active browser tab.
* **Persistent Storage:** Uses `localStorage` to keep your data safe between sessions.
* **Hyperlinks:** Automatically renders saved items as clickable links.
* **Safety Clear:** Requires a **double-click** to delete all entries to prevent accidental data loss.

## 🛠️ Technologies Used

* **HTML5 & CSS3** for structure and styling.
* **JavaScript (ES6)** for logic and DOM manipulation.
* **Chrome Extension API** (Manifest V3) for browser tab integration.
* **JSON** for data handling.

## 📦 Installation

Since this extension is not hosted on the Chrome Web Store yet, you can install it manually using "Developer Mode":

1.  **Clone or Download** this repository to your local machine.
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  Toggle the **Developer mode** switch in the top-right corner.
4.  Click the **Load unpacked** button on the top-left.
5.  Select the folder where you saved this project.
6.  The **Web Tracker** icon should now appear in your browser toolbar!

## 📖 Usage Guide

1.  **Input Field:** Type any text into the box and click **Save Input**.
2.  **Save Tab:** If you are on a website you want to save, simply open the extension and click **Save Tab**.
3.  **Delete All:** To clear your list, **double-click** the "Delete All" button.

## 📂 Project Structure

```text
├── icon.png          # Extension icon
├── index.html        # Main popup interface
├── index.js          # Application logic
├── manifest.json     # Chrome extension configuration
└── style.css         # Styling for the popup