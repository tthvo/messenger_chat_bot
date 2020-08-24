"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _request = _interopRequireDefault(require("request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

var getFacebookUsername = function getFacebookUsername(sender_psid) {
  return new Promise(function (resolve, reject) {
    // Send the HTTP request to the Messenger Platform
    var uri = "https://graph.facebook.com/".concat(sender_psid, "?fields=first_name,last_name,profile_pic&access_token=").concat(PAGE_ACCESS_TOKEN);
    (0, _request["default"])({
      "uri": uri,
      "method": "GET"
    }, function (err, res, body) {
      if (!err) {
        //convert string to json object
        body = JSON.parse(body);
        var username = "".concat(body.last_name, " ").concat(body.first_name);
        resolve(username);
      } else {
        reject("Unable to send message:" + err);
      }
    });
  });
};

var sendResponseWelcomeNewCustomer = function sendResponseWelcomeNewCustomer(username, sender_psid) {
  return new Promise(function _callee(resolve, reject) {
    var response_first;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            response_first = {
              "text": "Hi ".concat(username, ". I am Quill. Nice to meet you buddy!")
            }; //send a welcome message

            _context.next = 4;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response_first));

          case 4:
            resolve("done!");
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });
};

var sendMessageAskingYesOrNo = function sendMessageAskingYesOrNo(sender_id) {
  var request_body = {
    "recipient": {
      "id": sender_id
    },
    "messaging_type": "RESPONSE",
    "message": {
      "text": "Are you ok? Do you want to do something for fun?",
      "quick_replies": [{
        "content_type": "text",
        "title": "Yeah fine",
        "payload": "YEAH_FINE",
        "image_url": "https://i.pinimg.com/originals/1a/47/5c/1a475cb62dc8726ca420abb9da20cf76.png"
      }, {
        "content_type": "text",
        "title": "Sorry no",
        "payload": "SORRY_NO",
        "image_url": "https://cdn5.vectorstock.com/i/1000x1000/58/04/sad-face-icon-flat-style-vector-10185804.jpg"
      }]
    }
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
};

var sendActivityMenu = function sendActivityMenu(sender_psid) {
  return new Promise(function _callee2(resolve, reject) {
    var response;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            response = {
              "attachment": {
                "type": "template",
                "payload": {
                  "template_type": "generic",
                  "elements": [{
                    "title": "Activities",
                    "subtitle": "What shall we do today ?",
                    "image_url": "https://www.mememaker.net/api/bucket?path=static/img/memes/full/2019/Jul/2/8/so-what-to-do-now-16529.png",
                    "buttons": [{
                      "type": "postback",
                      "title": "Music",
                      "payload": "MUSIC"
                    }, {
                      "type": "postback",
                      "title": "Meme",
                      "payload": "MEME"
                    }]
                  }]
                }
              }
            }; //send a image with button view main menu

            _context2.next = 4;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 4:
            resolve("done!");
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });
};

var sendMemeMenu = function sendMemeMenu(sender_psid) {
  return new Promise(function _callee3(resolve, reject) {
    var response_first, response;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            response_first = {
              "text": "Great choice! Let's have a look at meme menu.",
              "sender_action": "typing_on"
            };
            response = {
              "attachment": {
                "type": "template",
                "payload": {
                  "template_type": "generic",
                  "elements": [{
                    "title": "BAD LUCK BRIAN MEME",
                    "subtitle": "Bad Day heh ?",
                    "image_url": "https://i.kym-cdn.com/entries/icons/facebook/000/009/515/BadLuckBryan.jpg",
                    "buttons": [{
                      "type": "postback",
                      "title": "YES BRIAN",
                      "payload": "BRIAN_MEME"
                    }]
                  }, {
                    "title": "TRUMP MEME",
                    "subtitle": "Sample of how to be great LOL",
                    "image_url": "https://images.indianexpress.com/2017/11/trump-water-bottle-meme-759.jpg",
                    "buttons": [{
                      "type": "postback",
                      "title": "WHY NOT TRUMP",
                      "payload": "TRUMP_MEME"
                    }]
                  }]
                }
              }
            }; //send a welcome message

            _context3.next = 5;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response_first));

          case 5:
            _context3.next = 7;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 7:
            resolve("done!");
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            reject(_context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
};

var sendBrianMeme = function sendBrianMeme(sender_psid) {
  return new Promise(function _callee4(resolve, reject) {
    var BrianMemeArr, source, response;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;

            /*
                */
            BrianMemeArr = ["https://i.pinimg.com/236x/bc/9f/9f/bc9f9fea82a0fce900807e9625fc0388--brian-memes-classic-memes.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTkvw2MHBLUs76B0E4WP3B4fVIxNOJ0eNo1Vw&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxkoao6ZLNdDDH1n5uDtiUXViMrggWP39r8A&usqp=CAU", "https://i.imgflip.com/2yibbm.jpg"];
            source = BrianMemeArr[Math.floor(Math.random() * 4)];
            response = {
              "attachment": {
                "type": "image",
                "payload": {
                  "url": source,
                  "is_reusable": true
                }
              }
            };
            _context4.next = 6;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 6:
            resolve("done!");
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            reject(_context4.t0);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 9]]);
  });
};

