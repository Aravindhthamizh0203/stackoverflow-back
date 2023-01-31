//IMPORTING EXPRESS
const express = require("express");
//IMPORTING BODY-PARSER
const bodyparser = require("body-parser");
//PORT NUMBER
const port = 8000;
//SERVER TO APP
const server = express();
//USING APP
const app = require("./App");
server.use("/", app);
//IMPORTING DOTENV
const dotenv = require("dotenv");
//USING DOTENV FOR DATA SAFTY
dotenv.config();
//DATA BASE CONFIG
require("./config/DbConfig");


//SERVER CALL
server.listen(port);

