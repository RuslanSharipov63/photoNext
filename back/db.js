const { MongoClient } = require("mongodb");

const URL = 'mongodb://localhost:27017/photobox';

let dbConnection;
module.exports = {
    connectionToDb: (cb) => {
        MongoClient
            .connect(URL)
            .then((client) => {
                console.log('Connect to MongoDB')
                dbConnection = client.db();
                return cb();
            })
            .catch((error) => {
                return cb(error)
            })
    },
    getDb: () => dbConnection,
}
