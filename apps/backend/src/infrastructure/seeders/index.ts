import { UserSeeder } from './user.seeder';

export class DatabaseSeeder {
  private seeders: any[];

  constructor() {
    this.seeders = [
      new UserSeeder(),
    ];
  }

  async seedAll(): Promise<void> {
    try {
      console.log('Starting database seeding...');
      
      for (const seeder of this.seeders) {
        await seeder.seed();
      }
      
      console.log('Database seeding completed successfully');
    } catch (error) {
      console.error('Error during database seeding:', error);
      throw error;
    }
  }

  async clearAll(): Promise<void> {
    try {
      console.log('Starting database clearing...');
      
      for (const seeder of this.seeders) {
        await seeder.clear();
      }
      
      console.log('Database clearing completed successfully');
    } catch (error) {
      console.error('Error during database clearing:', error);
      throw error;
    }
  }
} 