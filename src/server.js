// --- entry point ---
const express = require('express');
const client = require('./db/client');
const authRouter = require('./routes/auth');
const brandsRouter = require('./routes/brands');
const bagsRouter = require('./routes/bags');

const app = express();
const PORT = process.env.PORT || 3000;


// --- middleware ---
// takes incoming request bodies that are in JSON format (postman or React) and turn them into JS objects on req.body...
app.use(express.json()); //without this, req.body would be undefined when sending JSON...

app.get("/health", async (req, res) => { //proof config and DB are correct and talking to each other
  try {
    await client.query('SELECT 1');
    res.json({ status: "ok" })
  } catch (err) {
    console.error('Health check failed:', err); //if something breaks will be able to tell if the issue is connection or my route logic
    res.status(500).json({ status: "error" })
  }
});

//mounting API routers
app.use('/auth', authRouter);
app.use('/bags', bagsRouter);
app.use('/brands', brandsRouter);

//404 handler & error handler

app.use((req, res, next) => {
  //catch requests that don't match a defined route
  res.status(404).send("route not found");
});

app.use((err, req, res, next) => {
  //catch errors thrown anywhere from try catches...right?
  res.status(500).json({ error: "something broke" });
});

// --- init server ---
async function init() {
  try {
     await client.connect();
  } catch(err) {
    console.log('❌database connection');
    console.error(err);
  }
  app.listen(PORT, () => console.log(`server is listening on PORT ${PORT}📟`));
};

init();

/*
📝 TODO:
[] finish login
    - check password w/ bcrypt
    - return token
[] add POST /bags (protected, only logged in user can add)
[] add UPDATE + DELETE for bags (protected)
[] use requireUser (middleware) on all write routes
[] better/consistent error message maybe
[]
[] add list of endpoints and dommands to README when done!
[] cors() for middleware when you need to hook frontend to backend.


💡 NOTES:
- cors() = add when frontend is ready
- express.json() = parses body
- init() = starts server at port

** no seed file or seed script b/c the app is meant to grow w?/ your own bag data.

❓ QUESTIONS: 
- cors() for middleware when you need to hook frontend to backend.
- still confused on the difference between res.json() is not the same as express.json()

*/

