// import React from 'react';

let baseURL;
switch(process.env.NODE_ENV) {
    case 'development':
        baseURL = 'http://localhost:8888/';
        break;
    case 'production':
    default:
        baseURL = 'https://clonomatch.accre.vanderbilt.edu/';
        break;
}

export default baseURL;