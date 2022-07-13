const express = require("express");
const bodyParser = require("body-parser");


const PORT = process.env.PORT || 5000;

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`);
});
