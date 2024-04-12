const express = require('express');
const router = express.Router();

const { insertStates } = require('../controllers/state');
const { getAllStates } = require('../controllers/state');

router.post('/states', insertStates);
router.get('/states', getAllStates);

module.exports = router;
