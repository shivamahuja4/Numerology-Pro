def reduce_to_single_digit(n: int) -> int:
    """
    Recursively sums the digits of n until a single digit (1-9) is obtained.
    Example: 38 -> 11 -> 2
    """
    while n > 9:
        n = sum(int(digit) for digit in str(n))
    return n

def calculate_mulank(dob: str) -> int:
    """
    Calculates Mulank (Psychic Number) from the Day of Birth.
    Format: YYYY-MM-DD
    Logic: Sum of day digits reduced to single digit.
    """
    parts = dob.split("-")
    day = int(parts[2])
    return reduce_to_single_digit(day)

def calculate_bhagyank(dob: str) -> int:
    """
    Calculates Bhagyank (Destiny Number) from the full DOB.
    Logic: Sum of all digits in DOB reduced to single digit.
    """
    total = sum(int(digit) for digit in dob if digit.isdigit())
    return reduce_to_single_digit(total)

def calculate_kua(dob: str, gender: str) -> int:
    """
    Calculates Kua Number based on Year and Gender.
    Logic:
    1. Sum last 2 digits of year -> reduce to single digit (Kua Factor).
    2. Apply century-based formula.
    3. Special rule for outcome 5.
    """
    year_str = dob.split("-")[0]
    year = int(year_str)
    
    # Step 1: Kua Factor (sum of last 2 digits reduced)
    # Example 1981: 8+1=9.
    last_two_digits = year_str[-2:]
    kua_factor = reduce_to_single_digit(int(last_two_digits[0]) + int(last_two_digits[1]))
    
    gender = gender.lower()
    kua = 0
    
    # Step 2: Apply Gender limits
    if 1900 <= year <= 1999:
        if gender == "male":
            kua = 10 - kua_factor
        else: # female
            kua = 5 + kua_factor
    elif 2000 <= year <= 2099:
        if gender == "male":
            kua = 9 - kua_factor
        else: # female
            kua = 6 + kua_factor
            
    # Reduce result if double digit (e.g. 5+9 = 14 -> 5)
    kua = reduce_to_single_digit(kua)
    
    # Step 3: Special Rule for 5
    if kua == 5:
        return 2 if gender == "male" else 8
        
    return kua

def generate_lo_shu_grid(dob: str, mulank: int, bhagyank: int, kua: int) -> dict:
    """
    Generates Lo Shu Grid with 4-layer filling algorithm.
    Layer 1: Raw DOB digits.
    Layer 2: Mulank (only if birth day was double digit).
    Layer 3: Bhagyank (Always).
    Layer 4: Kua Number (Always).
    """
    # Initialize grid counts
    grid_counts = {str(i): 0 for i in range(1, 10)}
    
    # Layer 1: Raw DOB Digits
    digits = [d for d in dob if d.isdigit() and d != '0']
    for d in digits:
        if d in grid_counts:
            grid_counts[d] += 1
            
    # Layer 2: Mulank Mapping
    # Rule: Only add if birth day was double digit
    day = int(dob.split("-")[2])
    if day > 9:
        if str(mulank) in grid_counts:
            grid_counts[str(mulank)] += 1
            
    # Layer 3: Bhagyank Mapping (Always)
    if str(bhagyank) in grid_counts:
        grid_counts[str(bhagyank)] += 1
        
    # Layer 4: Kua Number Mapping (Always)
    if str(kua) in grid_counts:
        grid_counts[str(kua)] += 1
            
    return grid_counts

def reduce_for_py_calculation(n: int) -> int:
    """
    Standard reduction for Personal Year calculation components.
    Original master number logic removed as per user request.
    """
    return reduce_to_single_digit(n)

