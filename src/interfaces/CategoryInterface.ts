export interface iCategoryRequest {
    name: string;
    type: string;
}

export interface iCategoryResponse {
    id: number;
    user_id: number | null;
    name: string;
    type: string;
    created_at?: string;
    updated_at?: string;
}