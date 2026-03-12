// ============================================================
// firebaseConfig.js — Smart Crop Disease Detector
// ============================================================
// TODO: Replace ALL placeholder values below with your actual
// Firebase project configuration.
// Get these from: Firebase Console → Project Settings → General
// → Your apps → Web app → SDK setup and configuration
// ============================================================

const firebaseConfig = {
    apiKey: "AIzaSyC8vxV4zzxiI433AJ2hBA6Syal-Cr8C1GM",
    authDomain: "smart-crop-detector.firebaseapp.com",
    projectId: "smart-crop-detector",
    storageBucket: "smart-crop-detector.firebasestorage.app",
    messagingSenderId: "361807248691",
    appId: "1:361807248691:web:fe0036c12b31a2e23cd246"
};

// VAPID key for Firebase Cloud Messaging push notifications
// Get this from: Firebase Console → Project Settings → Cloud Messaging
// → Web Push certificates → Key pair
const VAPID_KEY = "YOUR_VAPID_KEY_HERE"; // TODO: Replace

export { firebaseConfig, VAPID_KEY };
