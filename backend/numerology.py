def reduce_to_single_digit(n: int) -> int:
    while n > 9:
        n = sum(int(digit) for digit in str(n))
    return n

def calculate_mulank(dob: str) -> int:
    # DOB format: YYYY-MM-DD
    parts = dob.split("-")
    day = int(parts[2])
    return reduce_to_single_digit(day)

def calculate_bhagyank(dob: str) -> int:
    # DOB format: YYYY-MM-DD
    total = sum(int(digit) for digit in dob if digit.isdigit())
    return reduce_to_single_digit(total)

def calculate_kua(dob: str, gender: str) -> int:
    year = int(dob.split("-")[0])
    year_sum = reduce_to_single_digit(year)
    
    gender = gender.lower()
    if gender == "male":
        kua = 11 - year_sum
    else:  # female
        kua = 4 + year_sum
        
    kua = reduce_to_single_digit(kua)
    
    if kua == 5:
        return 2 if gender == "male" else 8
    
    return kua

def generate_lo_shu_grid(dob: str) -> dict:
    # Count occurrences of numbers 1-9 in DOB
    digits = [digit for digit in dob if digit.isdigit() and digit != '0']
    grid_counts = {str(i): 0 for i in range(1, 10)}
    
    for d in digits:
        if d in grid_counts:
            grid_counts[d] += 1
            
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