def calculate_personal_periods(dob: str, target_date: str = None) -> dict:
    from datetime import datetime
    
    if target_date is None:
        target_date = datetime.now().strftime("%Y-%m-%d")
        
    dob_parts = dob.split("-")
    birth_day = int(dob_parts[2])
    birth_month = int(dob_parts[1])
    
    target_parts = target_date.split("-")
    current_year = int(target_parts[0])
    current_month_num = int(target_parts[1])
    current_day_num = int(target_parts[2])
    
    # --- 1. Personal Year (PY) Calculation ---
    # Formula: PY = (Birth Day + Birth Month + Current Year)
    # Special Rule: "If born on the 29th: 2+9 = 11. (Keep 11 for the sum)."
    
    # Reduce Birth Day (Standard Reduction)
    # Born on 29th: 2+9=11 -> 2 (No longer keeping 11)
    r_day = reduce_to_single_digit(birth_day)
    r_month = reduce_to_single_digit(birth_month)
    r_year = reduce_to_single_digit(current_year)
    
    # Final Sum: Day + Month + Year
    total_sum = r_day + r_month + r_year
    personal_year = reduce_to_single_digit(total_sum)
    
    # --- 2. Personal Month (PM) Calculation ---
    # Formula: PM = (Personal Year + Calendar Month Number)
    # "Where January = 1, December = 12/3 (1+2=3)" -> Checks out with standard reduction
    r_current_month = reduce_to_single_digit(current_month_num)
    personal_month = reduce_to_single_digit(personal_year + r_current_month)
    
    # --- 3. Personal Day (PD) Calculation ---
    # Formula: PD = (Personal Month + Calendar Day)
    r_current_day = reduce_to_single_digit(current_day_num)
    personal_day = reduce_to_single_digit(personal_month + r_current_day)
    
    # --- 4. Forecasting ---
    
    # Yearly Forecast (Next 9 years logic, but let's just show next 5-10 years)
    # "Logic Flow for 9-Year Cycle: NextYear_PY = (CurrentYear_PY + 1) IF NextYear_PY > 9 THEN NextYear_PY = 1"
    yearly_forecast = []
    temp_py = personal_year
    for i in range(10): # Current + 9 years
        year_val = current_year + i
        yearly_forecast.append({
            "year": year_val,
            "personal_year": temp_py
        })
        # Increment Logic
        temp_py += 1
        if temp_py > 9:
            temp_py = 1
            
    # Monthly Forecast (For current year)
    monthly_forecast = []
    # If PY is 5. Jan: 5+1=6. Feb: 5+2=7 ...
    # Wait, the prompt says "If PY is 5... Sept: 5+9=14 -> 5"
    # So we use the FIXED current Personal Year for all months of THIS calendar year.
    # Note: Personal Year changes on Jan 1st. So for the whole calendar year, PY is constant.
    
    months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ]
    
    for idx, m_name in enumerate(months):
        m_num = idx + 1
        pm_val = reduce_to_single_digit(personal_year + reduce_to_single_digit(m_num))
        monthly_forecast.append({
            "month": m_name,
            "month_num": m_num,
            "personal_month": pm_val
        })
        
    return {
        "current": {
            "personal_year": personal_year,
            "personal_month": personal_month,
            "personal_day": personal_day,
            "date": target_date
        },
        "yearly_forecast": yearly_forecast,
        "monthly_forecast": monthly_forecast
    }

def calculate_name_number(name: str) -> dict:
    """
    Calculates Name Number using Chaldean Numerology method.
    Mapping:
    1: A, I, J, Q, Y
    2: B, K, R
    3: C, G, L, S
    4: D, M, T
    5: E, H, N, X
    6: U, V, W
    7: O, Z
    8: F, P
    """
    if not name:
        return {"total_sum": 0, "single_digit": 0}
        
    chaldean_map = {
        'a': 1, 'i': 1, 'j': 1, 'q': 1, 'y': 1,
        'b': 2, 'k': 2, 'r': 2,
        'c': 3, 'g': 3, 'l': 3, 's': 3,
        'd': 4, 'm': 4, 't': 4,
        'e': 5, 'h': 5, 'n': 5, 'x': 5,
        'u': 6, 'v': 6, 'w': 6,
        'o': 7, 'z': 7,
        'f': 8, 'p': 8
    }
    
    clean_name = ''.join(c.lower() for c in name if c.isalpha())
    total_sum = sum(chaldean_map.get(char, 0) for char in clean_name)
    single_digit = reduce_to_single_digit(total_sum)
    
    return {
        "total_sum": total_sum,
        "single_digit": single_digit
    }


def calculate_mobile_total(mobile_number: str) -> dict:
    """
    Sums all digits in the mobile number and reduces to a single digit.
    Returns { "total_sum": int, "single_digit": int }
    """
    # Filter only digits just in case
    digits = [int(d) for d in mobile_number if d.isdigit()]
    total = sum(digits)
    single = reduce_to_single_digit(total)
    return {"total_sum": total, "single_digit": single}

def calculate_vehicle_total(vehicle_number: str) -> dict:
    """
    Sums only the digits in the vehicle registration number.
    Returns { "total_sum": int, "single_digit": int }
    """
    digits = [int(d) for d in vehicle_number if d.isdigit()]
    total = sum(digits)
    single = reduce_to_single_digit(total)
    return {"total_sum": total, "single_digit": single}

