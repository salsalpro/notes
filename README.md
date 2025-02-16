# Notes Manager Web App

A simple Notes Manager web application built using React, IndexedDB, Local Storage, and Tailwind CSS. The application allows users to add, edit, delete, and search notes. It utilizes IndexedDB for storing notes and Local Storage for saving user settings like theme preferences.

## Features

- **Create Notes**: Add new notes with a title and description.
- **Edit and Delete Notes**: Modify or delete existing notes.
- **Search Notes**: Search for notes based on their title.
- **Persistent Data Storage**: Notes are stored in IndexedDB, ensuring they persist even after refreshing the browser.
- **Theme Settings**: Save the user's theme preference (light/dark) in Local Storage and apply it on page load.
- **Responsive Design**: The app is fully responsive, making it accessible on both mobile and desktop devices.

## Technologies Used

- **React**: For building the UI and managing state with React Hooks.
- **Tailwind CSS**: For styling the app with a utility-first approach.
- **IndexedDB**: For storing the notes in a local database.
- **Local Storage**: For saving simple user settings (e.g., theme preference).
- **Custom Hooks**: For managing IndexedDB interactions and other reusable logic.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/notes-manager.git
q