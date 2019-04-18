import { MongoClient } from 'mongodb';

const MONGO_URL = 'mongodb://localhost:27017/test';

const mongoConnector = async () => {
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db('test');
  return { Links: db.collection('links') };
}

export default mongoConnector;
