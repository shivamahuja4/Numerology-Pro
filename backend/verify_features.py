
import sys
import os

# Add backend directory to path to import numerology
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../Documents/Numerology/backend')))

try:
    import numerology
except ImportError:
    # If running from a different location, try to adjust
    sys.path.append('/Users/shivamahuja/Documents/Numerology/backend')
    import numerology

def test_compatibility():
    print("Testing Compatibility Logic...")
    
    # Test cases based on the chart
    test_cases = [
        (1, 1, "Lucky"), (1, 8, "Unlucky"), (1, 4, "Neutral"),
        (2, 3, "Lucky"), (2, 8, "Unlucky"), (2, 2, "Neutral"),
        (5, 5, "Lucky"), (5, 8, "Neutral"), # 5 has no enemy
        (8, 1, "Unlucky"), (8, 5, "Lucky")
    ]
    
    for mulank, number, expected in test_cases:
        actual = numerology.get_compatibility(mulank, number)
        status = "PASS" if actual == expected else f"FAIL (Expected {expected}, got {actual})"
        print(f"Mulank {mulank} vs {number}: {status}")

def test_calculations():
    print("\nTesting Calculations...")
    
    # Mobile
    mobile = "9876543210" 
    # Sum: 9+8+7+6+5+4+3+2+1+0 = 45 -> 4+5 = 9
    mob_total = numerology.calculate_mobile_total(mobile)
    print(f"Mobile {mobile}: Total {mob_total} (Expected 9) -> {'PASS' if mob_total == 9 else 'FAIL'}")
    
    # Vehicle
    # "Only use the numbers, do not consider alphabets"
    plate = "MH01AB1234"
    # Digits: 0, 1, 1, 2, 3, 4. Sum: 11. -> 2
    veh_total = numerology.calculate_vehicle_total(plate)
    print(f"Vehicle {plate}: Total {veh_total} (Expected 2) -> {'PASS' if veh_total == 2 else 'FAIL'}")
    
    # House
    house = "101"
    # Sum: 1+0+1 = 2
    house_total = numerology.calculate_house_total(house)
    print(f"House {house}: Total {house_total} (Expected 2) -> {'PASS' if house_total == 2 else 'FAIL'}")

if __name__ == "__main__":
    try:
        test_compatibility()
        test_calculations()
    except AttributeError:
        print("Functions not yet implemented in numerology.py")
    except Exception as e:
        print(f"An error occurred: {e}")
