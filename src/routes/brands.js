const express = require('express');
const client = require('../db/client');
 const brandsRouter = express.Router();
 module.exports = brandsRouter;

 brandsRouter.get("/", async (req,res,next) => {
    try {
        const result = await client.query( //running query with client
            "SELECT id, name FROM brands;"
        );
        const brands = result.rows; //get rows from result
        res.json(brands); //send back as json

    } catch (err) {
        next(err);
    }
 })

