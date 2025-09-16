//CRUD for bags (the reads are public, but writes will be protected)

const express = require('express');
const client = require('../db/client');
const requireUser = require('../middleware/auth');
const { BAG_LIST_QUERY, BAG_DETAILS_QUERY, PHOTOS_BY_BAG_QUERY, } = require('../queries/bags');
const bagsRouter = express.Router();

bagsRouter.get('/', requireUser, async (req, res, next) => {
  try {
    const result = await client.query(BAG_LIST_QUERY);
    const bagList = result.rows; //get rows from result
    res.json(bagList);
  } catch (err) {
    next(err);
  }
});

// --- /bags/:id query that returns bag by id
bagsRouter.get('/:id', requireUser, async (req, res, next) => {
  try {
    const result = await client.query(BAG_DETAILS_QUERY, [req.params.id]);
    const bagDetail = result.rows[0]; //get single bag detail row from result
    res.json(bagDetail); //send back as json
  } catch (err) {
    next(err);
  }
});

module.exports = bagsRouter;

/*
📝 TODO:
[] organize better
*/
