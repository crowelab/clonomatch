const MongoClient = require('mongodb').MongoClient;
const tunnel = require('tunnel-ssh');
let config = require("../conf/clonomatch");

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

const matchV3j = function(v,j,cdr3) {
    let match = {'$match': {} };
    match['$match'][config.database.schema.v] = v;
    match['$match'][config.database.schema.j] = j;
    match['$match'][config.database.schema.cdr3] = cdr3;

    return match;
};

const groupByHip = function() {
    let group = {'$group': {
        '_id': {},
        'count': {'$sum': 1}
    }};
    group['$group']['_id']['donor'] = '$' + config.database.schema.donor;
    group['$group']['_id']['v'] = '$' + config.database.schema.v;
    group['$group']['_id']['d'] = '$' + config.database.schema.d;
    group['$group']['_id']['j'] = '$' + config.database.schema.j;
    group['$group']['_id']['cdr3'] = '$' + config.database.schema.cdr3;

    return group;
};

let createV3JAggregate = (v,j,cdr3,donor) => {
    return [
        matchV3j(v,j,cdr3,donor),
        groupByHip()
    ];
};

const getV3JMatches = function(v,j,cdr3,callback) {
    db.collection(config.database.mongo_collection).aggregate(createV3JAggregate(v,j,cdr3)).toArray().then((values) => {
        callback(null,values);
    }).catch((errors) => {
        callback(errors,null);
    });
};


module.exports = {
    getV3JMatches
};
