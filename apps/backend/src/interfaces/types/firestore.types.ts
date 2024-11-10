import { firestore } from 'firebase-admin';

export interface FirestoreUserData {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: string;
  isActive: boolean;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}

export interface FirestoreUserInput {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: string;
  isActive: boolean;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}