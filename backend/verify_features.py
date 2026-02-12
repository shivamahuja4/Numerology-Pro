import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_mobile_numerology():
    print("\n--- Testing Mobile Numerology ---")
    data = {"mobile_number": "9999999999", "dob": "1990-01-01"}
    try:
        response = requests.post(f"{BASE_URL}/analyze/mobile", json=data)
        print(f"Status: {response.status_code}")
        print(json.dumps(response.json(), indent=2))
        assert "mobile_compound" in response.json()
    except Exception as e:
        print(f"Error: {e}")

def test_vehicle_numerology():
    print("\n--- Testing Vehicle Numerology ---")
    data = {"vehicle_number": "MH01AB1234", "dob": "1990-01-02"}
    try:
        response = requests.post(f"{BASE_URL}/analyze/vehicle", json=data)
        print(f"Status: {response.status_code}")
        print(json.dumps(response.json(), indent=2))
        assert "vehicle_compound" in response.json()
    except Exception as e:
        print(f"Error: {e}")

def test_house_numerology():
    print("\n--- Testing House Numerology ---")
    data = {"house_number": "108", "dob": "1990-01-08"}
    try:
        response = requests.post(f"{BASE_URL}/analyze/house", json=data)
        print(f"Status: {response.status_code}")
        print(json.dumps(response.json(), indent=2))
        assert "house_compound" in response.json()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_mobile_numerology()
    test_vehicle_numerology()
    test_house_numerology()
