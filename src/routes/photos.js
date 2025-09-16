const express = require('express');
const client = require('../db/client');
const requireUser = require('../middleware/auth');

photosRouter.get('/', requireUser, async, (req, res, next) => {

});

photosRouter.get('/:id', requireUser, async, (req, res, next) => {

});



module.exports = photosRouter;