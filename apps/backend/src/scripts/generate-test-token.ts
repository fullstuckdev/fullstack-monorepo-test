import { FirebaseConfig } from '../infrastructure/config/firebase.config';

const TEST_EMAIL = 'test@example.com';

async function generateTestToken() {
  try {
    const auth = FirebaseConfig.getInstance().getAuth();
    
    let userRecord;

    try {
      userRecord = await auth.getUserByEmail(TEST_EMAIL);
      console.log('Using existing user');
    } catch (error) {
      console.log('Creating new user');
      userRecord = await auth.createUser({
        email: TEST_EMAIL,
        password: 'password123'
      });
    }

    const token = await auth.createCustomToken(userRecord.uid);
    
    console.log('\n=== Authentication Details ===');
    console.log('User ID:', userRecord.uid);
    console.log('Email:', userRecord.email);
    console.log('\nToken:', token);
    console.log('\nFor Swagger, use:', `Bearer ${token}`);
    console.log('\n===========================');
  } catch (error) {
    console.error('Error:', error);
  }
}

generateTestToken(); 