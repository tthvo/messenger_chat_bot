"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _request = _interopRequireDefault(require("request"));

var _chatBotService = _interopRequireDefault(require("../services/chatBotService.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import moment from "moment";
var MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
var PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
var user = {
  name: ""
};

var postWebhook = function postWebhook(req, res) {
  // Parse the request body from the POST
  var body = req.body; // Check the webhook event is from a Page subscription

  if (body.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      var webhook_event = entry.messaging[0];
      console.log(webhook_event); // Get the sender PSID

      var sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid); // Check if the event is a message or postback and
      // pass the event to the appropriate handler function

      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    }); // Return a '200 OK' response to all events

    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

var getWebhook = function getWebhook(req, res) {
  // Your verify token. Should be a random string.
  var VERIFY_TOKEN = MY_VERIFY_TOKEN; // Parse the query params

  var mode = req.query['hub.mode'];
  var token = req.query['hub.verify_token'];
  var challenge = req.query['hub.challenge']; // Checks if a token and mode is in the query string of the request

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
}; // Handles messages events


var handleMessage = function handleMessage(sender_psid, message) {
  var response, entity, _response, ask, _response2;

  return regeneratorRuntime.async(function handleMessage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(message && message.quick_reply && message.quick_reply.payload)) {
            _context.next = 35;
            break;
          }

          if (!(message.quick_reply.payload === "YEAH_FINE")) {
            _context.next = 6;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(_chatBotService["default"].sendActivityMenu(sender_psid));

        case 4:
          _context.next = 34;
          break;

        case 6:
          if (!(message.quick_reply.payload === "SORRY_NO")) {
            _context.next = 11;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(_chatBotService["default"].sendBye(sender_psid));

        case 9:
          _context.next = 34;
          break;

        case 11:
          if (!(message.quick_reply.payload === "DONE")) {
            _context.next = 17;
            break;
          }

          // Happy or not
          response = {
            "text": "I am happy that you are!"
          };
          _context.next = 15;
          return regeneratorRuntime.awrap(_chatBotService["default"].sendMessage(sender_psid, response));

        case 15:
          _context.next = 34;
          break;

        case 17:
          if (!(message.quick_reply.payload === "NOT_YET")) {
            _context.next = 21;
            break;
          }

          // Want to dump more
          _chatBotService["default"].redo(sender_psid);

          _context.next = 34;
          break;

        case 21:
          if (!(message.quick_reply.payload === "START" || message.quick_reply.payload === "WAIT")) {
            _context.next = 26;
            break;
          }

          _context.next = 24;
          return regeneratorRuntime.awrap(_chatBotService["default"].sendStart(sender_psid));

        case 24:
          _context.next = 34;
          break;

        case 26:
          if (!(message.quick_reply.payload === "STOP")) {
            _context.next = 31;
            break;
          }

          _context.next = 29;
          return regeneratorRuntime.awrap(_chatBotService["default"].sendMessageAskingYesOrNo(sender_psid));

        case 29:
          _context.next = 34;
          break;

        case 31:
          if (!(message.quick_reply.payload === "DUMP")) {
            _context.next = 34;
            break;
          }

          _context.next = 34;
          return regeneratorRuntime.awrap(_chatBotService["default"].dumpTheTrash(sender_psid, Math.floor(Math.random() * 3)));

        case 34:
          returnl;

        case 35:
          //handle attachments
          //handle text message
          entity = handleMessageWithEntities(message);

          if (!(entity.name === "wit$greetings")) {
            _context.next = 46;
            break;
          }

          ask = false; // Check if the greeting is just a 'how are you'

          if (message.text.toLowerCase().includes('how are you')) {
            _response = {
              "text": "I am great. Thank you for asking."
            };
            ask = true;
          } else {
            _response = {
              "text": "Hello there"
            };
          }

          _context.next = 41;
          return regeneratorRuntime.awrap(_chatBotService["default"].sendMessage(sender_psid, _response));

        case 41:
          if (ask) {
            _context.next = 44;
            break;
          }

          _context.next = 44;
          return regeneratorRuntime.awrap(_chatBotService["default"].askingStartOrStop(sender_psid));

        case 44:
          _context.next = 58;
          break;

        case 46:
          if (!(entity.name === "wit$thanks")) {
            _context.next = 51;
            break;
          }

          _context.next = 49;
          return regeneratorRuntime.awrap(_chatBotService["default"].handlePositive(sender_psid, message.text));

        case 49:
          _context.next = 58;
          break;

        case 51:
          if (!(entity.name === "wit$bye")) {
            _context.next = 56;
            break;
          }

          _response2 = {
            "text": "Bye bye. See you later :D"
          };
          callSendAPI(sender_psid, _response2);
          _context.next = 58;
          break;

        case 56:
          _context.next = 58;
          return regeneratorRuntime.awrap(_chatBotService["default"].listenToStory(sender_psid, message));

        case 58:
        case "end":
          return _context.stop();
      }
    }
  });
};

