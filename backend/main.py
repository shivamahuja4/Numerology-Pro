from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import numerology

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisRequest(BaseModel):
    name: str
    dob: str  # YYYY-MM-DD
    gender: str

@app.get("/")
def read_root():
    return {"message": "Numerology API is running"}

@app.post("/analyze")
def analyze(request: AnalysisRequest):
    mulank = numerology.calculate_mulank(request.dob)
    bhagyank = numerology.calculate_bhagyank(request.dob)
    kua = numerology.calculate_kua(request.dob, request.gender)
    loshu = numerology.generate_lo_shu_grid(request.dob)
    periods = numerology.calculate_personal_periods(request.dob)
    
    return {
        "mulank": mulank,
        "bhagyank": bhagyank,
        "kua": kua,
        "loshu": loshu,
        "periods": periods
    }
