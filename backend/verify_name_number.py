import numerology

print("--- Test Case 1: Name Calculation ---")
# "Shivam" -> S(3)+H(5)+I(1)+V(6)+A(1)+M(4) = 20 -> 2
name1 = "Shivam"
res1 = numerology.calculate_name_number(name1)
print(f"Name: {name1}")
print(f"Total: {res1['total_sum']} (Expected 20)")
print(f"Single: {res1['single_digit']} (Expected 2)")
assert res1['total_sum'] == 20
assert res1['single_digit'] == 2
print("PASS")

# "Ahuja" -> A(1)+H(5)+U(6)+J(1)+A(1) = 14 -> 5
name2 = "Ahuja"
res2 = numerology.calculate_name_number(name2)
print(f"\nName: {name2}")
print(f"Total: {res2['total_sum']} (Expected 14)")
print(f"Single: {res2['single_digit']} (Expected 5)")
assert res2['total_sum'] == 14
assert res2['single_digit'] == 5
print("PASS")

# Full Name "Shivam Ahuja" -> 20 + 14 = 34 -> 7
name3 = "Shivam Ahuja"
res3 = numerology.calculate_name_number(name3)
print(f"\nName: {name3}")
print(f"Total: {res3['total_sum']} (Expected 34)")
print(f"Single: {res3['single_digit']} (Expected 7)")
assert res3['total_sum'] == 34
assert res3['single_digit'] == 7
print("PASS")

print("\n--- All Tests Passed ---")
