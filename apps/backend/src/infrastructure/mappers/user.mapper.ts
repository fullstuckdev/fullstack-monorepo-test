import { User } from '../../domain/entities/user.entity';
import { FirestoreUserData, FirestoreUserInput } from '../../interfaces/types/firestore.types';
import { firestore } from 'firebase-admin';

export class UserMapper {
  static toFirestore(user: User): FirestoreUserData {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: user.role,
      isActive: user.isActive,
      createdAt: firestore.Timestamp.fromDate(new Date(user.createdAt)),
      updatedAt: firestore.Timestamp.fromDate(new Date(user.updatedAt))
    };
  }

  static toFirestoreUpdate(user: User): FirestoreUserInput {
    return {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: user.role,
      isActive: user.isActive,
      createdAt: firestore.Timestamp.fromDate(new Date(user.createdAt)),
      updatedAt: firestore.Timestamp.fromDate(new Date(user.updatedAt))
    };
  }

  static toDomain(data: FirestoreUserData): User {
    return new User({
      id: data.id,
      email: data.email,
      displayName: data.displayName,
      photoURL: data.photoURL,
      role: data.role,
      isActive: data.isActive,
      createdAt: data.createdAt.toDate().toISOString(),
      updatedAt: data.updatedAt.toDate().toISOString()
    });
  }
} 