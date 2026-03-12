// ============================================================
// script.js — Smart Crop Disease Detector
// Full English + Kannada UI translation, voice assistant, AI
// ============================================================

'use strict';

const BACKEND_URL = window.BACKEND_URL || 'http://localhost:5000';

// ─── TRANSLATIONS ─────────────────────────────────────────────
const TRANSLATIONS = {
    en: {
        'app-title': 'Smart Crop Disease Detector',
        'app-subtitle': 'AI-powered plant health diagnosis',
        'loading-text': '🔬 Analyzing leaf image…',
        'stat-crops': 'Supported Crops',
        'stat-diseases': 'Disease Classes',
        'stat-types': 'Disease Types',
        'stat-languages': 'Languages',
        'stat-powered': 'Powered',
        'upload-heading': 'Upload Leaf Image',
        'upload-hint': 'Click or drag & drop your leaf photo here',
        'upload-formats': 'Supports: JPG, PNG, WebP · Max 10 MB',
        'clear-btn': '🗑️ Clear',
        'analyze-btn': '🔬 Analyze Disease',
        'crops-label': 'Supported Crops',
        'crop-strawberry': 'Strawberry',
        'crop-corn': 'Corn',
        'crop-apple': 'Apple',
        'crop-pepper': 'Bell Pepper',
        'crop-cherry': 'Cherry',
        'crop-tomato': 'Tomato',
        'crop-grape': 'Grape',
        'crop-peach': 'Peach',
        'crop-potato': 'Potato',
        'result-heading': 'Detection Result',
        'confidence-label': 'Confidence Score',
        'severity-label': 'SEVERITY',
        'causes-heading': '🦠 Causes',
        'treatment-heading': '💊 Treatment',
        'prevention-heading': '🛡️ Prevention',
        'about-heading': 'ℹ️ About',
        'about-text': 'This diagnosis is AI-generated. Always consult a local agricultural expert before applying treatments.',
        'powered-by': '🌿 Smart Crop Disease Detector — Powered by TensorFlow.js',
        'read-result-btn': '🔊 Read Result Aloud',
        'voice-heading': 'Voice Assistant',
        'voice-status': 'Voice Commands Active',
        'voice-placeholder': 'Say a command…',
        'en-commands-label': 'English Commands',
        'kn-commands-label': 'ಕನ್ನಡ ಆದೇಶಗಳು',
        'cmd-upload': 'Upload image',
        'cmd-analyze': 'Analyze disease',
        'cmd-result': 'Tell disease result',
        'cmd-treatment': 'Explain treatment',
        'cmd-history': 'Show history',
        'history-heading': 'Upload History',
        'history-loading': 'Loading history…',
        'footer-text': '🌿 Smart Crop Disease Detector · Powered by TensorFlow.js + Firebase · English & ಕನ್ನಡ',
        'login-btn': 'Login',
        'logout-btn': 'Logout',
        'login-title': 'Login / Register',
        'login-desc': 'Enter your mobile number to receive weekly crop monitoring updates.',
        'phone-label': 'Mobile Number',
        'send-otp-btn': 'Send OTP',
        'otp-label': 'Enter 6-digit OTP',
        'verify-otp-btn': 'Verify OTP',
        'cancel-btn': 'Cancel',
        // Dynamic result labels
        'label-crop': 'Crop',
        'label-confidence': 'Confidence',
    },
    kn: {
        'app-title': 'ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ರೋಗ ಪತ್ತೇದಾರಿ',
        'app-subtitle': 'AI-ಚಾಲಿತ ಸಸ್ಯ ಆರೋಗ್ಯ ರೋಗನಿರ್ಣಯ',
        'loading-text': '🔬 ಎಲೆ ಚಿತ್ರ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ…',
        'stat-crops': 'ಬೆಂಬಲಿತ ಬೆಳೆಗಳು',
        'stat-diseases': 'ರೋಗ ವರ್ಗಗಳು',
        'stat-types': 'ರೋಗ ವಿಧಗಳು',
        'stat-languages': 'ಭಾಷೆಗಳು',
        'stat-powered': 'AI ಚಾಲಿತ',
        'upload-heading': 'ಎಲೆ ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ',
        'upload-hint': 'ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ ಅಥವಾ ಎಳೆದು ಬಿಡಿ',
        'upload-formats': 'ಬೆಂಬಲ: JPG, PNG, WebP · ಗರಿಷ್ಠ 10 MB',
        'clear-btn': '🗑️ ತೆರವು',
        'analyze-btn': '🔬 ರೋಗ ವಿಶ್ಲೇಷಣೆ',
        'crops-label': 'ಬೆಂಬಲಿತ ಬೆಳೆಗಳು',
        'crop-strawberry': 'ಸ್ಟ್ರಾಬೆರಿ',
        'crop-corn': 'ಜೋಳ',
        'crop-apple': 'ಸೇಬು',
        'crop-pepper': 'ದೊಡ್ಡ ಮೆಣಸಿನಕಾಯಿ',
        'crop-cherry': 'ಚೆರ್ರಿ',
        'crop-tomato': 'ಟೊಮ್ಯಾಟೊ',
        'crop-grape': 'ದ್ರಾಕ್ಷಿ',
        'crop-peach': 'ಪೀಚ್',
        'crop-potato': 'ಆಲೂಗಡ್ಡೆ',
        'result-heading': 'ಪತ್ತೇದಾರಿ ಫಲಿತಾಂಶ',
        'confidence-label': 'ನಂಬಿಕೆ ಅಂಕ',
        'severity-label': 'ತೀವ್ರತೆ',
        'causes-heading': '🦠 ಕಾರಣಗಳು',
        'treatment-heading': '💊 ಚಿಕಿತ್ಸೆ',
        'prevention-heading': '🛡️ ತಡೆಗಟ್ಟುವಿಕೆ',
        'about-heading': 'ℹ️ ಬಗ್ಗೆ',
        'about-text': 'ಈ ರೋಗನಿರ್ಣಯ AI ಮೂಲಕ ಉತ್ಪಾದಿಸಲಾಗಿದೆ. ಚಿಕಿತ್ಸೆ ನೀಡುವ ಮೊದಲು ಸ್ಥಳೀಯ ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
        'powered-by': '🌿 ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ರೋಗ ಪತ್ತೇದಾರಿ — TensorFlow.js ಚಾಲಿತ',
        'read-result-btn': '🔊 ಫಲಿತಾಂಶ ಓದಿ ಹೇಳು',
        'voice-heading': 'ಧ್ವನಿ ಸಹಾಯಕ',
        'voice-status': 'ಧ್ವನಿ ಆದೇಶಗಳು ಸಕ್ರಿಯ',
        'voice-placeholder': 'ಮಾತನಾಡಿ…',
        'en-commands-label': 'ಇಂಗ್ಲಿಷ್ ಆದೇಶಗಳು',
        'kn-commands-label': 'ಕನ್ನಡ ಆದೇಶಗಳು',
        'cmd-upload': 'Upload image',
        'cmd-analyze': 'Analyze disease',
        'cmd-result': 'Tell disease result',
        'cmd-treatment': 'Explain treatment',
        'cmd-history': 'Show history',
        'history-heading': 'ಅಪ್ಲೋಡ್ ಇತಿಹಾಸ',
        'history-loading': 'ಇತಿಹಾಸ ಲೋಡ್ ಆಗುತ್ತಿದೆ…',
        'footer-text': '🌿 ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ರೋಗ ಪತ್ತೇದಾರಿ · TensorFlow.js + Firebase ಚಾಲಿತ · ಕನ್ನಡ & English',
        'login-btn': 'ಲಾಗ್ ಇನ್',
        'logout-btn': 'ಲಾಗ್ ಔಟ್',
        'login-title': 'ಲಾಗಿನ್ / ನೋಂದಣಿ',
        'login-desc': 'ವಾರದ ಬೆಳೆ ಮೇಲ್ವಿಚಾರಣೆ ಅಪ್ಡೇಟ್ ಪಡೆಯಲು ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.',
        'phone-label': 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
        'send-otp-btn': 'OTP ಕಳುಹಿಸು',
        'otp-label': '6 ಅಂಕಿಯ OTP ನಮೂದಿಸಿ',
        'verify-otp-btn': 'OTP ಪರಿಶೀಲಿಸು',
        'cancel-btn': 'ರದ್ದುಗೊಳಿಸು',
        // Dynamic result labels
        'label-crop': 'ಬೆಳೆ',
        'label-confidence': 'ನಂಬಿಕೆ',
    }
};

