const express = require('express');
const client = require('../db/client');
 const brandsRouter = express.Router();
 module.exports = brandsRouter;

 brandsRouter.get("/", async (req,res,next) => {
    try {
        const result = await client.query( 
            "SELECT id, name FROM brands;"
        );
        const brands = result.rows; //get rows from result
        res.json(brands); //send back json, array of brands objects

    } catch (err) {
        next(err);
    }
 })

