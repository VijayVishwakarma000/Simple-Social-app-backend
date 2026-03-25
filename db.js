const { MongoClient } = require('mongodb');

const url = process.env.DB;
const dbName = 'socialapp';

let db;
let client
async function connectDB() {
    if(db) return db
    try {
          client = new MongoClient(url);
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

function getDB() {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return db;
}

module.exports = { connectDB, getDB };