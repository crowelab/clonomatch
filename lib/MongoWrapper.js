const MongoClient = require('mongodb').MongoClient;
const tunnel = require('tunnel-ssh');
const path = require('path');
let config = require(path.join(global.appRoot, process.env.CONF));

let server;
if('sshtunnel' in config) {
    if(process.env.NODE_ENV === "development"
        && 'development' in config.sshtunnel
        && Object.keys(config.sshtunnel.development).length > 0) {
            let tunnel_config = config.sshtunnel.development;
            tunnel_config.agent = process.env.SSH_AUTH_SOCK;

            server = tunnel(tunnel_config, function(err, server) {
                if(err) { console.error("SSH connection error: " + err); }
            });
    } else if(process.env.NODE_ENV === "production"
        && 'production' in config.sshtunnel
        && Object.keys(config.sshtunnel.production).length > 0) {
            let tunnel_config = config.sshtunnel.production;
            tunnel_config.agent = process.env.SSH_AUTH_SOCK;

            server = tunnel(tunnel_config, function(err, server) {
                if(err) { console.error("SSH connection error: " + err); }
            });
    }
}

const client = new MongoClient(config.database.mongo_url);
let db;

client.connect(function(err) {
    if(err) {
        console.log("Error connecting:", err);
    } else {
        console.log("Successfully connected!!!");
    }

    db = client.db(config.database.mongo_database);
});

const getRandomSequence = function(callback) {
    db.collection(config.database.mongo_collection).aggregate([{'$sample': {size: 1}}]).toArray().then((values) => {
        if(values[0].cdr3_aa == null || values[0].cdr3_aa === '') {
            getRandomSequence(callback);
        } else {
            callback(null,values);
        }
    }).catch((errors) => {
        callback(errors,null);
    });
};

module.exports = {
    getRandomSequence
};
