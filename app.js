
const serverless = require("serverless-http");
const app = require('./src/app/')

//o arquivo yml chama o serverless(app)
module.exports.handler = serverless(app);
