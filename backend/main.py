python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
import base64
import numpy as np
from datetime import datetime
import io
import soundfile as sf
import logging

logging.basicConfig(level=logging.INFO)
app = FastAPI(title="🎵 AI Beat Maker")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"], 
    allow_headers=["*"],
)

class SoundRequest(BaseModel):
    text_input: str
    duration: int = 6

@app.get("/")
async def root():
    return {"message": "🎵 AI Beat Maker API Çalışıyor!"}

@app.get("/api/health") 
async def health_check():
    return {"status": "healthy"}

@app.post("/api/generate-sound")
async def generate_sound(request: SoundRequest):
    try:
        # Basit ses simülasyonu
        sample_rate = 44100
        duration = request.duration
        t = np.linspace(0, duration, int(sample_rate * duration))
        
        # Farklı sesler için farklı frekanslar
        if 'bass' in request.text_input.lower():
            freq = 80  # Bass frekansı
        elif 'snare' in request.text_input.lower():
            freq = 200  # Snare frekansı  
        else:
            freq = 1000  # Hi-hat frekansı
            
        audio_data = 0.3 * np.sin(2 * np.pi * freq * t)
        
        # Stereo yap
        if len(audio_data.shape) == 1:
            audio_data = np.column_stack([audio_data, audio_data])
        
        # WAV'a çevir
        buffer = io.BytesIO()
        sf.write(buffer, audio_data, sample_rate, format='WAV')
        buffer.seek(0)
        audio_base64 = base64.b64encode(buffer.read()).decode('utf-8')
        
        return {
            "id": str(uuid.uuid4()),
            "name": request.text_input, 
            "audio": audio_base64,
            "duration": duration,
            "timestamp": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ses üretim hatası: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