// ─── APPLY LANGUAGE (full UI swap) ───────────────────────────
function applyLanguage(lang) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.textContent = t[key];
    });
    // Update <html lang> attribute for accessibility / TTS
    document.documentElement.lang = lang === 'kn' ? 'kn' : 'en';
    // Update the voice text if not actively listening
    if (!isListening) {
        $id('voice-text').textContent = t['voice-placeholder'];
    }
    // Update active result labels if a result is displayed
    if (lastResult) displayResult(lastResult);
}

// ─── STATE ───────────────────────────────────────────────────
let currentLang = 'en';
let lastResult = null;
let isListening = false;
let currentUser = null; // Stores authenticated user
let confirmationResult = null; // Stores OTP confirmation result
let selectedFile = null; // Tracks the currently selected image file

// ─── DOM HELPER ──────────────────────────────────────────────
function $id(id) { return document.getElementById(id); }

// ─── TOAST ───────────────────────────────────────────────────
function showToast(msg, type = 'info', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    $id('toast-container').appendChild(toast);
    setTimeout(() => toast.remove(), duration);
}

// ─── AUTHENTICATION (PHONE NUMBER) ───────────────────────────
const authBtn = $id('auth-btn');
const authModal = $id('auth-modal');
const closeModalBtn = $id('close-modal-btn');
const phoneInput = $id('phone-input');
const phoneCountry = $id('phone-country');
const sendOtpBtn = $id('send-otp-btn');
const verifyOtpBtn = $id('verify-otp-btn');
const otpInput = $id('otp-input');
const cancelOtpBtn = $id('cancel-otp-btn');

