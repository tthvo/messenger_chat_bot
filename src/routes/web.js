import express from "express";
import homepageController from "../controllers/homepageController.js";
import chatBotController from "../controllers/chatBotController.js";
import chatBotService from "../services/chatBotService.js";
import moment from "moment";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homepageController.getHomepage);
    router.get("/webhook", chatBotController.getWebhook);
    router.post("/webhook", chatBotController.postWebhook);
    router.get("/profile", homepageController.getFacebookUserProfile);

    //Set up endpoint for collecting personal info and set up get started button & persistent menus
    router.post("/set-up-profile", homepageController.setUpUserFacebookProfile); 
    
    router.get("/test",async (req, res) =>{
        let user = await chatBotService.getFacebookUsername(3350311028355090);
    });
    router.get("/abc", async (req, res) =>{
        try{

            let a = moment(Date.now()).zone("+07:00").format('MM/DD/YYYY HH:mm A');
            console.log(a)
            return res.send("ok")
        }catch (e) {
            console.log(e);
        }

    });
    return app.use("/", router);
};

export default initWebRoutes;