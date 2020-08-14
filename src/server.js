
import  express from "express";
import configViewEngine from "./config/viewEngine.js";
import initWebRoutes from "./routes/web.js";
import bodyParser from "body-parser";
import initCronJob from "./config/cronJob.js";

let app = express();

//use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view engine
configViewEngine(app);

// init all web routes
initWebRoutes(app);

//init cron job
initCronJob();

// Sets server port and logs message on success
app.listen(process.env.PORT || 8080, () =>{console.log("webhook is listening")});