const phoneStep = $id('phone-auth-step');
const otpStep = $id('otp-auth-step');

let recaptchaVerifier;

// Initialize reCAPTCHA on load
function initRecaptcha() {
    try {
        if (!firebase.auth) return;
        recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved
                console.log('reCAPTCHA solved');
            }
        });
    } catch (e) {
        console.warn('reCAPTCHA init error:', e);
    }
}

// Listen for Auth State Changes
if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged((user) => {
        currentUser = user;
        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

        if (user) {
            // User is signed in
            console.log('Logged in as:', user.phoneNumber);
            authBtn.textContent = t['logout-btn'];
            authBtn.classList.remove('btn-secondary');
            authBtn.classList.add('btn-primary');
            // Hide modal if open
            if (authModal.classList.contains('show')) {
                toggleAuthModal();
            }
        } else {
            // User is signed out
            console.log('Logged out');
            authBtn.textContent = t['login-btn'];
            authBtn.classList.remove('btn-primary');
            authBtn.classList.add('btn-secondary');
        }
    });

    // Initialize recaptcha when script loads
    window.addEventListener('load', initRecaptcha);
}

function toggleAuthModal() {
    if (authModal.classList.contains('show')) {
        authModal.classList.remove('show');
    } else {
        authModal.classList.add('show');
        resetAuthForm();
    }
}

function resetAuthForm() {
    phoneInput.value = '';
    otpInput.value = '';
    phoneStep.style.display = 'block';
    otpStep.style.display = 'none';
}

// Toggle Modal
authBtn.addEventListener('click', () => {
    if (currentUser) {
        // Log out
        firebase.auth().signOut().then(() => {
            showToast(currentLang === 'kn' ? 'ಯಶಸ್ವಿಯಾಗಿ ಲಾಗ್ ಔಟ್ ಆಗಿದೆ.' : 'Logged out successfully.', 'info');
            currentUser = null;
        });
    } else {
        // Show Login Modal
        toggleAuthModal();
    }
});

closeModalBtn.addEventListener('click', toggleAuthModal);

