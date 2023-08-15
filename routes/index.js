const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

// console.log('router loaded');

router.get('/', homeController.home);

// use express router for users
router.use('/users', require('./users'));

router.use('/posts', require('./posts'));

// for ant further routes, access from here
// router.use('/routerName’, require(". /routerfilee));

module.exports = router;