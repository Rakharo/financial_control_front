export interface iCategoryRequest {
    name: string;
    type: string;
}

export interface iCategoryResponse {
    ID: number;
    UserID: number | null;
    Name: string;
    Type: string;
    Created_at?: string;
    Updated_at?: string;
}