var sendTrumpMeme = function sendTrumpMeme(sender_psid) {
  return new Promise(function _callee5(resolve, reject) {
    var TrumpMemeArr, source, response;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            TrumpMemeArr = ["https://i.redd.it/antyobs25se21.jpg", "https://static.boredpanda.com/blog/wp-content/uploads/2020/08/donald-trump-axios-jonathan-swan-interview-funny-jokes-fb6-png__700.jpg", "https://i.imgflip.com/3sjxri.jpg"];
            source = TrumpMemeArr[Math.floor(Math.random() * 3)];
            response = {
              "attachment": {
                "type": "image",
                "payload": {
                  "url": source,
                  "is_reusable": true
                }
              }
            }; //send a welcome message

            _context5.next = 6;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 6:
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            reject(_context5.t0);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
};

var listenToStory = function listenToStory(sender_psid, received_message) {
  return new Promise(function _callee6(resolve, reject) {
    var reply, response;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            reply = "";

            if (received_message.toLowerCase().includes('why')) {
              reply = "Because it it the moment you are happy :D";
            } else if (received_message.toLowerCase().includes('no')) {
              reply = "You know I will always be there for you.";
            } else if (received_message.toLowerCase().includes('yes') || received_message.toLowerCase().includes('fine')) {
              reply = "I am listening";
            } else if (received_message.toLowerCase().includes("how")) {
              reply = "Why don't you look back in your photo and send me your most beautiful moment?";
            } else reply = "I am sorry to hear that";

            response = {
              "text": reply
            };
            _context6.next = 6;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 6:
            resolve("done");
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 9]]);
  });
};

var sendMusic = function sendMusic(sender_psid) {
  return new Promise(function _callee7(resolve, reject) {
    var response;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            response = {
              "attachment": {
                "type": "template",
                "payload": {
                  "template_type": "generic",
                  "elements": [{
                    "title": "Taylor Music",
                    "image_url": "https://pyxis.nymag.com/v1/imgs/7fa/a30/8f51f630e1e5c9be6fce36bda363d5ce14-23-taylor-swift-lover.rsocial.w1200.jpg",
                    "subtitle": "Folklore",
                    "default_action": {
                      "type": "web_url",
                      "url": "https://open.spotify.com/album/2fenSS68JI1h4Fo296JfGr3",
                      "webview_height_ratio": "tall"
                    },
                    "buttons": [{
                      "type": "web_url",
                      "url": "https://www.taylorswift.com",
                      "title": "About Taylor Swift"
                    }]
                  }]
                }
              }
            }; //Send the music

            _context7.next = 4;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 4:
            resolve("done");
            _context7.next = 10;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            reject(_context7.t0);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });
};

var sendMessage = function sendMessage(sender_psid, response) {
  return new Promise(function (resolve, reject) {
    try {
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
          console.log("message sent!");
          resolve('done!');
        } else {
          reject("Unable to send message:" + err);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

var _default = {
  getFacebookUsername: getFacebookUsername,
  sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer,
  sendMessageAskingYesOrNo: sendMessageAskingYesOrNo,
  sendActivityMenu: sendActivityMenu,
  sendMemeMenu: sendMemeMenu,
  sendBrianMeme: sendBrianMeme,
  sendTrumpMeme: sendTrumpMeme,
  listenToStory: listenToStory,
  sendMusic: sendMusic
};
exports["default"] = _default;