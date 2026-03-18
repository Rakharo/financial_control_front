interface iDailyExpense {
  day: number;
  total: number;
}

interface iTopCategories {
  category_id: number;
  category: string;
  total: number;
  color: string;
  user_id: number | null;
  transactions: iTopCategoriesTransactions[];
}

interface iBalance {
  balance: number;
  expense: number;
  income: number;
}

interface iTopCategoriesTransactions {
  id: number;
  title: string;
  value: number;
}

interface iInstallmentAnalytics {
  monthly_installments: number;
  future_installments: number;
  biggest_installment: number;
  remaining_installments: number;
}

export interface iDashboard {
  month: iBalance;
  year: iBalance;
  lifetime_balance: number;
  installments: iInstallmentAnalytics;
  daily_expenses: iDailyExpense[];
  top_categories: iTopCategories[];
}
