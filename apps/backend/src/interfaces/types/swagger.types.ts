export interface SwaggerResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
} 