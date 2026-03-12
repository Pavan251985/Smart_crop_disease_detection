# 🌿 Smart Crop Disease Detector

AI-powered full-stack web app that detects crop diseases from leaf images using TensorFlow.js, Firebase, and Web Speech API.

---

## 📁 Project Structure

```
smart-crop-disease-detector/
├── backened.js              ← Express server (AI prediction, cron job)
├── frontened.html           ← Main UI (Auth, Upload, Results, History, Voice)
├── script.js                ← Frontend JS (Firebase, voice assistant, UI logic)
├── style.css                ← Agriculture-themed responsive CSS
├── firebaseConfig.js        ← Firebase config template (reference)
├── firebase-messaging-sw.js ← FCM service worker
├── package.json
├── .env.example             ← Copy to .env and fill in values
└── model/
    ├── README.md            ← How to add a real TF.js model
    └── model.json           ← Place your TF.js model here (optional)
```

---

## ⚡ Quick Start

### 1. Prerequisites

- [Node.js](https://nodejs.org/) v18+ 
- Firebase project (free tier is fine)

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
FIREBASE_SERVICE_ACCOUNT=./serviceAccountKey.json
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
```

### 4. Configure Firebase (Frontend)

Open `frontened.html` and replace the placeholder values inside the `<script>` config block:

```js
window.firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
window.VAPID_KEY = "YOUR_VAPID_KEY_HERE"; // For push notifications
```

Get these values from:  
**Firebase Console → Project Settings → General → Your apps → Web app**

### 5. Firebase Admin (Backend)

1. Go to **Firebase Console → Project Settings → Service accounts**
2. Click **"Generate new private key"** → save as `serviceAccountKey.json` in the project root

### 6. Start the Backend

```bash
npm start
# or for development with auto-reload:
npx nodemon backened.js
```

### 7. Open the App

Navigate to: **http://localhost:5000**

---

## 🧠 AI Model

The app ships with a **deterministic mock classifier** that works immediately without any model file. It produces realistic predictions based on image bytes so you can test the full UI pipeline.

### Add a Real Model (Recommended)

1. Go to [Google Teachable Machine](https://teachablemachine.withgoogle.com/)
2. Create an **Image Project → Standard image model**
3. Create 45 classes (see `model/README.md` for class names)
4. Train with images from the [PlantVillage dataset](https://www.kaggle.com/datasets/emmarex/plantdisease)
5. Export as **TensorFlow.js** → Download
6. Copy `model.json` and `weights.bin` into the `model/` folder
7. Restart the backend

---

## 🌾 Supported Crops & Diseases

| Crop | Diseases Detected |
|------|-------------------|
| 🍓 Strawberry | Healthy, Leaf Scorch, Leaf Spot, Bacterial Blight, Powdery Mildew |
| 🌽 Corn | Healthy, Northern Leaf Blight, Rust, Gray Leaf Spot, Mosaic Virus |
| 🍎 Apple | Healthy, Apple Scab, Black Rot, Cedar Rust, Powdery Mildew |
| 🫑 Bell Pepper | Healthy, Bacterial Spot, Leaf Spot, Mosaic Virus, Phytophthora Blight |
| 🍒 Cherry | Healthy, Powdery Mildew, Leaf Spot, Bacterial Blight, Brown Rot |
| 🍅 Tomato | Healthy, Early Blight, Late Blight, Mosaic Virus, Leaf Mold |
| 🍇 Grape | Healthy, Black Rot, Powdery Mildew, Downy Mildew, Esca |
| 🍑 Peach | Healthy, Bacterial Spot, Leaf Curl, Brown Rot, Mosaic Virus |
| 🥔 Potato | Healthy, Early Blight, Late Blight, Mosaic Virus, Common Scab |

---

## 🎙️ Voice Commands

| Language | Command | Action |
|----------|---------|--------|
| English | "Upload image" | Opens file picker |
| English | "Analyze disease" | Runs AI prediction |
| English | "Tell disease result" | Reads result aloud |
| English | "Explain treatment" | Reads treatment steps |
| ಕನ್ನಡ | "ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡು" | Opens file picker |
| ಕನ್ನಡ | "ರೋಗದ ವಿವರ ಹೇಳು" | Reads result aloud |
| ಕನ್ನಡ | "ಔಷಧಿ ಹೇಳು" | Reads treatment steps |

> Voice recognition works best in **Google Chrome**.

---

## 🔔 Weekly Reminders

The backend runs a cron job every Sunday at 9:00 AM (IST) that sends FCM push notifications to users who uploaded crop images more than 7 days ago. Requires:
- Valid Firebase Admin (`serviceAccountKey.json`)
- User FCM tokens stored in Firestore (`users/{uid}.fcmToken`)
- Valid VAPID key in the frontend config

---

## 🔐 Firebase Services Used

| Service | Purpose |
|---------|---------|
| **Firebase Auth** | Email/password + Google login |
| **Firestore** | Upload history (userId, crop, disease, confidence, timestamp) |
| **Cloud Storage** | Stores uploaded leaf images |
| **FCM** | Weekly reminder push notifications |

### Required Firestore Indexes

For history queries, create this composite index in the Firebase Console:  
**Collection:** `uploads` | **Fields:** `userId ASC`, `timestamp DESC`

---

## 🛠️ API Reference

### `POST /predict`

Accepts a leaf image and returns a disease prediction.

**Request:** `multipart/form-data`
- `image` — image file (JPG/PNG/WebP, max 10 MB)
- `userId` — (optional) Firebase UID for Firestore logging
- `imageURL` — (optional) Storage download URL

**Response:**
```json
{
  "success": true,
  "result": {
    "crop":       "Tomato",
    "disease":    "Late Blight",
    "confidence": 87.4,
    "severity":   "Severe",
    "causes":     ["Caused by Phytophthora infestans", "..."],
    "treatment":  ["Apply mancozeb or chlorothalonil", "..."],
    "prevention": ["Use resistant varieties", "..."]
  }
}
```

### `GET /health`

Returns server status.

---

## 🚀 Firebase Hosting Deployment

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

Point your `firebase.json` public directory to `/` and set rewrites to the backend URL or use Firebase Cloud Functions.

---

## 📋 Requirements Summary

- Node.js v18+
- npm packages: `express cors multer sharp dotenv node-cron firebase-admin @tensorflow/tfjs @tensorflow/tfjs-backend-cpu`
- Firebase project with Auth, Firestore, Storage, and FCM enabled
- Chrome browser (for voice features)
