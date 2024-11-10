export interface UserDTO {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
} 