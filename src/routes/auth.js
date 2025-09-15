// POST /auth/login (issues the token)

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../db/client');
const { AUTH_QUERY } = require('../queries/auth');

/* POST /auth/login
- read { email, password } from req.body
-look up user by email in the user table
-bcrypt.compare(password, user.password_hash)
- when successful -> sign a JWT with { id: user.id } using process.env.JWT_SECRET
- return { token, user: { id, email, name } }
- if failed -> return 401 with a message
*/

const authRouter = express.Router();

//don't technically need bcrypt ... ?
authRouter.post('/login', async (req, res, next) => {
  try {
    //verify required fields
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    //look up user
    const result = await client.query(AUTH_QUERY, [email]);
    const user = result.rows[0];

    //return 401 if no user or no password hash
    if (!user || !user.password_hash) {
      return res.status(401).json({ message: 'invalid email or password.' });
    }
    //compar the password
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: 'invalid email or password.' });
    }
    // assign JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, is_admin: user.is_admin },
      process.env.JWT_SECRET,
    );

    // return given token
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username || null,
        is_admin: user.is_admin === true,
      },
    });
  } catch (err) {
    next(err);
  }
});
// const hashedPassword = await bcrypt.hash(password, 10); ((for register in the future))
module.exports = authRouter;
