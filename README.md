# OwiTasks Project

## Badges
![Express Js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) 
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white) 
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)

This repository contains two main folders:

- **App**: A React Native Expo application that uses Redux for state management and React Native Paper for UI components.
- **Backend**: A Node.js Express server that integrates with Firebase for backend services.

## App (React Native)

The app is developed using the Expo Managed Workflow, making it easy to start, run, and build across both iOS and Android.

### Tech Stack

- **React Native**
- **Redux** for state management
- **React Native Paper** for UI components
- **Expo Managed Workflow**

### Getting Started with the App

To start the app:

1. Navigate to the `app` directory.
    ```bash
    > cd app
    ```
2. Install dependencies.
    ```bash
    > npm install
    ```
3. Start the Expo server (Expo Go).
    ```bash
    > npm start
    ```

### Building the App

Since this project uses Expo Managed Workflow, you can easily build the app using Expo Application Services (EAS). To build:

1. Make sure you are in the `app` directory.
2. Run the build command according to the platform.

For more details on building with EAS, refer to the [Expo documentation](https://docs.expo.dev/build/introduction/).

## Backend (Node.js + Firebase)

The backend is built using Node.js with Express and Firebase as the database and authentication provider. All secrets are stored in the `.env` and managed by Dotenv Vault

### Tech Stack

- **Node.js**
- **Express**
- **Firebase** (Database, Authentication, Storage)

The backend API is hosted and synced automatically with every commit on Vercel at the following endpoint:

`https://owitasks-api.vercel.app/API`

### Running the Backend Locally

To run the backend server locally:

1. Navigate to the `backend` directory.
    ```bash
    > cd backend
    ```
2. Install dependencies.
    ```bash
    > npm install
    ```
3. Start the server.
    ```bash
    > npm run dev
    ```

The server will be running on `http://localhost:8000`
