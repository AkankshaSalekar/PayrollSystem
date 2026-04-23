def calculate_salary(emp, attendance_list):

    present_days = sum(1 for a in attendance_list if a.status == "Present")

    if emp.salaryType == "Monthly":
        salary = (emp.salaryAmount / 30) * present_days
    else:
        salary = emp.salaryAmount * present_days

    return {
        "baseSalary": emp.salaryAmount,
        "presentDays": present_days,
        "calculatedSalary": int(salary)
    }