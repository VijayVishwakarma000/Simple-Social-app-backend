const { MongoClient } = require("mongodb");

const url = process.env.DB;
const dbName = "socialapp";

let client;
let db;
let connectingPromise = null;  

async function connectDB() {
  if (db) return db;

  if (!connectingPromise) {
    connectingPromise = (async () => {
      client = new MongoClient(url);
      await client.connect();
      db = client.db(dbName);
      console.log(" MongoDB connected");
      return db;
    })();
  }

  return connectingPromise;
}

async function getDB() {
  if (db) return db;

  return await connectDB();
}

module.exports = { connectDB, getDB };