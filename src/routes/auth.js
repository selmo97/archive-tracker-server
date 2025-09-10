// POST /auth/login (issues the token)
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const client = require('../db/client');

/* POST /auth/login
- read { email, password } from req.body
-look up user by email in the user table
-bcrypt.compare(password, user.password_hash)
- when successful -> sign a JWT with { id: user.id } using process.env.JWT_SECRET
- return { token, user: { id, email, name } }
- if failed -> return 401 with a message
*/

const authRouter = express.Router();
const AUTH_QUERY = `SELECT * from users 
WHERE email = $1`

authRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //console.log("login attempt:", email, password);
        // const hashedPassword = await bcrypt.hash(password, 10); ((for register in the future))
        const result = await client.query(AUTH_QUERY, [email]);
        const admin = result.rows[0]
        res.json(admin);
        //console.log('DB result:', result.rows);
    } catch (err) {
            next(err);
        }
})

module.exports = authRouter;



