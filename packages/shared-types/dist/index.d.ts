export interface User {
    id: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    token?: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: {
        code: string;
        message: string;
    };
}
//# sourceMappingURL=index.d.ts.map