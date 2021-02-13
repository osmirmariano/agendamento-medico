
require("dotenv").config();

const portHttp = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.use("/api/v1", require("./routes/index"));

app.listen(portHttp, () =>  console.log(`running on port ${portHttp} - http://localhost:${portHttp}/api/v1`));

module.exports = app;
