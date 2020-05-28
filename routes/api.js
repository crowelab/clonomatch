const express = require('express');
const router = express.Router();

// const pyirApi = require('./api/pyir.js');
// const authApi = require('./api/auth.js');
const clonomatchApi = require('./api/clonomatch.js');
// const googleApi = require('./api/google');

// router.use('/pyir', pyirApi);
// router.use('/auth', authApi);
router.use('/clonomatch', clonomatchApi);

module.exports = router;