def calculate_house_total(house_number: str) -> dict:
    """
    Sums the digits of the house number.
    Returns { "total_sum": int, "single_digit": int }
    """
    digits = [int(d) for d in house_number if d.isdigit()]
    total = sum(digits)
    single = reduce_to_single_digit(total)
    return {"total_sum": total, "single_digit": single}


def get_compatibility(mulank: int, number: int) -> dict:
    """
    Determines if the given number is Lucky (Friendly), Unlucky (Enemy), or Neutral
    for the given Mulank (1-9).
    Also returns list of lucky numbers.
    Based on provided table.
    """
    
    # Table Data
    # Mulank: { Lucky: [...], Unlucky: [...], Neutral: [...] }
    compatibility_data = {
        1: {"lucky": [1, 2, 3, 5, 9], "unlucky": [8],       "neutral": [4, 6, 7]},
        2: {"lucky": [1, 3, 5],       "unlucky": [4, 8, 9], "neutral": [2, 6, 7]},
        3: {"lucky": [1, 2, 3, 5, 9], "unlucky": [6],       "neutral": [4, 7, 8]},
        4: {"lucky": [1, 5, 6, 7, 8], "unlucky": [2, 9],    "neutral": [3, 4]},
        5: {"lucky": [1, 2, 3, 5, 6], "unlucky": [],        "neutral": [4, 7, 8, 9]}, # Unlucky: None in table
        6: {"lucky": [1, 5, 6, 7],    "unlucky": [3],       "neutral": [2, 4, 8, 9]},
        7: {"lucky": [1, 3, 4, 5, 6], "unlucky": [],        "neutral": [2, 7, 8, 9]}, # Unlucky: None
        8: {"lucky": [3, 5, 6, 7],    "unlucky": [1, 2],    "neutral": [4, 8, 9]},
        9: {"lucky": [1, 2, 3, 9],    "unlucky": [4, 5],    "neutral": [6, 7, 8]},
    }
    
    data = compatibility_data.get(mulank, {"lucky": [], "unlucky": [], "neutral": []})
    
    if number in data["lucky"]:
        status = "Lucky"
    elif number in data["unlucky"]:
        status = "Unlucky"
    else:
        status = "Neutral"
        
    return {
        "status": status,
        "lucky_numbers": data["lucky"]
    }
    
    if number in data["lucky"]:
        status = "Lucky"
    elif number in data["unlucky"]:
        status = "Unlucky"
    else:
        status = "Neutral"
        
    return {
        "status": status,
        "lucky_numbers": data["lucky"]
    }

