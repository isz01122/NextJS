const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let collection;

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    //개발환경일 경우에만 콘솔 출력
    mongoose.set('debug', true);
  }

  const uri = process.env.MONGODB_URL;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  client.connect((err) => {
    collection = client.db('practice').collection('user');
    if (collection) console.log('몽고DB 연결 완료');
  });
};

const getCollection = () => {
  return collection;
};

module.exports = { connect, getCollection };
