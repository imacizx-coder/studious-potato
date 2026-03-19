from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

class Message(BaseModel):
    message: str

@app.post("/ai")
def ai_response(msg: Message):
    user_input = msg.message.lower()

    # AI sederhana (tanpa API dulu)
    if "pusing" in user_input:
        reply = "Coba istirahat 5 menit lalu lanjut lagi ya 👍"
    elif "belajar" in user_input:
        reply = "Gunakan teknik Pomodoro: 25 menit fokus!"
    else:
        reply = "Tetap semangat! Kamu pasti bisa 🚀"

    return {"reply": reply}