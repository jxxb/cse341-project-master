const express = require('express');
const router = express.Router();

const PR09Controller = require('../../controllers/pr09');

router.get('/', PR09Controller.getPR09);

module.exports = router;