var handleMessageWithEntities = function handleMessageWithEntities(message) {
  var entitiesArr = ["wit$greetings", "wit$thanks", "wit$bye"];
  var entityChosen = "";
  var data = {}; // data is an object saving value and name of the entity.

  entitiesArr.forEach(function (name) {
    var entity = firstEntity(message.nlp, name); //console.log(entity);

    if (entity && entity.confidence > 0.8) {
      entityChosen = name;
      data.value = entity.value;
    }
  }); //console.log("Debugging: " + entityChosen);

  data.name = entityChosen;
  return data;
};

function firstEntity(nlp, name) {
  return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

; // Handles messaging_postbacks events

var handlePostback = function handlePostback(sender_psid, received_postback) {
  var response, payload, username;
  return regeneratorRuntime.async(function handlePostback$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Get the payload for the postback
          payload = received_postback.payload; // Set the response based on the postback payload

          _context2.t0 = payload;
          _context2.next = _context2.t0 === "GET_STARTED" ? 4 : _context2.t0 === "MEME" ? 11 : _context2.t0 === "MUSIC" ? 14 : _context2.t0 === "BRIAN_MEME" ? 17 : _context2.t0 === "TRUMP_MEME" ? 20 : 23;
          break;

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(_chatBotService["default"].getFacebookUsername(sender_psid));

        case 6:
          username = _context2.sent;
          user.name = username; //send welcome response to users

          _context2.next = 10;
          return regeneratorRuntime.awrap(_chatBotService["default"].sendResponseWelcomeNewCustomer(username, sender_psid));

        case 10:
          return _context2.abrupt("break", 24);

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(_chatBotService["default"].sendMemeMenu(sender_psid));

        case 13:
          return _context2.abrupt("break", 24);

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap(_chatBotService["default"].sendMusic(sender_psid));

        case 16:
          return _context2.abrupt("break", 24);

        case 17:
          _context2.next = 19;
          return regeneratorRuntime.awrap(_chatBotService["default"].sendBrianMeme(sender_psid));

        case 19:
          return _context2.abrupt("break", 24);

        case 20:
          _context2.next = 22;
          return regeneratorRuntime.awrap(_chatBotService["default"].sendTrumpMeme(sender_psid));

        case 22:
          return _context2.abrupt("break", 24);

        case 23:
          console.log("Something wrong with switch case payload");

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // Sends response messages via the Send API


function callSendAPI(sender_psid, response) {
  // Construct the message body
  var request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }; // Send the HTTP request to the Messenger Platform

  (0, _request["default"])({
    "uri": "https://graph.facebook.com/v8.0/me/messages",
    "qs": {
      "access_token": PAGE_ACCESS_TOKEN
    },
    "method": "POST",
    "json": request_body
  }, function (err, res, body) {
    if (!err) {
      console.log('message sent!');
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

var _default = {
  postWebhook: postWebhook,
  getWebhook: getWebhook
};
exports["default"] = _default;