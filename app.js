const express = require("express");
const path = require("path");

const app = express();

require("dotenv").config();

const exercise1 = require("./exercise1");
const exercise2 = require("./exercise2");
const exercise3 = require("./exercise3");
const exercise4 = require("./exercise4");

app.use(express.json());

// ✅ Exercise 1
app.get("/api/exercise1", exercise1);

// ✅ Exercise 2
app.get("/api/exercise2", exercise2);

// ✅ Exercise 3
app.use("/api/exercise3", exercise3);

// ✅ Exercise 4
app.use("/api/exercise4", exercise4);

// ✅ IMPORTANT: Direct HTML access (REQUIRED)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Root
app.get("/", (req, res) => {
  res.send("All Exercises Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});