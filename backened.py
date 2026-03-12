import io
import numpy as np
import tf_keras
from fastapi import FastAPI, UploadFile, File
from PIL import Image

# 1. Initialize FastAPI app
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Smart Crop Disease AI Service is running", "endpoint": "/predict (POST)"}

# 2. Define constants
CLASS_NAMES = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight',
    'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy',
    'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

MODEL_PATH = "trained_plant_disease_model_10epoch.keras"
IMG_SIZE = (128, 128)  # Default for typical Keras plant models, adjust if yours was 224


# 3. Load the Keras model at startup
try:
    model = tf_keras.models.load_model(MODEL_PATH)
    print(f"Backend: Keras Model loaded successfully.")
except Exception as e:
    print(f"Backend: Failed to load model. Error: {e}")
    model = None

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        return {"error": "Model not loaded properly on the server"}

    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    image = image.resize(IMG_SIZE)
    input_data = np.array(image).astype(np.float32) / 255.0
    input_data = np.expand_dims(input_data, axis=0)

    # Make Keras prediction
    probabilities = model.predict(input_data)[0]
    predicted_idx = np.argmax(probabilities)
    confidence = float(probabilities[predicted_idx])
    
    return {
        "filename": file.filename,
        "prediction": CLASS_NAMES[predicted_idx],
        "confidence": f"{confidence:.2%}",
        "class_index": int(predicted_idx)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)