export interface iCategoryRequest {
    name: string;
    type: string;
}

export interface iCategory {
    id: number;
    user_id: number | null;
    name: string;
    type: string;
    created_at?: string;
    updated_at?: string;
}

export interface iCategoryResponse {
    categories: iCategory[];
    page: number;
    total: number;
}