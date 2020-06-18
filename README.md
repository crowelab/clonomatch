# ClonoMatch

## About

ClonoMatch is an open source full-stack web service for an immunoglobulin Clonotype matching database.

## Setting Up

There are multiple steps for setting up ClonoMatch on your own system and it is recommended that the instructions for each step be read thoroughly before beginning. If you are familiar with the technologies involved these instructions will probably be straight forward, but there are a couple of steps that are custom to ClonoMatch and essential to getting the app working.

### Requirements
- node.js version 10.x with npm
- MongoDB
- Makeblastdb, blastp
- Python3

### 1. Download the Repository
This repository can be downloaded by selecting "Download ZIP" from the "Clone and Download" menu at the top right of this github page or by using git from command line:

```
git clone https://github.com/crowelab/clonomatch
```

### 2. Run npm install
The first step is to run npm install to install all of the packages required by ClonoMatch. A standard npm install will do:

```
cd clonomatch
npm install .
```

### 3. Set up MongoDB
ClonoMatch uses a MongoDB database for storing sequence data. The database calls used by ClonoMatch are simple aggregations with matching and group stages, so any version >= 3.0 should be fine.

#### 3a. Install MongoDB

Instructions for installing MongoDB on your machine can be found [in the official MongoDB documentation](https://docs.mongodb.com/manual/installation/)

ClonoMatch works with both remote and local MongoDB servers

#### 3b. Add data to MongoDB
The name of the database and collection in the MongoDB server in which you are storing your sequences does not matter, however, you must put the database and collection information in the ClonoMatch configuration file in order for ClonoMatch to function correctly.

Once you have your collection, you need to fill it. ClonoMatch is based on queries to the collection and expects certain information to be in the root of every document. The information needed is the donor, cdr3 amino acid string, & V, J, and D families ("family" in this case defined as the IMGT BLAST v/d/j call information BEFORE the '\*' character -- e.g. the V-Family of IGHV3-13\*01 would be IGHV3-13). The basic schema of each document in the collection looks like:

```
{
      "_id": ObjectID,
      "v": String,
      "j": String,
      "d": String,
      "cdr3": String,
      "donor": "donor"
      ...
}
```

An example document with this structure:
```
{ 
      "_id" : ObjectId("5ea367dbd9d5251f9079426e"), 
      "aa" : "KGSGYSFTSYWIGWVRQMPGKGLEWMGIIYPGDSDTRYSPSFQGQVTISADKSISTAYLQWSSLKASDTAMYYCARYYDFWSGYPHYYYGMDVWGQ",
      "sequence_alignment" : "AAGGGTTCTGGATACAGCTTTACCAGCTACTGGATCGGCTGGGTGCGCCAGATGCCCGGGAAAGGCCTGGAGTGGATGGGGATCATCTATCCTGGTGACTCTGATACCAGATACAGCCCGTCCTTCCAAGGCCAGGTCACCATCTCAGCCGACAAGTCCATCAGCACCGCCTACCTGCAGTGGAGCAGCCTGAAGGCCTCGGACACCGCCATGTATTACTGTGCGAGATATTACGATTTTTGGAGTGGTTACCCCCACTACTACTACGGTATGGACGTCTGGGGCCAA",
      "v" : "IGHV5-51",
      "j" : "IGHJ6",
      "d" : "IGHD3-3",
      "cdr3" : "ARYYDFWSGYPHYYYGMDV",
      "donor" : "hip1"
}
```

Note that additional data can be stored in the database to go along with the required schema values, but the schema values must still be top-level in every document.

You can rename these fields in your own database if you update the ClonoMatch Configuration file with information to find these values:
```
database: {
  ...
  "schema": {
      "v": "custom_v_value",
      "j": "custom_j_value",
      "d": "custom_d_value",
      "cdr3": "custom_cdr3_value",
      "donor": "custom_donor_value"
      ...
    }
}
```

#### 3c. Setup indicies
##### NOTE: This task can be very time consuming depending on the amount of data in the database. Don't be surprised if it takes 15 minutes or more for each index

In order for ClonoMatch to conduct its clonotype and CDR3 matching quickly, building indexes on the V3J clonotype and CDR3 is essential. The easiest way to do this is to log into your mongo database and run the [db.collection.createIndex()](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/) command from the shell -- it will look like nothing is happening when you run the command, but if you have access to your MongoDB server logs you can check the progress of creating the index. 

###### 3c.i. Log into MongoDB
Start by logging into mongo as you would normally:
```
mongo
```
OR if using a custom host/port/etc.
```
mongo --host hostname --port port_number ...
```

###### 3c.ii. Navigate to database
Once in Mongo, navigate to your database.
```
use database_name
```
If using the ClonoMatch configuration template this would be:
```
use sequences
```

###### 3c.iii. Run createIndex command
When you create an index you create it on a specific collection in a database, so be sure you are building the index on the right collection:
```
db.collection_name.createIndex(...)
```

The first index we need to build is the CDR3 index, the command for which is:
```
db.public.createIndex({'cdr3': 1})
```

For the second index, we will be building a [compound index](https://docs.mongodb.com/manual/core/index-compound/) of the v, j and cdr3 fields, so the ordering of the fields is important: v, then j, then cdr3. If using the ClonoMatch configuration template schema this call would be:
```
db.public.createIndex({'v': 1, 'j': 1, 'cdr3': 1})
```

If your document structure does not follow the default schema, replace the v, j, and cdr3 fields with what they correspond to in your database structure.

### 4. Set up configuration file
Once the preliminary work is done, you will need to setup the conf/clonomatch.json file to match your MongoDB and local file settings.

An example file is included which appears as follows:
```
{
  "app": {
    "clonotypes": {
      "dir": "lib/clonotypes", #Directory where clonotype files are stored
      "lines_per_file": 50000 #Number of lines per clonotype file
    },
    "data_dir": "generated_data", #Directory for CSV downloads
    "sibsearch": {
      "db_dir": "lib/sibsearch/dbs", #Directory for VJ folders with BLAST databases to be made
      "executable": "lib/sibsearch/sibsearch.py", #Location of the similar script
      "blastp": "lib/sibsearch/bin/blastp", #Location of the blastp executable used to perform similar search
      "makeblastdb": "lib/sibsearch/bin/makeblastdb" #Location of the makeblastdb executable used to create the BLAST databases
    },
    "url": {
      "development": "http://localhost:8888", #Location of the development backend server
      "production": "http://localhost:3000" #Location of the production server
    }
  },
  "database": {
    "mongo_url": "mongodb://127.0.0.1/", #Location of the MongoDB with the sequence data
    "mongo_collection": "public", #Collection name for the sequence data in Mongo
    "mongo_database": "sequences", #Database name for the sequence data in Mongo
    "schema": {
      "v": "v", #V Family name in the MongoDB schema
      "j": "j", #J Family name in the MongoDB schema
      "d": "d", #D Family name in the MongoDB schema
      "cdr3": "cdr3", #CDR3 Amino Acid name in the MongoDB schema
      "donor": "donor" #Donor name in the MongoDB schema
    }
  },
  "sshtunnel": { #OPTIONAL SETTINGS -- use only you if need to SSH tunnel to your MongoDB instance. These are settings for the ssh-tunnel library found under npm
    "development": {
      "username": "username", #Login username of server to which you are tunneling
      "host": "hostname.ip.address", #Hostname of server to which you are tunneling
      "port": 22, #Port of server to which you are tunneling
      "dstPort": 27017, #Port of MongoDB on server to which you are tunneling
      "password": "password", #Password of server to which you are tunneling
      "keepAlive": true #Leave open while ClonoMatch is running
    },
    "production": {}
  }
}
```

If you are running a local MongoDB instance, you likely won't have to change any settings. If using a non-Linux machine, you will want to supply a path to your own blastp and makeblastdb executables.

### 5. Run setup script
##### NOTE: This process can take a very VERY long time. Our database of over 800 million sequences took over 6 hours to run
Included with ClonoMatch is a script to build the clonotype files and BLAST databases automatically, based on the configuration in the conf/clonomatch.json file. The script is run with the command:

```
npm run setup
```

### 6. Running in Development and Production Environments

#### Development
The development script uses Python to boot both the node.js backend and React frontend in 2 separate processes. The script will run in the current terminal instance until terminated.

```
npm run local
```

#### Production
Building and deploying the production environment is done in two steps: the first is running the build script, which runs the react-scripts build script as well as building the sass stylesheets:
```
npm run build
```

After which, everything is in place to run the production environment.
```
npm run deploy
```

#### Other scripts
Rebuild stylesheets by running:

```
npm run sass
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) Using React Scripts v. 2.1.3.
