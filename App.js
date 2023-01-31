//IMPORTING EXPRESS
const express = require("express");
//USING EXPRESS IN APP
const app = express();
//IMPORTING BODY-PARSER
const bodyParser = require("body-parser");
//IMPORTING CORS
const cors = require("cors");
//USING BODY-PARSER IN APP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//USING CORS IN APP
app.use(cors());
//IMPORTING CONTROLLERS

const SignUpController = require("./controllers/Auth/SignUp.Controllers");
const LoginController = require("./controllers/Auth/Login.Controller");
const QuestionController = require("./controllers/public/Question.Controllers");
const TagController = require("./controllers/public/Tags.Controllers");
const CompanyController = require("./controllers/public/Company.Controllers")
const UserController = require("./controllers/public/User.Controllers")



//APP USING IN ROUTES 


app.use("/signup", SignUpController);
app.use("/login", LoginController);
app.use("/question", QuestionController);
app.use('/tags', TagController);
app.use('/Company', CompanyController);
app.use('/userinfo', UserController);







//EXPORTING APP
module.exports = app;
