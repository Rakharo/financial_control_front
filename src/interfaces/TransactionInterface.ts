import type { iCategory } from "./CategoryInterface";
export interface iTransactionRequest {
  title: string;
  amount: number;
  frequency: string;
  type: string;
  category_id: number;
  installment_total?: number;
  transaction_date: string;
}

export interface iTransaction {
  id: number;
  user_id: number;
  title: string;
  amount: number;
  frequency: string;
  type: string;
  category: iCategory;
  installment_plan_id?: number | null;
  installment_total?: number;
  installment_number?: number;
  installment_value?: number;
  transaction_date: string;
  created_at: string;
  updated_at: string;
}

export interface iTransactionResponse {
  transactions: iTransaction[];
  page: number;
  total: number;
  month: number;
  year: number;
}


export interface iSummary {
  balance: number;
  total_income: number;
  total_expense: number;
}

export interface iInstallment {
  id: number;
  description: string;
  total_amount: number;
  installment_total: number;
  installment_number: number;
  installment_value: number;
  start_date: string;
  created_at: string;
  updated_at: string | null;
}
