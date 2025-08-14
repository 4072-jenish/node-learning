
const express = require('express');
const { deshboard } = require('../controller');
const userRouter = require('./user.route');

const router = express.Router();

router.get('/' , deshboard);
router.use('/users' , userRouter);

module.exports = router;


