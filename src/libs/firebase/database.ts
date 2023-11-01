import axios from 'axios';
import { NoSQLDatabase } from '@/core/abstracts';

export class FirebaseDatabase implements NoSQLDatabase {
  async save(path: string, value: unknown): Promise<void> {
    const url = `${process.env.FIREBASE_DATABASE_URL}/${path}.json?auth=${process.env.FIREBASE_DATABASE_SECRET}`;
    await axios.put(url, value);
  }
}
