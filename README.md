# Canva Apps SDK
This is an integration application for Canva platform. User who uses this application can get feedback on their presentations and designs from AI. 
AI evaluates user's designs by giving them a score from 0 to 10, explanation of why such a score was given and some tips for improvements. 
If you don't want to run application but curious about how it works from the client side, then check out my short YouTube video.
This repo contains everything you need to get an app up and running in a matter of minutes. To read complete documentation of Canva Apps SDK for the platform is at [canva.dev/docs/apps](https://www.canva.dev/docs/apps/).

**Note:** This repo and Apps SDK documentation assumes some experience with TypeScript and React.

## Requirements

- Node.js `v18` or `v20.10.0`
- npm `v9` or `v10`

**Note:** To make sure you're running the correct version of Node.js, we recommend using a version manager, such as [nvm](https://github.com/nvm-sh/nvm#intro). The [.nvmrc](/.nvmrc) file in the root directory of this repo will ensure the correct version is used once you run `nvm install`.

## Quick start

```bash
git clone git@github.com/Rahman2001/canva-apps-sdk.git
cd canva-apps-sdk
npm install
```

## Up and Run application

### Step 1: Start the local development server

The `src` directory contains a code for an app.

To start the development server, run the following command:

```bash
npm start
```

The server becomes available at <http://localhost:8080>.

The app's source code is in the `src/app.tsx` file.

### Step 2: Preview the app

The local development server only exposes a JavaScript bundle, so you can't preview an app by visiting <http://localhost:8080>. You can only preview an app via the Canva editor.

To preview an app:

1. Create an app via the [Developer Portal](https://www.canva.com/developers/apps).
2. Select **App source > Development URL**.
3. In the **Development URL** field, enter the URL of the development server.
4. Click **Preview**. This opens the Canva editor (and the app) in a new tab.
5. Click **Open**. (This screen only appears when using an app for the first time.)

The app will appear in the side panel.

## Running a backend

This application's backend is defined in [canva-backend-repo](https://github.com/Rahman2001/canva-hackathon-backend.git) repository written in Python. For more information, visit the repository.

