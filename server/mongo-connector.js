import { Logger, MongoClient } from 'mongodb';

// 1
const MONGO_URL = 'mongodb://localhost:27017';

// 2
module.exports = async () => {
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db('test');

  let logCount = 0;
  Logger.setCurrentLogger((msg, state) => {
    console.log(`MONGO DB REQUEST ${++logCount}: ${msg}`);
  });
  Logger.setLevel('debug');
  Logger.filter('class', ['Cursor']);

  return {
    Links: db.collection('links'),
    Users: db.collection('users'),
    Votes: db.collection('votes')
  };
};
