export interface iCategoryRequest {
    name: string;
    type: string;
    color: string
}

export interface iCategory {
    id: number;
    user_id: number | null;
    name: string;
    type: string;
    created_at?: string;
    updated_at?: string;
    color: string;
}

export interface iCategoryResponse {
    categories: iCategory[];
    page: number;
    total: number;
}