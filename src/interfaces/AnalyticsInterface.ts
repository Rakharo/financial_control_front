interface iDailyExpense {
  day: number;
  total: number;
}

interface iTopCategories {
  category: string;
  total: number;
}

export interface iDashboard {
  balance: number;
  expenses: number;
  income: number;
  daily_expenses: iDailyExpense[];
  top_categories: iTopCategories[];
}
