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
##### NOTE: This task can be very time consuming depending on the amount of data in the database. Don't be surprised if it takes 30 minutes or more

In order for ClonoMatch to conduct its clonotype matching quickly, building an index on the V3J clonotype is essential. The easiest way to do this is to log into your mongo database and run the [db.collection.createIndex()](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/) command from the shell -- it will look like nothing is happening when you run the command, but if you have access to your MongoDB server logs you can check the progress of creating the index. 

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

Specifically, we will be building a [compound index](https://docs.mongodb.com/manual/core/index-compound/) of the v, j and cdr3 fields, so the ordering of the fields is important: v, then j, then cdr3. If using the ClonoMatch configuration template schema this call would be:
```
db.public.createIndex({'v': 1, 'j': 1, 'cdr3': 1})
```

If your document structure does not follow the default schema, replace the v, j, and cdr3 fields with what they correspond to in your database structure.

### 4. Set up BLAST Databases and Clonotype Files
In addition to exact V3J clonotype matching, ClonoMatch has capabilities for doing a "sibling" or "similar" search. The basis of this search is finding sequences that have identical V & J germline family assignments, but differ in one-to-few amino acids in the CDR3 region.

To perform this type of search quickly, we prime the data by creating folders on the node server's file system that correspond to each VJ-combination family with a BLAST database containing every CDR3 amino acid sequence in that family.

### 5. Set up configuration files

## Running in Development and Production Environments

### Development

### Production



This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) Using React Scripts v. 2.1.3.
