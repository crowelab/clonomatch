const express = require('express');
const router = express.Router();

const clonomatchApi = require('./api/clonomatch.js');
router.use('/clonomatch', clonomatchApi);

module.exports = router;
