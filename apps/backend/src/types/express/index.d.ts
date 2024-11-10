import { DecodedIdToken } from 'firebase-admin/auth';

declare global {
  namespace Express {
    // Extend Express Request interface
    interface Request {
      user: DecodedIdToken;
    }
  }
}

// This is important to make this a module
export {}; 