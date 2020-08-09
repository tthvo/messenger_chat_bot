require("dotenv").config();
import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";
import bodyParser from "body-parser";

let app = express();

// Configure view engine
viewEngine(app);
//User body parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Init all web routes
initWebRoute(app);

// Sets server port and logs message on success
app.listen(process.env.PORT || 8080, () =>{console.log("webhook is listening")});