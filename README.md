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
