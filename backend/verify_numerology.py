import numerology
from datetime import datetime

# Test Case 1: Born 29th June, Current Year 2025
# Day 29 -> 2+9=11 -> 2 (Standard Reduction)
# Month 6 -> 6
# Year 2025 -> 2+0+2+5=9
# Sum = 2 + 6 + 9 = 17 -> 1+7 = 8
# PY should be 8.
# Wait, let's re-calculate to see if result changed.
# Previous: 11 + 6 + 9 = 26 -> 8.
# New: 2 + 6 + 9 = 17 -> 8.
# The result IS THE SAME for this case, but the intermediate step differs.
# Let's find a case where it differs.
# If Day reduces to 2 (from 20 or 2) vs 11 (from 29).
# 2 + 6 + 9 = 17 -> 8.
# 11 + 6 + 9 = 26 -> 8.
# It seems purely mathematical that (11+X)%9 == (2+X)%9. (Since 11 = 2 mod 9).
# So the final single digit result might actually always be the same regardless of keeping 11 or not,
# unless we were keeping 11 as the FINAL result.
# The previous requirement was "Keep 11 for the sum", implying it's used in the intermediate addition.
# But since we reduce the final result to single digit anyway:
# (11+M+Y) reduce -> same as (2+M+Y) reduce.
# EXCEPT if the final result WAS 11, and we were supposed to keep it?
# The prompt said: "PY = (Birth Day + Birth Month + Current Year) ... The Personal Year is 8."
# It didn't explicitly say "Keep 11 as final PY".
# The user just said "remove the concept of master number 11... 11,22,33 would work just like other number".
# So our job is to ensure code reflects that simplicity.

print("--- Test Case 1: PY Calculation (Standard) ---")
dob = "1990-06-29"
target_date = "2025-01-01" # Target date in 2025
result = numerology.calculate_personal_periods(dob, target_date)
py = result["current"]["personal_year"]
print(f"DOB: {dob}, Target Year: 2025")
print(f"Calculated PY: {py}")
assert py == 8, f"Expected PY 8, got {py}"
print("PASS")

# Let's double check if there's any edge case where keeping 11 vs 2 matters.
# 11 + 1 = 12 -> 3.   2 + 1 = 3.
# 11 + 9 = 20 -> 2.   2 + 9 = 11 -> 2.
# It seems reducing early (2) vs late (11) yields same single digit result in mod 9 arithmetic.
# So the change is mostly semantic/logic cleanup.

print("\n--- Test Case 2: PM Calculation ---")
# If PY is 8.
# Jan: 8 + 1 = 9
# Sept: 8 + 9 = 17 -> 8
forecast = result["monthly_forecast"]
jan = next(m for m in forecast if m["month"] == "January")
sept = next(m for m in forecast if m["month"] == "September")

print(f"PY: {py} (Expected 8)")
print(f"Jan PM: {jan['personal_month']} (Expected 9)")
print(f"Sept PM: {sept['personal_month']} (Expected 8)")

assert jan['personal_month'] == 9, f"Jan PM mismatch"
assert sept['personal_month'] == 8, f"Sept PM mismatch"
print("PASS")

print("\n--- All Tests Passed ---")
