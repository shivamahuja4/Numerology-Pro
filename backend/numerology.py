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

