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
export interface UserData extends User {
    createdAt: string;
    updatedAt: string;
}
//# sourceMappingURL=index.d.ts.map