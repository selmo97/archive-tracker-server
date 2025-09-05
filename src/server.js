// --- entry point ---
const express = require("express");

// --- entry point ---
const app = express();
const PORT = 3000;

// --- middleware ---
app.use(express.json());

app.get("/", async (req, res, next) => {
  try {
    res.send("hello world");
  } catch (err) {
    next(err);
  }
});

// --- 404 handler ---

app.use((req, res, next) => {
  //catch requests that don't match a defined route
  res.status(404).send("route not found");
});

// --- error handler ---

app.use((err, req, res, next) => {
  //catch errors thrown anywhere from try catches...right?
  res.status(500).json({ error: "something broke" });
});

// --- init server ---
const init = () => {
  app.listen(PORT, () => console.log("server is listening on PORT 3000 ✨📟"));
};

init();

/*
📝 TODO:
[] replace hardcoded PORT with process.env.PORT
[] cors() for middleware when you need to hook frontend to backend.

💡 NOTES:
- cors() -> add when frontend is ready
- express.json() -> parses body
- init() -> starts server at port

❓ QUESTIONS: 
- cors() for middleware when you need to hook frontend to backend.
*/
