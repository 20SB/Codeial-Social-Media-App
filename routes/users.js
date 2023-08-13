const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
router.get('/profile', usersController.profile);
router.get('/posts', usersController.posts);
router.get('/timeline', usersController.timeline);
module.exports = router;