// Send OTP
sendOtpBtn.addEventListener('click', () => {
    const rawNumber = phoneInput.value.replace(/\D/g, '');
    if (rawNumber.length < 10) {
        showToast(currentLang === 'kn' ? 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.' : 'Please enter a valid mobile number.', 'warning');
        return;
    }

    const phoneNumber = phoneCountry.value.trim() + rawNumber;
    sendOtpBtn.disabled = true;
    sendOtpBtn.textContent = 'Sending...';

    firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then((confResult) => {
            confirmationResult = confResult;
            showToast(currentLang === 'kn' ? 'OTP ಕಳುಹಿಸಲಾಗಿದೆ.' : 'OTP sent successfully.', 'info');
            phoneStep.style.display = 'none';
            otpStep.style.display = 'block';
            sendOtpBtn.disabled = false;
            sendOtpBtn.textContent = TRANSLATIONS[currentLang]['send-otp-btn'] || 'Send OTP';
        })
        .catch((error) => {
            console.error('Error during signInWithPhoneNumber', error);
            showToast('Error: ' + error.message, 'error', 6000);

            // Reset recaptcha if failed
            if (recaptchaVerifier) recaptchaVerifier.render().then(widgetId => grecaptcha.reset(widgetId));

            sendOtpBtn.disabled = false;
            sendOtpBtn.textContent = TRANSLATIONS[currentLang]['send-otp-btn'] || 'Send OTP';
        });
});

// Verify OTP
verifyOtpBtn.addEventListener('click', () => {
    const code = otpInput.value.trim();
    if (code.length < 4) {
        showToast(currentLang === 'kn' ? 'ದಯವಿಟ್ಟು ಸರಿಯಾದ OTP ನಮೂದಿಸಿ.' : 'Please enter the valid OTP.', 'warning');
        return;
    }

    verifyOtpBtn.disabled = true;
    verifyOtpBtn.textContent = 'Verifying...';

    confirmationResult.confirm(code).then((result) => {
        // User signed in successfully (onAuthStateChanged will trigger)
        const user = result.user;

        // Save user reference to Firestore
        try {
            firebase.firestore().collection('users').doc(user.uid).set({
                phoneNumber: user.phoneNumber,
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        } catch (e) { console.warn('Could not save user profile', e); }

        showToast(currentLang === 'kn' ? 'ಲಾಗಿನ್ ಯಶಸ್ವಿಯಾಗಿದೆ!' : 'Login successful!', 'info');
        verifyOtpBtn.disabled = false;
        verifyOtpBtn.textContent = TRANSLATIONS[currentLang]['verify-otp-btn'] || 'Verify OTP';

    }).catch((error) => {
        console.error('Error verifying OTP', error);
        showToast('Invalid OTP. Please try again.', 'error');
        verifyOtpBtn.disabled = false;
        verifyOtpBtn.textContent = TRANSLATIONS[currentLang]['verify-otp-btn'] || 'Verify OTP';
    });
});

cancelOtpBtn.addEventListener('click', resetAuthForm);

// ─── IMAGE UPLOAD ZONE ────────────────────────────────────────
const uploadZone = $id('upload-zone');
const fileInput = $id('file-input');
const imagePreview = $id('image-preview');
const uploadPlaceholder = $id('upload-placeholder');
const analyzeBtn = $id('analyze-btn');
const resultCard = $id('result-card');

uploadZone.addEventListener('click', () => fileInput.click());
uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
uploadZone.addEventListener('drop', e => {
    e.preventDefault(); uploadZone.classList.remove('drag-over');
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
});
fileInput.addEventListener('change', () => { if (fileInput.files[0]) handleFile(fileInput.files[0]); });

function handleFile(file) {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
        showToast(currentLang === 'kn'
            ? 'JPG, PNG ಅಥವಾ WebP ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ.'
            : 'Please upload a JPG, PNG, or WebP image.', 'error');
        return;
    }
    selectedFile = file; // Save the file globally
    imagePreview.src = URL.createObjectURL(file);
    imagePreview.classList.add('show');
    uploadPlaceholder.style.display = 'none';
    uploadZone.classList.add('has-image');
    analyzeBtn.disabled = false;
    resultCard.classList.remove('show');
}

$id('clear-btn').addEventListener('click', () => {
    fileInput.value = '';
    selectedFile = null; // Reset the file
    imagePreview.src = ''; imagePreview.classList.remove('show');
    uploadPlaceholder.style.display = 'flex';
    uploadZone.classList.remove('has-image');
    analyzeBtn.disabled = true;
    resultCard.classList.remove('show');
    lastResult = null;
    $id('voice-text').textContent = TRANSLATIONS[currentLang]['voice-placeholder'];
});

// ─── ANALYZE ─────────────────────────────────────────────────
analyzeBtn.addEventListener('click', analyzeImage);

async function analyzeImage() {
    if (!selectedFile) {
        showToast(currentLang === 'kn' ? 'ಮೊದಲು ಚಿತ್ರ ಆಯ್ಕೆ ಮಾಡಿ.' : 'Please select an image first.', 'warning');
        return;
    }

    const loadingOverlay = $id('loading-overlay');
    loadingOverlay.classList.add('show');
    analyzeBtn.disabled = true;

    try {
        const file = selectedFile;
        let imageURL = '';

        /* 
        // 1) Upload to Firebase Storage (Skipped for performance to avoid timeouts)
        try {
            const cfg = window.firebaseConfig || {};
            if (cfg.storageBucket && cfg.storageBucket !== 'YOUR_PROJECT_ID.appspot.com') {
                const storageRef = firebase.storage().ref(`uploads/${Date.now()}_${file.name}`);
                const uploadPromise = storageRef.put(file);
                const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Storage Upload Timeout')), 2000));
                await Promise.race([uploadPromise, timeoutPromise]);
                imageURL = await storageRef.getDownloadURL();
            }
        } catch (se) { console.warn('Storage skipped:', se.message); }
        */ 
        // Image URL left empty to skip cloud storage for now
        imageURL = '';

        // 2) POST to backend
        const form = new FormData();
        form.append('image', file);
        form.append('imageURL', imageURL);

        // Attach user info if logged in
        if (currentUser) {
            form.append('userId', currentUser.uid);
            form.append('phoneNumber', currentUser.phoneNumber || '');
        }

        const resp = await fetch(`${BACKEND_URL}/predict`, { method: 'POST', body: form });
        if (!resp.ok) { const err = await resp.json(); throw new Error(err.error || 'Prediction failed'); }
        const data = await resp.json();
        lastResult = data.result;

        /*
        // 3) Save to Firestore (Skipped to avoid UI lag)
        try {
            const cfg = window.firebaseConfig || {};
            if (cfg.projectId && cfg.projectId !== 'YOUR_PROJECT_ID') {
                await firebase.firestore().collection('uploads').add({
                    imageURL,
                    crop: lastResult.crop,
                    disease: lastResult.disease,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
        } catch (de) { console.warn('Firestore skipped'); }
        */

        displayResult(lastResult);
        showToast(currentLang === 'kn'
            ? `✅ ${lastResult.crop}: ${lastResult.disease} (${lastResult.confidence}%)`
            : `✅ ${lastResult.crop}: ${lastResult.disease} (${lastResult.confidence}%)`, 'info');

    } catch (err) {
        showToast(err.message || (currentLang === 'kn'
            ? 'ವಿಶ್ಲೇಷಣೆ ವಿಫಲ. ಬ್ಯಾಕೆಂಡ್ ಪೋರ್ಟ್ 5000 ಚಲಿಸುತ್ತಿದೆಯೇ ನೋಡಿ.'
            : 'Analysis failed. Make sure backend is running on port 5000.'), 'error', 7000);
    } finally {
        loadingOverlay.classList.remove('show');
        analyzeBtn.disabled = false;
    }
}

// ─── GOOGLE TRANSLATE HELPER ─────────────────────────────────
async function translateText(text, tl) {
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        const json = await res.json();
        // json[0] is an array of [translatedSegment, originalSegment] pairs
        return json[0].map(s => s[0]).join('');
    } catch (e) {
        return text; // fallback to original on network error
    }
}

async function translateArray(arr, tl) {
    return Promise.all(arr.map(item => translateText(item, tl)));
}

// ─── DISPLAY RESULT ───────────────────────────────────────────
function displayResult(r) {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    const sevClass = r.severity.toLowerCase().split(' ')[0].replace(/\(.*\)/, '').trim();
    const banner = $id('result-banner');
    banner.className = `result-banner ${sevClass}`;

    $id('result-disease').textContent = r.disease;
    $id('result-crop').textContent = `${t['label-crop']}: ${r.crop}`;
    $id('result-confidence-val').textContent = `${t['label-confidence']}: ${r.confidence}%`;
    $id('confidence-fill').style.width = `${r.confidence}%`;

    const badge = $id('severity-badge');
    badge.textContent = r.severity;
    badge.className = `severity-badge severity-${sevClass}`;

    const emoji = { None: '🌱', Mild: '⚠️', Moderate: '🟡', High: '🔴', Severe: '❗' };
    $id('disease-emoji').textContent = emoji[r.severity] || '🔍';

    // Show English content immediately so card appears without delay
    renderList('causes-list', r.causes);
    renderList('treatment-list', r.treatment);
    renderList('prevention-list', r.prevention);

    resultCard.classList.add('show');
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // If Kannada mode → auto-translate all list content + disease name
    if (currentLang === 'kn') {
        // Show a subtle translating indicator
        ['causes-list', 'treatment-list', 'prevention-list'].forEach(id => {
            const el = $id(id);
            el.style.opacity = '0.5';
        });

        Promise.all([
            translateText(r.disease, 'kn'),
            translateText(r.crop, 'kn'),
            translateText(r.severity, 'kn'),
            translateArray(r.causes, 'kn'),
            translateArray(r.treatment, 'kn'),
            translateArray(r.prevention, 'kn')
        ]).then(([disease, crop, severity, causes, treatment, prevention]) => {
            $id('result-disease').textContent = disease;
            $id('result-crop').textContent = `${t['label-crop']}: ${crop}`;
            badge.textContent = severity;

            renderList('causes-list', causes);
            renderList('treatment-list', treatment);
            renderList('prevention-list', prevention);

            ['causes-list', 'treatment-list', 'prevention-list'].forEach(id => {
                $id(id).style.opacity = '1';
            });
        }).catch(() => {
            // Translation failed — keep English
            ['causes-list', 'treatment-list', 'prevention-list'].forEach(id => {
                $id(id).style.opacity = '1';
            });
        });
    }
}

function renderList(id, items) {
    $id(id).innerHTML = items.map(i => `<li>${i}</li>`).join('');
}


// ─── HISTORY ─────────────────────────────────────────────────
(function loadHistory() {
    const cfg = window.firebaseConfig || {};
    if (!cfg.projectId || cfg.projectId === 'YOUR_PROJECT_ID') {
        $id('history-list').innerHTML =
            `<div class="history-empty"><div class="empty-icon">📋</div><p>${currentLang === 'kn' ? 'ಇತಿಹಾಸ ನೋಡಲು Firebase ಕಾನ್ಫಿಗರ್ ಮಾಡಿ.' : 'Configure Firebase to view history.'
            }</p></div>`;
        return;
    }
    try {
        firebase.firestore().collection('uploads')
            .orderBy('timestamp', 'desc').limit(20)
            .onSnapshot(snap => {
                const list = $id('history-list');
                if (snap.empty) {
                    list.innerHTML = `<div class="history-empty"><div class="empty-icon">📋</div><p>${currentLang === 'kn' ? 'ಇನ್ನೂ ಅಪ್ಲೋಡ್ ಇಲ್ಲ. ನಿಮ್ಮ ಮೊದಲ ಎಲೆ ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ!' : 'No uploads yet. Upload your first leaf photo!'
                        }</p></div>`;
                    return;
                }
                list.innerHTML = '';
                snap.forEach(d => {
                    const data = d.data();
                    const date = data.timestamp?.toDate
                        ? data.timestamp.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                        : (currentLang === 'kn' ? 'ಇತ್ತೀಚೆಗೆ' : 'Recently');
                    const item = document.createElement('div');
                    item.className = 'history-item';
                    item.setAttribute('role', 'listitem');
                    item.innerHTML = `
                        <div class="history-thumb">
                            ${data.imageURL ? `<img src="${data.imageURL}" alt="${data.crop}">` : '🌿'}
                        </div>
                        <div class="history-info">
                            <strong>${data.disease || '–'}</strong>
                            <span>${data.crop || ''} · ${date}</span>
                        </div>
                        <div class="history-badge">${data.confidence ? data.confidence + '%' : ''}</div>
                    `;
                    list.appendChild(item);
                });
            }, err => { console.warn('History:', err.message); });
    } catch (e) { console.warn('History setup:', e.message); }
})();

// ─── LANGUAGE TOGGLE ─────────────────────────────────────────
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        currentLang = btn.dataset.lang;
        applyLanguage(currentLang);
        showToast(currentLang === 'kn' ? '🌐 ಭಾಷೆ: ಕನ್ನಡ' : '🌐 Language: English', 'info', 2500);
    });
});

