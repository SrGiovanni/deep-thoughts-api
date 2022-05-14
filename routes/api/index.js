const router = require('express').Router();
const userRoutes = require('');
const thoughtRoutes = require('');

// add prefix to api routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;