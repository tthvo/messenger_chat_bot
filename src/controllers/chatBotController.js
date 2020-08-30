import request from "request";
//import moment from "moment";
import chatBotService from "../services/chatBotService.js";

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let user = {
    name: "",
};

let postWebhook = (req, res) => {
    // Parse the request body from the POST
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {

            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);


            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }

        });

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
};

let getWebhook = (req, res) => {
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = MY_VERIFY_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
};

// Handles messages events
let handleMessage = async (sender_psid, message) => {
    //checking quick reply
    if (message && message.quick_reply && message.quick_reply.payload) {
        if (message.quick_reply.payload === "YEAH_FINE") { //Send activity menu
            await chatBotService.sendActivityMenu(sender_psid);
        } else if (message.quick_reply.payload === "SORRY_NO") { // Send bye
            await chatBotService.sendBye(sender_psid);
        } else if (message.quick_reply.payload === "DONE") { // Happy or not
            let response = {"text": "I am happy that you are!"};
            await chatBotService.sendMessage(sender_psid,response);
        } else if (message.quick_reply.payload === "NOT_YET") { // Want to dump more
            chatBotService.redo(sender_psid);
        } else if (message.quick_reply.payload === "START" || message.quick_reply.payload === "WAIT") { // Start putting trash or put more trash
            await chatBotService.sendStart(sender_psid);
        } else if (message.quick_reply.payload === "STOP") { //Done with dumping
            await chatBotService.sendMessageAskingYesOrNo(sender_psid);
        }else if (message.quick_reply.payload === "DUMP") { // Dump the trash
            await chatBotService.dumpTheTrash(sender_psid, Math.floor(Math.random() * 3)); 
        }
        return;
    }
    
    //Debugging
    console.log(message);


    //handle text message
    let entity = handleMessageWithEntities(message);
    if (entity.name === "wit$greetings"){
        let response;
        var ask = false; // Check if the greeting is just a 'how are you'
        if (message.text.toLowerCase().includes('how are you')) {
            response = {"text": "I am great. Thank you for asking."}
            ask = true;
        }
        else {
            response = { "text": `Hello there` };       
        }
        await chatBotService.sendMessage(sender_psid, response);
        if (!ask) await chatBotService.askingStartOrStop(sender_psid);
    } else if (entity.name === "wit$thanks") {
        await chatBotService.handlePositive(sender_psid, message.text);
    } else if (entity.name === "wit$bye") {
        let response = { "text": `Bye bye. See you later :D`};
        callSendAPI(sender_psid, response );
    } else {
        await chatBotService.listenToStory(sender_psid, message);  
    }
};



let handleMessageWithEntities = (message) => {
    let entitiesArr = ["wit$greetings", "wit$thanks", "wit$bye"];
    
    let entityChosen = "";
    let data = {}; // data is an object saving value and name of the entity.
    entitiesArr.forEach((name) => {
        let entity = firstEntity(message.nlp, name);
        //console.log(entity);
        if (entity && entity.confidence > 0.8) {
            entityChosen = name;
            data.value = entity.value;
        }
        
    });

    //console.log("Debugging: " + entityChosen);
    
    data.name = entityChosen;
    return data;
};

function firstEntity(nlp, name) {
    return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
};

// Handles messaging_postbacks events
let handlePostback = async (sender_psid, received_postback) => {
    let response;
    // Get the payload for the postback
    let payload = received_postback.payload;
    // Set the response based on the postback payload

    switch (payload) {
        case "GET_STARTED":
            //get facebook username
            await chatBotService.reset();
            let username = await chatBotService.getFacebookUsername(sender_psid);
            user.name = username;
            //send welcome response to users
            await chatBotService.sendResponseWelcomeNewCustomer(username, sender_psid);
            break;
        case "MEME":
            await chatBotService.sendMemeMenu(sender_psid);
            break;
        case "MUSIC":
            await chatBotService.sendMusic(sender_psid);
            break;
        case "BRIAN_MEME":
            await chatBotService.sendBrianMeme(sender_psid);
            break;
        case "TRUMP_MEME":
            await chatBotService.sendTrumpMeme(sender_psid);
            break;
        default:
            console.log("Something wrong with switch case payload");
    }
};

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v8.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}




export default {
  postWebhook,
  getWebhook
};


