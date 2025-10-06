const express = require('express');
const authRouter = require('./auth.route');
const adminRouter = require('./admin.route');
const clnRouter = require('./client.route');
const { getMyProfile, updateMyProfile } = require('../controller/common.controller');
const { verifyToken } = require('../middleware/verify.token');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/client', clnRouter);
router.get('/viewSelf', verifyToken ,getMyProfile)
router.get('/editSelf', verifyToken ,updateMyProfile)

module.exports = router;