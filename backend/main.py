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
    try:
        mulank = numerology.calculate_mulank(request.dob)
        bhagyank = numerology.calculate_bhagyank(request.dob)
        kua = numerology.calculate_kua(request.dob, request.gender)
        loshu = numerology.generate_lo_shu_grid(request.dob, mulank, bhagyank, kua)
        name_number = numerology.calculate_name_number(request.name)
        periods = numerology.calculate_personal_periods(request.dob)
        
        return {
            "mulank": mulank,
            "bhagyank": bhagyank,
            "kua": kua,
            "name_number": name_number,
            "loshu": loshu,
            "periods": periods
        }
    except Exception as e:
        import traceback
        return {"error": str(e), "traceback": traceback.format_exc()}
