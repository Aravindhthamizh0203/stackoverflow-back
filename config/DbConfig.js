//IMPORTING MONGODB
const mongoose = require("mongoose");
//FOR CONNECTING MONGODATABASE
mongoose.connect(
    `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASS}@cluster0.nfyzaef.mongodb.net/${process.env.DATA_BASE_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => { //ERROR HANDLING
        if (err) {
            console.log("Error occured");
            console.log("Sorry we got error" + err);
        } else {//CONNECTED
            console.log("CONNECTED");
        }
    }
);