// ─── TTS ──────────────────────────────────────────────────

// Check if a native Kannada voice is available in the browser
function hasKannadaVoice() {
    return window.speechSynthesis.getVoices().some(v => v.lang.startsWith('kn'));
}

// Play Kannada text using Google Translate TTS (no kn voice needed)
function speakKannadaGtts(text, speakBtn) {
    const encoded = encodeURIComponent(text);
    // Google Translate TTS – unofficial but reliable for Kannada
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=kn&client=tw-ob&ttsspeed=0.9`;
    const audio = new Audio(url);
    if (speakBtn) {
        audio.onplay = () => speakBtn.style.background = 'rgba(82,183,136,0.4)';
        audio.onended = () => speakBtn.style.background = '';
        audio.onerror = () => speakBtn.style.background = '';
    }
    audio.play().catch(err => {
        console.warn('Google TTS failed:', err.message);
        // Last resort: speak in English using native TTS
        const utt = new SpeechSynthesisUtterance(text);
        utt.lang = 'en-IN';
        utt.rate = 0.93;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utt);
    });
}

function speak(text, lang) {
    if (!window.speechSynthesis) return;
    if (lang === 'kn' && !hasKannadaVoice()) {
        speakKannadaGtts(text, null);
        return;
    }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = lang === 'kn' ? 'kn-IN' : 'en-IN';
    utt.rate = 0.93;
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(v => v.lang.startsWith(lang === 'kn' ? 'kn' : 'en'));
    if (match) utt.voice = match;
    window.speechSynthesis.speak(utt);
}

function speakResult(r, lang) {
    let text;
    if (lang === 'kn') {
        text = `ಬೆಳೆ: ${r.crop}. ರೋಗ: ${r.disease}. ನಂಬಿಕೆ: ${r.confidence} ಶೇಕಡಾ. ತೀವ್ರತೆ: ${r.severity}. ಚಿಕಿತ್ಸೆ: ${r.treatment.join('. ')}.`;
    } else {
        text = `Crop detected: ${r.crop}. Disease: ${r.disease}. Confidence: ${r.confidence} percent. Severity: ${r.severity}. Treatment: ${r.treatment.join('. ')}. Prevention: ${r.prevention.join('. ')}.`;
    }

    const speakBtn = $id('speak-btn');

    if (lang === 'kn' && !hasKannadaVoice()) {
        // Use Google TTS for Kannada
        speakKannadaGtts(text, speakBtn);
        return;
    }

    if (!window.speechSynthesis) { showToast('TTS not supported in this browser.', 'warning'); return; }
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = lang === 'kn' ? 'kn-IN' : 'en-IN';
    utt.rate = 0.93;
    utt.onstart = () => speakBtn.style.background = 'rgba(82,183,136,0.4)';
    utt.onend = () => speakBtn.style.background = '';
    utt.onerror = () => speakBtn.style.background = '';
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(v => v.lang.startsWith(lang === 'kn' ? 'kn' : 'en'));
    if (match) utt.voice = match;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utt);
}


$id('speak-btn').addEventListener('click', () => {
    if (!lastResult) {
        showToast(currentLang === 'kn' ? 'ಮೊದಲು ಚಿತ್ರ ವಿಶ್ಲೇಷಿಸಿ.' : 'No result to speak. Analyze an image first.', 'warning');
        return;
    }
    speakResult(lastResult, currentLang);
});

$id('read-result-btn').addEventListener('click', () => {
    if (!lastResult) {
        showToast(currentLang === 'kn' ? 'ಮೊದಲು ಚಿತ್ರ ವಿಶ್ಲೇಷಿಸಿ.' : 'No result to speak. Analyze an image first.', 'warning');
        return;
    }
    speakResult(lastResult, currentLang);
});

// ─── VOICE ASSISTANT ─────────────────────────────────────────
let recognition = null;
const micBtn = $id('mic-btn');
const voiceText = $id('voice-text');

micBtn.addEventListener('click', () => isListening ? stopListening() : startListening());

function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        showToast(currentLang === 'kn' ? 'ಧ್ವನಿ ಗುರುತಿಸಲು Chrome ಬ್ರೌಸರ್ ಬಳಸಿ.' : 'Voice recognition requires Chrome browser.', 'warning');
        return;
    }

    // Try Kannada recognition; fall back to en-IN if kn-IN errors out
    const tryLang = currentLang === 'kn' ? 'kn-IN' : 'en-IN';
    _startRecognition(SpeechRecognition, tryLang);
}

function _startRecognition(SR, lang) {
    recognition = new SR();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 5; // more alternatives = better matching

    isListening = true;
    micBtn.classList.add('listening');
    voiceText.textContent = currentLang === 'kn' ? 'ಕೇಳುತ್ತಿದ್ದೇನೆ…' : 'Listening…';

    recognition.onresult = e => {
        // Collect ALL alternatives so we have the best chance of matching
        const transcripts = [];
        for (let i = 0; i < e.results[0].length; i++) {
            transcripts.push(e.results[0][i].transcript.trim().toLowerCase());
        }
        const combined = transcripts.join(' ');
        voiceText.textContent = `"${transcripts[0]}"`;
        processCmd(combined);
    };

    recognition.onerror = err => {
        // If kn-IN is not supported, silently retry with en-IN
        if (lang === 'kn-IN' && (err.error === 'language-not-supported' || err.error === 'network')) {
            console.warn('kn-IN not supported, retrying with en-IN');
            isListening = false;
            micBtn.classList.remove('listening');
            _startRecognition(SR, 'en-IN');
            return;
        }
        voiceText.textContent = currentLang === 'kn' ? 'ದೋಷ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' : 'Error. Try again.';
        stopListening();
    };
    recognition.onend = () => stopListening();
    try { recognition.start(); } catch (e) { stopListening(); }
}

function stopListening() {
    isListening = false;
    micBtn.classList.remove('listening');
    if (recognition) { try { recognition.stop(); } catch (e) { } }
    setTimeout(() => {
        voiceText.textContent = TRANSLATIONS[currentLang]['voice-placeholder'];
    }, 2500);
}

// processCmd is called with ALL recognition alternatives joined,
// so we check for Kannada script, transliterated, and English keywords.
function processCmd(cmd) {
    // ── UPLOAD ──────────────────────────────────────────────────
    if (cmd.includes('upload') || cmd.includes('photo') || cmd.includes('image') ||
        cmd.includes('file') || cmd.includes('select') ||
        // Kannada script
        cmd.includes('ಅಪ್ಲೋಡ್') || cmd.includes('ಚಿತ್ರ') || cmd.includes('ಫೈಲ್') ||
        // transliterated (Google may return these)
        cmd.includes('aplod') || cmd.includes('chitra') || cmd.includes('photo maddu') ||
        cmd.includes('upload maddu') || cmd.includes('nanna photo')) {

        fileInput.click();
        speak(currentLang === 'kn' ? 'ಫೈಲ್ ಆಯ್ಕೆ ತೆರೆಯಲಾಗುತ್ತಿದೆ' : 'Opening file selector. Please choose a leaf image.', currentLang);

        // ── ANALYZE ─────────────────────────────────────────────────
    } else if (
        cmd.includes('analyz') || cmd.includes('detect') || cmd.includes('scan') ||
        cmd.includes('check') || cmd.includes('start') || cmd.includes('run') ||
        // Kannada
        cmd.includes('ವಿಶ್ಲೇಷಣೆ') || cmd.includes('ಪರೀಕ್ಷಿಸು') || cmd.includes('ರೋಗ ಪತ್ತೆ') ||
        // transliterated
        cmd.includes('vishleshane') || cmd.includes('parikshisu') || cmd.includes('analyze maddu') ||
        cmd.includes('roga patte') || cmd.includes('scan maddu')) {

        analyzeImage();
        speak(currentLang === 'kn' ? 'ವಿಶ್ಲೇಷಣೆ ಆರಂಭಿಸಲಾಗಿದೆ' : 'Analyzing the image. Please wait.', currentLang);

        // ── READ RESULT ─────────────────────────────────────────────
    } else if (
        cmd.includes('result') || cmd.includes('disease') || cmd.includes('tell') ||
        cmd.includes('read') || cmd.includes('what') || cmd.includes('show') ||
        // Kannada
        cmd.includes('ರೋಗ') || cmd.includes('ವಿವರ') || cmd.includes('ಫಲಿತಾಂಶ') ||
        cmd.includes('ಹೇಳು') || cmd.includes('ಓದು') ||
        // transliterated
        cmd.includes('falithamsha') || cmd.includes('roga') || cmd.includes('vivara') ||
        cmd.includes('helu') || cmd.includes('odu')) {

        if (lastResult) speakResult(lastResult, currentLang);
        else speak(currentLang === 'kn' ? 'ಫಲಿತಾಂಶ ಇಲ್ಲ. ಮೊದಲು ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ' : 'No result yet. Please upload and analyze an image first.', currentLang);

        // ── TREATMENT ───────────────────────────────────────────────
    } else if (
        cmd.includes('treatment') || cmd.includes('medicine') || cmd.includes('cure') || cmd.includes('fix') ||
        // Kannada
        cmd.includes('ಔಷಧಿ') || cmd.includes('ಚಿಕಿತ್ಸೆ') || cmd.includes('ಗುಣ') ||
        // transliterated
        cmd.includes('aushadhi') || cmd.includes('chikitse') || cmd.includes('guna')) {

        if (lastResult) speak(currentLang === 'kn'
            ? `ಚಿಕಿತ್ಸೆ: ${lastResult.treatment.join('. ')}`
            : `Treatment: ${lastResult.treatment.join('. ')}`, currentLang);
        else speak(currentLang === 'kn' ? 'ಫಲಿತಾಂಶ ಇಲ್ಲ' : 'No result yet.', currentLang);

        // ── HISTORY ─────────────────────────────────────────────────
    } else if (
        cmd.includes('history') || cmd.includes('previous') || cmd.includes('past') ||
        cmd.includes('ಇತಿಹಾಸ') || cmd.includes('ಹಿಂದಿನ') ||
        cmd.includes('itihaasa') || cmd.includes('hindina')) {

        $id('history-section').scrollIntoView({ behavior: 'smooth' });
        speak(currentLang === 'kn' ? 'ಅಪ್ಲೋಡ್ ಇತಿಹಾಸ ತೋರಿಸಲಾಗುತ್ತಿದೆ.' : 'Showing your upload history.', currentLang);

    } else {
        speak(currentLang === 'kn'
            ? 'ಆದೇಶ ಅರ್ಥವಾಗಲಿಲ್ಲ. ಚಿತ್ರ ಅಪ್ಲೋಡ್, ರೋಗ ವಿಶ್ಲೇಷಣೆ, ಅಥವಾ ಫಲಿತಾಂಶ ಹೇಳು ಪ್ರಯತ್ನಿಸಿ.'
            : 'Command not recognized. Try: "upload image", "analyze disease", or "tell disease result".', currentLang);
    }
}

window.speechSynthesis.onvoiceschanged = () => { };
