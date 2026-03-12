import requests
import numpy as np
from PIL import Image
import io

# Create a dummy image
img = Image.fromarray(np.random.randint(0, 255, (224, 224, 3), dtype=np.uint8))
img_byte_arr = io.BytesIO()
img.save(img_byte_arr, format='JPEG')
img_byte_arr = img_byte_arr.getvalue()

# Send request to prediction endpoint
url = "http://localhost:8000/predict"
files = {'file': ('dummy.jpg', img_byte_arr, 'image/jpeg')}
try:
    response = requests.post(url, files=files)
    print("Response Status Code:", response.status_code)
    print("Response JSON:", response.json())
except Exception as e:
    print("Error:", e)
