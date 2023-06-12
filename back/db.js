const { MongoClient } = require("mongodb");

const URL = 'mongodb://localhost:27017/photo';

let dbConnection;
module.exports = {
    connectionToDb: (cb) => {},
    getDb: () => dbConnection,
}
