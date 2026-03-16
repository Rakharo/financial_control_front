interface iDailyExpense {
  day: number;
  total: number;
}

interface iTopCategories {
  category: string;
  total: number;
  color: string;
  user_id: number | null;
}

interface iBalance {
  balance: number;
  expense: number;
  income: number;
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
