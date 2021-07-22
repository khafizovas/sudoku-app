const express = require('express');
const router = express.Router({ mergeParams: true });

const gameController = require('../controllers/gamecontroller');

router.route('/api/new_game').get(gameController.newGame);
router.route('/api/check').post(gameController.check);
router.route('/api/hint').post(gameController.hint);

module.exports = router;
