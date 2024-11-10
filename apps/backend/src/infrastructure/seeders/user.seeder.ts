import { FirebaseConfig } from '../config/firebase.config';

export class UserSeeder {
  private readonly db: FirebaseFirestore.Firestore;
  private readonly COLLECTION = 'USERS';

  constructor() {
    this.db = FirebaseConfig.getInstance().getFirestore();
  }

  async seed(): Promise<void> {
    try {
      console.log('Seeding users...');

      const users = [
        {
          id: 'seed-user-1',
          email: 'user1@example.com',
          name: 'Test User 1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'seed-user-2',
          email: 'user2@example.com',
          name: 'Test User 2',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      const batch = this.db.batch();

      for (const userData of users) {
        const userRef = this.db.collection(this.COLLECTION).doc(userData.id);
        batch.set(userRef, userData);
      }

      await batch.commit();
      console.log('Users seeded successfully');
    } catch (error) {
      console.error('Error seeding users:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      console.log('Clearing seeded users...');
      
      const seedUsers = await this.db.collection(this.COLLECTION)
        .where('id', '>=', 'seed-')
        .get();

      const batch = this.db.batch();
      seedUsers.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      console.log('Seeded users cleared successfully');
    } catch (error) {
      console.error('Error clearing seeded users:', error);
      throw error;
    }
  }
} 