import type { iCategory } from "./CategoryInterface";

export interface iSummary {
  balance: number;
  total_income: number;
  total_expense: number;
}

export interface iTransactionRequest {
    title: string
    amount: number;
    frequency: string;
    type: string;
    category_id: number;
}

export interface iTransaction {
    id: number;
    user_id: number;
    title: string
    amount: number;
    frequency: string;
    type: string;
    category: iCategory;
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
