import { MongoClient, Db } from 'mongodb';

let _db: Db | null = null;

export const initDb = async (): Promise<Db>  => {
    if (_db) {
        console.log('Db is already initialized!');
        return _db;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    _db = client.db();
    return _db;
};

export const getDb = (): Db => {
    if (!_db) {
        throw new Error('Database not initialized');
    }
    return _db;
};