const express = require('express');
const router = express.Router();

const PR08Controller = require('../../controllers/pr08');

router.get('/', PR08Controller.getPR08);

module.exports = router;