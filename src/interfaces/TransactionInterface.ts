import type { iCategoryResponse } from "./CategoryInterface";

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
    category: string;
}

export interface iTransactionResponse {
    id: number;
    user_id: number;
    title: string
    amount: number;
    frequency: string;
    type: string;
    category: iCategoryResponse;
    created_at: string;
    updated_at: string;
}
