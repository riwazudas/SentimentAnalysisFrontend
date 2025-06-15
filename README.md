# Sentiment Analysis Web App 🎯

A full-stack sentiment analysis application that predicts whether a user's text is **positive** or **negative**, built using:

- 🧠 **BERT-based model (PyTorch + Transformers)**
- 🌐 **Flask + Render hosting** (API and deployed backend)
- ⚛️ **React + TailwindCSS** (frontend UI)
- ☁️ **Firebase Hosting** (deployed frontend)

---

## 🔥 Live Demo

👉 [View Deployed Site](https://sentiment-analysis-c0245.web.app)

---

## 🖼️ Features

- 🌈 Sleek and animated UI using TailwindCSS and Framer Motion
- 📈 Real-time sentiment prediction with confidence score
- 💬 Modal explaining server startup delay (great for cold starts on free hosting)
- 🔁 Error handling and loading feedback
- 🚀 Deployed via Firebase Hosting

---

## 📁 Project Structure

```bash
.
├── backend/
│   ├── app.py               # Flask server
│   ├── model/               # Pretrained sentiment model (e.g., BERT)
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   └── App.js           # Main React component
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
└── README.md
```


## 🛠️ Local Development Setup

### ✅ Prerequisites

- Node.js & npm
- Git
- Firebase CLI (`npm install -g firebase-tools`, only for deployment)

### 🌈 Frontend (React + TailwindCSS)

1. In a new terminal, navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Ensure the backend API URL in `src/App.js` (or via `.env`) points to:

    ```env
    http://localhost:5000
    ```

4. Start the React development server:

    ```bash
    npm start
    ```

    The app will open at [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment Instructions

### 🌐 Frontend on Firebase Hosting

1. Inside `frontend/`, build the React app:

    ```bash
    npm run build
    ```

2. Initialize Firebase (first-time only):

    ```bash
    firebase login
    firebase init
    ```

    - Select **Hosting**
    - Choose existing Firebase project or create a new one
    - Set public directory to `build`
    - Choose "Yes" for single-page app
    - Skip overwriting `index.html` if prompted

3. Deploy to Firebase:

    ```bash
    firebase deploy
    ```


