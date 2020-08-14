import request from "request";
import chatBotServices from "../services/chatBotServices.js";


let postWebhook = (req,res) => {
    // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

          /// Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

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

let getWebhook = (req,res) => {
    // Your verify token. Should be a random string.
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    
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

// Handles messaging_postbacks events
let handlePostback = async (sender_psid, received_postback) => {
  let response;
  
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  switch(payload) {
    case 'GET_STARTED': 
      //Get username
      let username = await chatBotServices.getFacebookUserName(sender_psid);
      
      await chatBotServices.sendResponseWelcomeNewCustomer(username, sender_psid);
      //response = { "text": `Nice to me you ${username}. My name is Mr.NoName` }; 

      break;
    case 'yes': response = { "text": "For friends!" }; break;
    case 'no': response = { "text": "Oops, Sorry my bad!" }; break;
    default : console.log("Something wrong with payload switch case");
  }

  // Send the message to acknowledge the postback
  //callSendAPI(sender_psid, response);

};

// Sends response messages via the Send API
function callSendAPI (sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": {
      "text": response
    }
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v8.0/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res) => {
    if (!err) {
      console.log('message sent!');
      
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
  
}

function firstTrait(nlp, name) {
  return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

function handleMessage (sender_psid, message) {
  // handle messege for react, eg. like button
  if (message && message.attachments && message.attachments[0].payload) {
    callSendAPI(sender_psid, "Thank you for sending a pic");
    callSendAPIWithTemplate(sender_psid);
    return;
    
  }
  
  let entitiesArr = ["wit$greetings", "wit$thanks", "wit$bye"];
  let entityChosen = "";

  entitiesArr.forEach((name) => {
    let entity = firstTrait(message.nlp, name);
    if (entity && entity.confidence > 0.8) {
      entityChosen = name;
    }
  });

  if (entityChosen === "") {
    // default
    let response = 'I cannot understand. I am sorry';
    callSendAPI(sender_psid,response);

  } else {
    if (entityChosen === "wit$greetings") {
      // Send greetings messange
      let response = 'Hi there, I am your virtual friend. Nice to meet you';
      callSendAPI(sender_psid, response);
    } 
    else if (entityChosen === "wit$thanks") {
      let response = 'You are welcome!';
      callSendAPI(sender_psid, response);

    } 
    else if (entityChosen === "wit$bye") {
      let response = 'Bye bye. Take care. See ya';
      callSendAPI(sender_psid, response);

    }
   }

  
}

function callSendAPIWithTemplate (sender_psid) {
  let body = {
    "recipient": {
      "id": sender_psid
    },
    "message": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "High five for friends",
            "subtitle": "Tap below for answer.",
            "image_url": "https://image.freepik.com/free-vector/high-five-hand_52422-25.jpg",
            "buttons": [
              {
                "type": "postback",
                "title": "High Five!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "Nah no mood :(",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v6.0/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": body
  }, (err, res) => {
    if (!err) {
      console.log('message sent!');
      
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}




export default {
  postWebhook,
  getWebhook
};


