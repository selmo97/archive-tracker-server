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
//insert cors right here:
app.use(express.json()); //without this, req.body would be undefined when sending JSON...

app.get('/health', async (req, res) => {
  //proof config and DB are correct and talking to each other
  try {
    await client.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Health check failed:', err); //if something breaks will be able to tell if the issue is connection or my route logic
    res.status(500).json({ status: 'error' });
  }
});

//mounting API routers
app.use('/auth', authRouter);
app.use('/bags', bagsRouter);
app.use('/brands', brandsRouter);

//404 handler & error handler

app.use((req, res, next) => {
  //catch requests that don't match a defined route
  res.status(404).send('route not found');
});

app.use((err, req, res, next) => {
  //catch errors thrown anywhere from try catches...right?
  res.status(500).json({ error: 'something broke' });
});

// --- init server ---
async function init() {
  try {
    await client.connect();
  } catch (err) {
    console.log('❌database connection');
    console.error(err);
  }
  app.listen(PORT, () => console.log(`server is listening on PORT ${PORT}📟`));
}

init();
