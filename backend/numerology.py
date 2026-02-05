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

def calculate_personal_periods(dob: str, target_date: str = None) -> dict:
    from datetime import datetime
    
    if target_date is None:
        target_date = datetime.now().strftime("%Y-%m-%d")
        
    dob_parts = dob.split("-")
    birth_day = int(dob_parts[2])
    birth_month = int(dob_parts[1])
    
    target_parts = target_date.split("-")
    current_year = int(target_parts[0])
    current_month = int(target_parts[1])
    current_day = int(target_parts[2])
    
    # Personal Year = Birth Day + Birth Month + Current Year
    py = reduce_to_single_digit(birth_day + birth_month + reduce_to_single_digit(current_year))
    
    # Personal Month = Personal Year + Current Month
    pm = reduce_to_single_digit(py + current_month)
    
    # Personal Day = Personal Month + Current Day
    pd = reduce_to_single_digit(pm + current_day)
    
    return {
        "personal_year": py,
        "personal_month": pm,
        "personal_day": pd
    }
