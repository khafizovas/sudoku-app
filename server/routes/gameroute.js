const express = require('express');
const router = express.Router({ mergeParams: true });

const gameController = require('../controllers/gamecontroller');

router.route('/api/new_session').get(gameController.newSession);
router.route('/api/close_session').post(gameController.closeSession);
router.route('/api/new_game').post(gameController.newGame);
router.route('/api/check').post(gameController.check);
router.route('/api/hint').post(gameController.hint);

module.exports = router;
