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

You can set up your MongoDB server locally or on another machine.

#### 3b. 

### 4. Set up BLAST Databases and Clonotype Files
In addition to exact V3J clonotype matching, ClonoMatch has capabilities for doing a "sibling" or "similar" search. The basis of this search is finding sequences that have identical V & J germline family assignments, but differ in one-to-few amino acids in the CDR3 region.

To perform this type of search quickly, we prime the data by creating folders on the node server's file system that correspond to each VJ-combination family with a BLAST database containing every CDR3 amino acid sequence in that family.

### 5. Set up configuration files

## Running in Development and Production Environments

### Development

### Production



This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) Using React Scripts v. 2.1.3.
