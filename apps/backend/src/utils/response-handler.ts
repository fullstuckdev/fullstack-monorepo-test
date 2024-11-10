export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
  };
}

export class ResponseHandler {
  static success<T>(data?: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message
    };
  }

  static error(code: string, message: string): ApiResponse<never> {
    return {
      success: false,
      error: {
        code,
        message
      }
    };
  }
} 