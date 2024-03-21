export function calculateIncreasedPercentage(expensesBefore: number, expensesAfter: number) {
     const diff = expensesAfter - expensesBefore;
     const percent = (diff / expensesBefore) * 100;
     return Math.round(percent * 100) / 100;
}
