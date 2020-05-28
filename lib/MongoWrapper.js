const MongoClient = require('mongodb').MongoClient;
const tunnel = require('tunnel-ssh');
let config = require("../conf/clonomatch");
let tunnel_config = require('../conf/sshtunnel');
tunnel_config.agent = process.env.SSH_AUTH_SOCK;

const MONGO_URL = config.mongo_url;

let server;
if(process.env.NODE_ENV === "development") {
    server = tunnel(tunnel_config, function(err, server) {
        if(err) { console.error("SSH connection error: " + err); }
    });
}

const client = new MongoClient(MONGO_URL);
let db;

client.connect(function(err) {
    if(err) {
        console.log("Error connecting:", err);
    } else {
        console.log("Successfully connected!!!");
    }

    db = client.db('sequences');
});

const matchV3j = function(v,j,cdr3) {
    return {
        '$match': {
            'v': v,
            'j': j,
            'cdr3': cdr3
        }
    }
};

const groupByHip = function() {
    return {
        '$group': {
            '_id': {
                'hip': '$hip',
                'v': '$v',
                'd': '$d',
                'j': '$j',
                'cdr3': '$cdr3'
            },
            'count': {'$sum': 1}
        }
    }
};

let createV3JAggregate = (v,j,cdr3,donor) => {
    return [
        matchV3j(v,j,cdr3,donor),
        groupByHip()
    ];
};

const getV3JMatches = function(v,j,cdr3,callback) {
    db.collection('hip').aggregate(createV3JAggregate(v,j,cdr3)).toArray().then((values) => {
        callback(null,values);
    }).catch((errors) => {
        callback(errors,null);
    });
};


module.exports = {
    getV3JMatches
};
