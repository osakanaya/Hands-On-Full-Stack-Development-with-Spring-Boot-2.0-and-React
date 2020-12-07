const express = require("express");
const cors = require("cors");
const history = require("connect-history-api-fallback");

const port = process.argv[2] || 3500;

const app = express();

app.use(history());
app.use("/", express.static("./build"));
app.use(cors());

app.listen(port, () => console.log(`Web service running on port ${port}`));
