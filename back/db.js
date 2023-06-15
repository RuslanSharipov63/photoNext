const { MongoClient } = require("mongodb");

const URL = 'mongodb://localhost:27017/photo';

let dbConnection;
module.exports = {
    connectionToDb: (cb) => {
        MongoClient
        .connect(URL)
        .then((client) => {
            console.log('Connect to MongoDB')
        })
    },
    getDb: () => dbConnection,
}