def calculate_pinnacles_and_challenges(dob: str) -> dict:
    """
    Calculates 4 Pinnacles and 4 Challenges.
    Pinnacle Math: Addition. Do not reduce Master Numbers 11 or 22 in intermediate sums.
    Challenge Math: Absolute difference. Always reduce to single digits (1-9). No Master Numbers.
    Timing Rule: First Pinnacle ends at 36 - LP.
    """
    parts = dob.split("-")
    birth_year = int(parts[0])
    birth_month = int(parts[1])
    birth_day = int(parts[2])
    
    # Base Numbers
    # Month (M)
    m_pinnacle = birth_month # Preserve 11 for Pinnacles (logic handled in sum)
    # Actually, the prompt says: "Nov = 11; preserve 11 for Pinnacles"
    # But for addition M+D, if M=11, we use 11.
    
    m_challenge = reduce_to_single_digit(birth_month) # Reduce for Challenges
    
    # Day (D)
    d_pinnacle = birth_day # Preserve but usually simplified? 
    # Prompt: "Reduced birth day (e.g., 26 = 8)." for Base Numbers. 
    # But later "Pinnacle Math: Use addition. Do not reduce Master Numbers 11 or 22 if they appear in intermediate sums".
    # This implies we add the Reduced Base Numbers, but keep the Sum if it is 11 or 22.
    # "Base Numbers: Month... Day: Reduced birth day... Year: Reduced birth year..."
    # So we MUST reduce D and Y and M (unless M is 11) BEFORE adding for Pinnacle?
    # "Month ($M$): Reduced birth month (e.g., Nov = 11; preserve 11 for Pinnacles, reduce to 2 for Challenges)."
    # "Day ($D$): Reduced birth day (e.g., 26 = 8)."
    # "Year ($Y$): Reduced birth year (e.g., 1985...=5)."
    # So D and Y are ALWAYS reduced. M is 11 or reduced.
    
    d_reduced = reduce_to_single_digit(birth_day)
    # Check if we should preserve 11/22 for Day? Prompt doesn't explicitly say for Day/Year base, only Month.
    # "Day ($D$): Reduced birth day (e.g., 26 = 8)." -> Implies always reduce.
    # "Year ($Y$): Reduced birth year... = 5". -> Implies always reduce.
    
    y_reduced = reduce_to_single_digit(reduce_to_single_digit(birth_year)) # Recursive reduction to be sure? 
    # The reduce_to_single_digit function already loops until < 10.
    # Year calculation example: 1985 = 1+9+8+5 = 23 = 5. reduce_to_single_digit(1985) does this.
    y_reduced = reduce_to_single_digit(birth_year)

    # Life Path (LP) for Timing
    # "Full reduction of DOB"
    lp = reduce_to_single_digit(calculate_bhagyank(dob))
    # Wait, calculate_bhagyank returns single digit.
    # Prompt: "The First Pinnacle ends at age 36 minus the user’s Life Path number. If LP=11 or 22, use 2 or 4 for the subtraction logic."
    # Since calculate_bhagyank already reduces to single digit, we don't know if it was 11 or 22.
    # We need a non-reducing bhagyank calculation or check the intermediate.
    # Let's re-calculate LP properly for Master detection.
    
    total_dob_sum = sum(int(d) for d in dob if d.isdigit())
    lp_intermediate = total_dob_sum
    while lp_intermediate > 9 and lp_intermediate not in [11, 22]:
         lp_intermediate = sum(int(d) for d in str(lp_intermediate))
    
    lp_for_timing = lp_intermediate
    if lp_for_timing == 11:
        deduction = 2
    elif lp_for_timing == 22:
        deduction = 4
    else:
        # If it's still > 9 (e.g. 33, though prompt only mentions 11/22), reduce it?
        # Standard numerology reduces 33 to 6 usually unless specified.
        # "If LP=11 or 22, use 2 or 4...". Implies otherwise use LP value (which should be single digit).
        # Our while loop ensures it is single digit OR 11/22.
        if lp_for_timing > 9 and lp_for_timing not in [11, 22]:
             lp_for_timing = reduce_to_single_digit(lp_for_timing) # Should be covered by while loop
        deduction = reduce_to_single_digit(lp_for_timing)

    # Calculation Helpers
    def pinnacle_add(a, b):
        s = a + b
        # "Do not reduce Master Numbers 11 or 22 if they appear in intermediate sums (e.g., M(11)+D(11)=22)."
        if s in [11, 22]:
            return s
        return reduce_to_single_digit(s)

    def challenge_sub(a, b):
        diff = abs(a - b)
        # "Always reduce all numbers to single digits (1-9) before subtracting."
        # Use m_challenge, d_reduced, y_reduced which are single digits (M might be 11? No m_challenge is reduced).
        return reduce_to_single_digit(diff)
    
    # Base for Pinnacles
    # M: "Nov = 11; preserve 11 for Pinnacles". 
    if birth_month == 11:
        m_base_p = 11
    else:
        m_base_p = reduce_to_single_digit(birth_month)
        
    d_base_p = d_reduced
    y_base_p = y_reduced

    # Pinnacles
    p1 = pinnacle_add(m_base_p, d_base_p)
    p2 = pinnacle_add(d_base_p, y_base_p)
    p3 = pinnacle_add(p1, p2)
    p4 = pinnacle_add(m_base_p, y_base_p)
    
    # Challenges
    # "reduce to single digits... before subtracting"
    m_base_c = reduce_to_single_digit(birth_month)
    d_base_c = d_reduced
    y_base_c = y_reduced
    
    c1 = challenge_sub(m_base_c, d_base_c)
    c2 = challenge_sub(d_base_c, y_base_c)
    c3 = challenge_sub(c1, c2)
    c4 = challenge_sub(m_base_c, y_base_c)
    
    # Ranges
    end_p1 = 36 - deduction
    range_p1 = f"Birth to {end_p1}"
    
    start_p2 = end_p1 + 1
    end_p2 = start_p2 + 8 # "Next 9 Years" (inclusive? usually 9 year cycle. e.g. 0-27 (28 yrs? No 36-9=27. 0-27 is 28 years. 28-36 is 9 years).
    # Prompt: "Birth to (36-LP)". "Next 9 Years".
    # Implementation: Age ranges.
    range_p2 = f"{start_p2} to {end_p2}"
    
    start_p3 = end_p2 + 1
    end_p3 = start_p3 + 8 # Next 9 Years
    range_p3 = f"{start_p3} to {end_p3}"
    
    start_p4 = end_p3 + 1
    range_p4 = f"{start_p4}+"
    
    return [
        {"cycle": "I (Spring)", "range": range_p1, "pinnacle": p1, "challenge": c1},
        {"cycle": "II (Summer)", "range": range_p2, "pinnacle": p2, "challenge": c2},
        {"cycle": "III (Autumn)", "range": range_p3, "pinnacle": p3, "challenge": c3},
        {"cycle": "IV (Winter)", "range": range_p4, "pinnacle": p4, "challenge": c4},
    ]

