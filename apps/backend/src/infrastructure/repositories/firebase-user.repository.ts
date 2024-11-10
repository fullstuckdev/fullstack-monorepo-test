import { IUserRepository } from '../../application/interfaces/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { FirebaseConfig } from '../config/firebase.config';

export class FirebaseUserRepository implements IUserRepository {
  private firestore = FirebaseConfig.getInstance().getFirestore();
  private auth = FirebaseConfig.getInstance().getAuth();

  async findById(id: string): Promise<User | null> {
    const userDoc = await this.firestore.collection('users').doc(id).get();
    if (!userDoc.exists) return null;
    
    const userData = userDoc.data();
    return new User({
      id: userDoc.id,
      email: userData?.email ?? null,
      displayName: userData?.displayName ?? null,
      photoURL: userData?.photoURL ?? null,
      role: userData?.role ?? 'user',
      isActive: userData?.isActive ?? true,
      createdAt: userData?.createdAt ?? new Date().toISOString(),
      updatedAt: userData?.updatedAt ?? new Date().toISOString()
    });
  }

  async update(user: User): Promise<void> {
    const updateData = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: user.role,
      isActive: user.isActive,
      updatedAt: user.updatedAt
    };

    try {
      await this.firestore
        .collection('users')
        .doc(user.id)
        .update(updateData);
    } catch (error) {
      console.error('Error updating user in Firestore:', error);
      throw new Error('Failed to update user in database');
    }
  }

  async findAll(): Promise<User[]> {
    const usersSnapshot = await this.firestore.collection('users').get();
    return usersSnapshot.docs.map(doc => {
      const data = doc.data();
      return new User({
        id: doc.id,
        email: data.email ?? null,
        displayName: data.displayName ?? null,
        photoURL: data.photoURL ?? null,
        role: data.role ?? 'user',
        isActive: data.isActive ?? true,
        createdAt: data.createdAt ?? new Date().toISOString(),
        updatedAt: data.updatedAt ?? new Date().toISOString()
      });
    });
  }
} 