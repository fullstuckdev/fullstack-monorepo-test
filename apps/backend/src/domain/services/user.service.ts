import { FirebaseConfig } from '../../infrastructure/config/firebase.config';

interface UserData {
  id: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export class UserService {
  private firestore = FirebaseConfig.getInstance().getFirestore();
  private auth = FirebaseConfig.getInstance().getAuth();

  private structureUserData(data: any): UserData {
    return {
      id: data.id,
      email: data.email || null,
      displayName: data.displayName || null,
      photoURL: data.photoURL || null,
      role: data.role || 'user',
      isActive: typeof data.isActive === 'boolean' ? data.isActive : true,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt || new Date().toISOString()
    };
  }

  async fetchUserData(uid: string): Promise<UserData> {
    try {
      console.log('Attempting to fetch user data for uid:', uid);

      const authUser = await this.auth.getUser(uid);
      console.log('Auth user found:', authUser.uid);

      const defaultUserData = this.structureUserData({
        id: uid,
        email: authUser.email,
        displayName: authUser.displayName,
        photoURL: authUser.photoURL,
        role: 'user',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      try {
        const userDoc = await this.firestore
          .collection('users')
          .doc(uid)
          .get();

        if (!userDoc.exists) {
          await userDoc.ref.set(defaultUserData);
          return defaultUserData;
        }

        return this.structureUserData({
          id: userDoc.id,
          ...userDoc.data()
        });

      } catch (firestoreError) {
        console.error('Firestore operation failed:', firestoreError);
        return defaultUserData;
      }
    } catch (error) {
      console.error('Error in fetchUserData:', error);
      throw error;
    }
  }

  async updateUserData(uid: string, updateData: Partial<UserData>): Promise<UserData> {
    try {
      await this.auth.getUser(uid);

      const currentData = await this.fetchUserData(uid);

      const updatePayload = {
        displayName: updateData.displayName ?? currentData.displayName,
        photoURL: updateData.photoURL ?? currentData.photoURL,
        role: updateData.role ?? currentData.role,
        isActive: updateData.isActive ?? currentData.isActive,
        updatedAt: new Date().toISOString()
      };

      await this.firestore
        .collection('users')
        .doc(uid)
        .update(updatePayload);

      return this.structureUserData({
        ...currentData,
        ...updatePayload,
        id: uid,
        email: currentData.email,
        createdAt: currentData.createdAt
      });
    } catch (error) {
      console.error('Error in updateUserData:', error);
      throw error;
    }
  }

  async fetchAllUsers(): Promise<{ users: UserData[], total: number }> {
    try {
      const usersSnapshot = await this.firestore
        .collection('users')
        .get();

      const users = usersSnapshot.docs.map(doc => 
        this.structureUserData({
          id: doc.id,
          ...doc.data()
        })
      );

      return {
        users,
        total: users.length
      };
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }
} 