def calculate_essence(dob: str, full_name: str) -> list:
    """
    Calculates Essence (Event) Number Grid for age 0 to 100.
    """
    if not full_name:
        return []

    # Parse Name
    # "Required Inputs: Full Name (First, Middle, Last)"
    # We assume space separated.
    parts = full_name.split()
    first = parts[0] if len(parts) > 0 else ""
    last = parts[-1] if len(parts) > 1 else ""
    middle = "".join(parts[1:-1]) if len(parts) > 2 else "" 
    # Logic if 2 names: First, Last. Middle is empty.
    # Logic if 3 names: First, Middle, Last.
    # Logic if >3 names: First, Middle...Middle, Last. Join Middles? 
    # "IF MiddleName = NULL THEN MiddleValue = 0."
    
    # Clean names
    def clean(s):
        return ''.join(c.upper() for c in s if c.isalpha())
    
    first = clean(first)
    middle = clean(middle)
    last = clean(last)
    
    # Helper to get sequence of letters and durations
    chaldean_map = {
        'A': 1, 'I': 1, 'J': 1, 'Q': 1, 'Y': 1,
        'B': 2, 'K': 2, 'R': 2,
        'C': 3, 'G': 3, 'L': 3, 'S': 3,
        'D': 4, 'M': 4, 'T': 4,
        'E': 5, 'H': 5, 'N': 5, 'X': 5,
        'U': 6, 'V': 6, 'W': 6,
        'O': 7, 'Z': 7,
        'F': 8, 'P': 8
    }
    
    def get_letter_sequence(name_str):
        seq = []
        for char in name_str:
            val = chaldean_map.get(char, 0)
            seq.append({"char": char, "val": val, "duration": val}) # duration = value
        return seq
    
    seq_first = get_letter_sequence(first)
    seq_middle = get_letter_sequence(middle)
    seq_last = get_letter_sequence(last)
    
    birth_year = int(dob.split("-")[0])
    
    essence_grid = []
    
    # Pointers for each name part
    # We need to track current letter index and remaining years for that letter
    
    def init_tracker(seq):
        if not seq: return None
        return {"index": 0, "remaining": seq[0]["duration"]}
        
    t_first = init_tracker(seq_first)
    t_middle = init_tracker(seq_middle)
    t_last = init_tracker(seq_last)
    
    for age in range(101): # 0 to 100
        year = birth_year + age
        
        # Calculate Essence
        val_f = seq_first[t_first["index"]]["val"] if t_first else 0
        val_m = seq_middle[t_middle["index"]]["val"] if t_middle else 0
        val_l = seq_last[t_last["index"]]["val"] if t_last else 0
        
        total = val_f + val_m + val_l
        
        # Reduce to single digit or Master Number (11, 22)
        # "Reduce the total to a single digit (1–9) or Master Number (11, 22)."
        reduced_essence = total
        while reduced_essence > 9 and reduced_essence not in [11, 22]:
             reduced_essence = sum(int(d) for d in str(reduced_essence))
             
        essence_grid.append({
            "age": age,
            "year": year,
            "essence": reduced_essence
        })
        
        # Advance Pointers
        def advance(tracker, seq):
            if not tracker: return
            tracker["remaining"] -= 1
            if tracker["remaining"] <= 0:
                # Move to next letter
                tracker["index"] += 1
                if tracker["index"] >= len(seq):
                    tracker["index"] = 0 # Loop
                tracker["remaining"] = seq[tracker["index"]]["duration"]
                
        advance(t_first, seq_first)
        advance(t_middle, seq_middle)
        advance(t_last, seq_last)
        
    return essence_grid
