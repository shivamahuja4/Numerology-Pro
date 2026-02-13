import os
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import numerology

app = FastAPI()

# Read allowed origins from environment variable (comma-separated)
# Defaults to localhost for development
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
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
        
        life_roadmap = {
            "pinnacles_challenges": numerology.calculate_pinnacles_and_challenges(request.dob),
            "essence": numerology.calculate_essence(request.dob, request.name)
        }
        
        return {
            "mulank": mulank,
            "bhagyank": bhagyank,
            "kua": kua,
            "name_number": name_number,
            "loshu": loshu,
            "periods": periods,
            "life_roadmap": life_roadmap
        }
    except Exception as e:
        import traceback
        return {"error": str(e), "traceback": traceback.format_exc()}

class MobileAnalysisRequest(BaseModel):
    mobile_number: str
    dob: str

class VehicleAnalysisRequest(BaseModel):
    vehicle_number: str
    dob: str

class HouseAnalysisRequest(BaseModel):
    house_number: str
    dob: str

@app.post("/analyze/mobile")
def analyze_mobile(request: MobileAnalysisRequest):
    try:
        mulank = numerology.calculate_mulank(request.dob)
        bhagyank = numerology.calculate_bhagyank(request.dob)
        mobile_data = numerology.calculate_mobile_total(request.mobile_number)
        
        compatibility = numerology.get_compatibility(mulank, mobile_data["single_digit"])
        
        return {
            "mulank": mulank,
            "bhagyank": bhagyank,
            "mobile_total": mobile_data["single_digit"],
            "mobile_compound": mobile_data["total_sum"],
            "compatibility": compatibility
        }
    except Exception as e:
        import traceback
        return {"error": str(e), "traceback": traceback.format_exc()}

@app.post("/analyze/vehicle")
def analyze_vehicle(request: VehicleAnalysisRequest):
    try:
        mulank = numerology.calculate_mulank(request.dob)
        bhagyank = numerology.calculate_bhagyank(request.dob)
        vehicle_data = numerology.calculate_vehicle_total(request.vehicle_number)
        
        compatibility = numerology.get_compatibility(mulank, vehicle_data["single_digit"])
        
        return {
            "mulank": mulank,
            "bhagyank": bhagyank,
            "vehicle_total": vehicle_data["single_digit"],
            "vehicle_compound": vehicle_data["total_sum"],
            "compatibility": compatibility
        }
    except Exception as e:
        import traceback
        return {"error": str(e), "traceback": traceback.format_exc()}

@app.post("/analyze/house")
def analyze_house(request: HouseAnalysisRequest):
    try:
        mulank = numerology.calculate_mulank(request.dob)
        bhagyank = numerology.calculate_bhagyank(request.dob)
        house_data = numerology.calculate_house_total(request.house_number)
        
        compatibility = numerology.get_compatibility(mulank, house_data["single_digit"])
        
        return {
            "mulank": mulank,
            "bhagyank": bhagyank,
            "house_total": house_data["single_digit"],
            "house_compound": house_data["total_sum"],
            "compatibility": compatibility
        }
    except Exception as e:
        import traceback
        return {"error": str(e), "traceback": traceback.format_exc()}

