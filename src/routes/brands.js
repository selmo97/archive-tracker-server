const express = require('express');
const client = require('../db/client');
const requireUser = require('../middleware/auth');
const brandsRouter = express.Router();


brandsRouter.get('/', requireUser, async (req, res, next) => {
  try {
    const result = await client.query('SELECT id, name FROM brands;');
    const brands = result.rows; //get rows from result
    res.json(brands); //send back json, array of brands objects
  } catch (err) {
    next(err);
  }
});

module.exports = brandsRouter;

