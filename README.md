# ClonoMatch

## About

ClonoMatch is an open source full-stack web service for an immunoglobulin Clonotype matching database.

## Setting Up

There are multiple steps for setting up ClonoMatch on your own system and it is recommended that the instructions for each step be read thoroughly before beginning.

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

ClonoMatch is based on queries to the Mongo database and expects certain information to be in the root of every document. The information needed is the donor, cdr3 amino acid string, & V, J, and D families ("family" in this case defined as the IMGT BLAST v/d/j call information BEFORE the '*' character -- e.g. the V-Family of IGHV3-13*01 would be IGHV3-13). The basic schema of this information looks like:

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
    },
}
```

#### 3c. Setup indicies


### 4. Set up BLAST Databases and Clonotype Files
In addition to exact V3J clonotype matching, ClonoMatch has capabilities for doing a "sibling" or "similar" search. The basis of this search is finding sequences that have identical V & J germline family assignments, but differ in one-to-few amino acids in the CDR3 region.

To perform this type of search quickly, we prime the data by creating folders on the node server's file system that correspond to each VJ-combination family with a BLAST database containing every CDR3 amino acid sequence in that family.

### 5. Set up configuration files

## Running in Development and Production Environments

### Development

### Production



This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) Using React Scripts v. 2.1.3.
