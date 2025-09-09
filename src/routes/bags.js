const express = require("express");
const client = require("../db/client");
const bagsRouter = express.Router();
module.exports = bagsRouter;

//--- bags list query that returns all bags and details ---

const BAG_LIST_QUERY = `
  SELECT 
         b.id, b.style_name, b.color, b.style_code,
         b.retail_price, b.purchase_price, b.notes,
         br.id AS brand_id, br.name AS brand_name,
         p.id AS photo_id, p.url AS photo_url
  FROM bags b
  JOIN brands br ON b.brand_id = br.id
  LEFT JOIN photos p ON b.id = p.bag_id AND p.is_primary = true;
`
// --- select bag by id and return details
const BAG_DETAILS_QUERY = `
 SELECT b.id, b.style_name, b.color, b.style_code,
 b.retail_price, b.purchase_price, b.notes,
 br.id AS brand_id, br.name 
 AS brand_name
 FROM bags b
 JOIN brands br ON b.brand_id = br.id
 WHERE b.id = $1;
 
 `

 //--- photos by bag query 

 const PHOTOS_BY_BAG_QUERY = `
 SELECT id, url, is_primary, added_at
 FROM photos
 WHERE bag_id = $1
 ORDER BY is_primary DESC, added_at DESC;
 `

bagsRouter.get("/", async (req, res, next) => {
  try {
    const result = await client.query(
      //running query with client
      BAG_LIST_QUERY
    );
    const bagList = result.rows; //get rows from result
    res.json(bagList); //send back as json
  } catch (err) {
    next(err);
  }
});

// --- /bags/:id query that returns bag by id

bagsRouter.get("/:id", async (req, res, next) => {
  try {
    const result = await client.query(
      //running query with client
      BAG_DETAILS_QUERY,
      [req.params.id]
    );
    const bagDetail = result.rows[0]; //get single bag detail row from result
    res.json(bagDetail); //send back as json
  } catch (err) {
    next(err);
  }
});
