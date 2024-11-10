import { faker } from '@faker-js/faker';
import { FirebaseConfig } from '../infrastructure/config/firebase.config';

async function seedUsers(count: number = 10) {
  try {
    const firestore = FirebaseConfig.getInstance().getFirestore();
    const auth = FirebaseConfig.getInstance().getAuth();

    console.log(`Starting to seed ${count} users...`);

    for (let i = 0; i < count; i++) {
      const email = faker.internet.email();
      const displayName = faker.person.fullName();
      const photoURL = faker.image.avatar();
      
      const userRecord = await auth.createUser({
        email,
        password: 'Test123!@#',
        displayName,
        emailVerified: true
      });

      await firestore.collection('users').doc(userRecord.uid).set({
        id: userRecord.uid,
        email: email,
        displayName: displayName,
        photoURL: photoURL,
        role: 'user',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      console.log(`Created user ${i + 1}/${count}: ${email}`);
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function main() {
  try {
    const firestore = FirebaseConfig.getInstance().getFirestore();
    const usersSnapshot = await firestore.collection('users').get();
    const currentUserCount = usersSnapshot.size;

    console.log(`Current user count: ${currentUserCount}`);

    if (currentUserCount < 10) {
      const usersToCreate = 10 - currentUserCount;
      console.log(`Creating ${usersToCreate} more users...`);
      await seedUsers(usersToCreate);
    } else {
      console.log('Database already has 10 or more users. No seeding needed.');
    }
  } catch (error) {
    console.error('Error in main:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}

export { main }; 