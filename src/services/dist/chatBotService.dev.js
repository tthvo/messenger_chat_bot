"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _request = _interopRequireDefault(require("request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
var record = 0;
var already = false;
var menuAlready = false;
var better = false;

var reset = function reset() {
  return new Promise(function _callee(resolve, reject) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              record = 0;
              already = false;
              menuAlready = false;
              better = false;
              resolve("done!");
            } catch (e) {
              reject(e);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};

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
  return new Promise(function _callee2(resolve, reject) {
    var response_first, response_second;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            response_first = {
              "text": "Hi ".concat(username, ". Welcome to The Anger Dumpster")
            };
            response_second = {
              "text": "Here you can bring me your anger. Then I dump it down for you."
            }; //send a welcome message

            _context2.next = 5;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response_first));

          case 5:
            _context2.next = 7;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response_second));

          case 7:
            _context2.next = 9;
            return regeneratorRuntime.awrap(askingStartOrStop(sender_psid));

          case 9:
            resolve("done!");
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 12]]);
  });
};

var askingStartOrStop = function askingStartOrStop(sender_psid) {
  return new Promise(function _callee3(resolve, reject) {
    var text, request_body;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            try {
              text = "";

              if (!already) {
                text = "Shall we start dumping something? :D";
                already = true;
              } else {
                text = "Shall we dump some more things? :D";
              }

              request_body = {
                "recipient": {
                  "id": sender_psid
                },
                "messaging_type": "RESPONSE",
                "message": {
                  "text": text,
                  "quick_replies": [{
                    "content_type": "text",
                    "title": "Fine",
                    "payload": "START"
                  }, {
                    "content_type": "text",
                    "title": "Sorry no",
                    "payload": "STOP"
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
              resolve('done');
            } catch (e) {
              reject(e);
            }

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
};

var sendMessageAskingYesOrNo = function sendMessageAskingYesOrNo(sender_psid) {
  var text;

  if (!menuAlready) {
    text = "Before you go, don't you want to do something fun? You can always look it up in the bottom right menu :D";
    menuAlready = true;
  } else {
    text = "Wanna have some more fun activities?";
  }

  var request_body = {
    "recipient": {
      "id": sender_psid
    },
    "messaging_type": "RESPONSE",
    "message": {
      "text": text,
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
  return new Promise(function _callee4(resolve, reject) {
    var response;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
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

            _context4.next = 4;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 4:
            resolve("done!");
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            reject(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });
};

var sendMemeMenu = function sendMemeMenu(sender_psid) {
  return new Promise(function _callee5(resolve, reject) {
    var response_first, response;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
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

            _context5.next = 5;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response_first));

          case 5:
            _context5.next = 7;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 7:
            resolve("done!");
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            reject(_context5.t0);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
};

var sendBrianMeme = function sendBrianMeme(sender_psid) {
  return new Promise(function _callee6(resolve, reject) {
    var BrianMemeArr, source, response;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;

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
            _context6.next = 6;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 6:
            resolve("done!");
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

var sendTrumpMeme = function sendTrumpMeme(sender_psid) {
  return new Promise(function _callee7(resolve, reject) {
    var TrumpMemeArr, source, response;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
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

            _context7.next = 6;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 6:
            _context7.next = 11;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](0);
            reject(_context7.t0);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
};

var sendMusic = function sendMusic(sender_psid) {
  return new Promise(function _callee8(resolve, reject) {
    var response;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
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
                      "url": "https://www.youtube.com/watch?v=KsZ6tROaVOQ&list=PLkqz3S84Tw-QfG01Bz1QYgJnvKXcgpLQ-",
                      "webview_height_ratio": "tall"
                    },
                    "buttons": [{
                      "type": "web_url",
                      "url": "https://www.youtube.com/watch?v=KsZ6tROaVOQ&list=PLkqz3S84Tw-QfG01Bz1QYgJnvKXcgpLQ-",
                      "title": "Take me there"
                    }]
                  }, {
                    "title": "Red Velvet Music",
                    "image_url": "https://static.billboard.com/files/media/red-velvet-psycho-vid-2020-billboard-1548-1024x677.jpg",
                    "subtitle": "Red Flavor",
                    "default_action": {
                      "type": "web_url",
                      "url": "https://www.youtube.com/watch?v=J_CFBjAyPWE&list=RDEMK_G5MH5gqHCt0QkBaUH7jQ&start_radio=1",
                      "webview_height_ratio": "tall"
                    },
                    "buttons": [{
                      "type": "web_url",
                      "url": "https://www.youtube.com/watch?v=J_CFBjAyPWE&list=RDEMK_G5MH5gqHCt0QkBaUH7jQ&start_radio=1",
                      "title": "Take me there"
                    }]
                  }, {
                    "title": "BlackPink t Music",
                    "image_url": "https://media.vogue.co.uk/photos/5ef5c7b196e2923cb3e2316d/master/pass/BlackPink.jpg",
                    "subtitle": "Black Pink in your area",
                    "default_action": {
                      "type": "web_url",
                      "url": "https://www.youtube.com/watch?v=ioNng23DkIM&list=PLNF8K9Ddz0kKfujG6blfAxngYh_C66C_q",
                      "webview_height_ratio": "tall"
                    },
                    "buttons": [{
                      "type": "web_url",
                      "url": "https://www.youtube.com/watch?v=ioNng23DkIM&list=PLNF8K9Ddz0kKfujG6blfAxngYh_C66C_q",
                      "title": "Take me there"
                    }]
                  }]
                }
              }
            }; //
            //Send the music

            _context8.next = 4;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 4:
            resolve("done");
            _context8.next = 10;
            break;

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            reject(_context8.t0);

          case 10:
          case "end":
            return _context8.stop();
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

var seenMessage = function seenMessage(sender_psid) {
  return new Promise(function _callee9(resolve, reject) {
    var request_body;
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            try {
              request_body = {
                "recipient": {
                  "id": sender_psid
                },
                "sender_action": "mark_seen"
              };
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
              resolve("done");
            } catch (e) {
              reject(e);
            }

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    });
  });
};

var sendStart = function sendStart(sender_psid) {
  return new Promise(function _callee10(resolve, reject) {
    var response1, response2;
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            response1 = {
              "text": "Alright! Pass the garbage to me 😤!"
            };
            response2 = {
              "text": "And remember to send 'Done' when you are done :D"
            };
            _context10.next = 5;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response1));

          case 5:
            _context10.next = 7;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response2));

          case 7:
            resolve('done');
            _context10.next = 13;
            break;

          case 10:
            _context10.prev = 10;
            _context10.t0 = _context10["catch"](0);
            reject(_context10.t0);

          case 13:
          case "end":
            return _context10.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
};

var listenToStory = function listenToStory(sender_psid, message) {
  return new Promise(function _callee11(resolve, reject) {
    var received_message, sentiment, response, _response, _response2, _response3, _response4, _response5, _response6, _response7, _response8;

    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return regeneratorRuntime.awrap(seenMessage(sender_psid));

          case 3:
            received_message = message.text;
            sentiment = handleMessageWithSentiment(message);
            console.log(sentiment);

            if (!(sentiment.value === 'negative')) {
              _context11.next = 24;
              break;
            }

            if (!(received_message.toLowerCase().includes('kill') || received_message.toLowerCase().includes('murder'))) {
              _context11.next = 14;
              break;
            }

            record -= 5;
            response = {
              "text": "🙀🙀🙀"
            };
            _context11.next = 12;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 12:
            _context11.next = 22;
            break;

          case 14:
            if (!received_message.toLowerCase().includes('cockroaches')) {
              _context11.next = 21;
              break;
            }

            record -= 3;
            _response = {
              "text": "Usually they sleep right next to you at night 😂😂😂"
            };
            _context11.next = 19;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, _response));

          case 19:
            _context11.next = 22;
            break;

          case 21:
            record -= 1;

          case 22:
            _context11.next = 71;
            break;

          case 24:
            if (!/do you (like|love)/i.test(received_message)) {
              _context11.next = 30;
              break;
            }

            _response2 = {
              "text": "I am not sure ^^"
            };
            _context11.next = 28;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, _response2));

          case 28:
            _context11.next = 71;
            break;

          case 30:
            if (!/(feel|am) (better|relieved)/i.test(received_message)) {
              _context11.next = 37;
              break;
            }

            better = true;
            _response3 = {
              "text": "I am happy to hear that! ^^"
            };
            _context11.next = 35;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, _response3));

          case 35:
            _context11.next = 71;
            break;

          case 37:
            if (!(received_message.toLowerCase().includes('sad') || received_message.toLowerCase().includes('sed'))) {
              _context11.next = 44;
              break;
            }

            record -= 1;
            _response4 = {
              "text": "*pat pat :("
            };
            _context11.next = 42;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, _response4));

          case 42:
            _context11.next = 71;
            break;

          case 44:
            if (!/ah+/i.test(received_message)) {
              _context11.next = 50;
              break;
            }

            _response5 = {
              "text": "Did you just moan?"
            };
            _context11.next = 48;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, _response5));

          case 48:
            _context11.next = 71;
            break;

          case 50:
            if (!/\s*no+\s+/i.test(received_message)) {
              _context11.next = 56;
              break;
            }

            _response6 = {
              "text": "Oh Okay!😂"
            };
            _context11.next = 54;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, _response6));

          case 54:
            _context11.next = 71;
            break;

          case 56:
            if (!/\s*yes+/i.test(received_message)) {
              _context11.next = 62;
              break;
            }

            _response7 = {
              "text": "Hmm..."
            };
            _context11.next = 60;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, _response7));

          case 60:
            _context11.next = 71;
            break;

          case 62:
            if (!received_message.toLowerCase().includes('done')) {
              _context11.next = 67;
              break;
            }

            _context11.next = 65;
            return regeneratorRuntime.awrap(askDumpOrNot(sender_psid));

          case 65:
            _context11.next = 71;
            break;

          case 67:
            if (!received_message.toLowerCase().includes('how are you')) {
              _context11.next = 71;
              break;
            }

            _response8 = {
              "text": "I am great. Thank you for asking."
            };
            _context11.next = 71;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, _response8));

          case 71:
            if (!(sentiment.value === 'positive')) {
              _context11.next = 76;
              break;
            }

            _context11.next = 74;
            return regeneratorRuntime.awrap(handlePositive(sender_psid, message.text));

          case 74:
            _context11.next = 77;
            break;

          case 76:
            record -= 1;

          case 77:
            resolve("done");
            _context11.next = 83;
            break;

          case 80:
            _context11.prev = 80;
            _context11.t0 = _context11["catch"](0);
            reject(_context11.t0);

          case 83:
          case "end":
            return _context11.stop();
        }
      }
    }, null, null, [[0, 80]]);
  });
};

var handlePositive = function handlePositive(sender_psid, received_message) {
  return new Promise(function _callee12(resolve, reject) {
    var text, request_body, response;
    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            text = "";

            if (better) {
              _context12.next = 10;
              break;
            }

            text = "You are welcome. Are you feeling better now?";
            better = true;
            request_body = {
              "recipient": {
                "id": sender_psid
              },
              "messaging_type": "RESPONSE",
              "message": {
                "text": text,
                "quick_replies": [{
                  "content_type": "text",
                  "title": "Yes I am !",
                  "payload": "DONE",
                  "image_url": "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/smiling-face-with-open-mouth.png"
                }, {
                  "content_type": "text",
                  "title": "Sorry no..",
                  "payload": "NOT_YET",
                  "image_url": "https://emojiprints.com/wp-content/uploads/Crying-Face-Emoji-Classic-Round-Sticker.jpg"
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
            resolve("done");
            _context12.next = 15;
            break;

          case 10:
            text = "You are welcome";
            response = {
              "text": text
            };
            _context12.next = 14;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 14:
            resolve("done");

          case 15:
            _context12.next = 20;
            break;

          case 17:
            _context12.prev = 17;
            _context12.t0 = _context12["catch"](0);
            reject(_context12.t0);

          case 20:
          case "end":
            return _context12.stop();
        }
      }
    }, null, null, [[0, 17]]);
  });
};

var sendBye = function sendBye(sender_psid) {
  return new Promise(function _callee13(resolve, reject) {
    var response;
    return regeneratorRuntime.async(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            record = 0;
            better = false;
            already = false;
            menuAlready = false;
            response = {
              "text": "Thank you for coming to the Dumpster! I hope the best for you!"
            };
            _context13.next = 8;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 8:
            resolve("done");
            _context13.next = 14;
            break;

          case 11:
            _context13.prev = 11;
            _context13.t0 = _context13["catch"](0);
            reject(_context13.t0);

          case 14:
          case "end":
            return _context13.stop();
        }
      }
    }, null, null, [[0, 11]]);
  });
};

var redo = function redo(sender_psid) {
  record = 0;
  better = false;
  already = false;
  menuAlready = false;
  askingStartOrStop(sender_psid);
};

var sayScore = function sayScore(sender_psid) {
  return new Promise(function _callee14(resolve, reject) {
    var textArr, chosen, response;
    return regeneratorRuntime.async(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            textArr = ["That was aggressive 😮", "Fairly negative 😮", "Not much negativity though"];
            chosen = 0;
            if (record > -5) chosen = 2;else if (record > -10) chosen = 1;
            response = {
              "text": textArr[chosen]
            };
            _context14.next = 7;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 7:
            resolve('done');
            _context14.next = 13;
            break;

          case 10:
            _context14.prev = 10;
            _context14.t0 = _context14["catch"](0);
            reject(_context14.t0);

          case 13:
          case "end":
            return _context14.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
};

var askDumpOrNot = function askDumpOrNot(sender_psid) {
  return new Promise(function _callee15(resolve, reject) {
    var request_body;
    return regeneratorRuntime.async(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            try {
              request_body = {
                "recipient": {
                  "id": sender_psid
                },
                "messaging_type": "RESPONSE",
                "message": {
                  "text": "Time to dump? :D",
                  "quick_replies": [{
                    "content_type": "text",
                    "title": "Dump!",
                    "payload": "DUMP"
                  }, {
                    "content_type": "text",
                    "title": "Wait",
                    "payload": "WAIT"
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
              resolve('done');
            } catch (e) {
              reject(e);
            }

          case 1:
          case "end":
            return _context15.stop();
        }
      }
    });
  });
};

var dumpTheTrash = function dumpTheTrash(sender_psid, option) {
  return new Promise(function _callee16(resolve, reject) {
    var Arr, source, response;
    return regeneratorRuntime.async(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            Arr = ["https://media.tenor.com/images/85fd7e7119e2a63ade45991953119ddf/tenor.gif", // In and out
            "https://media1.tenor.com/images/9761847bcf035fb1ea3411803856f6f7/tenor.gif", //Man in the dumpster
            "https://media2.giphy.com/media/26uf35ez3HpmLIX6g/giphy.gif" // Machine
            ];
            source = Arr[option]; // 0 <= option <= 2

            response = {
              "attachment": {
                "type": "image",
                "payload": {
                  "url": source,
                  "is_reusable": true
                }
              }
            };
            _context16.next = 6;
            return regeneratorRuntime.awrap(sayScore(sender_psid));

          case 6:
            _context16.next = 8;
            return regeneratorRuntime.awrap(sendMessage(sender_psid, response));

          case 8:
            _context16.next = 10;
            return regeneratorRuntime.awrap(askingStartOrStop(sender_psid));

          case 10:
            resolve("done");
            _context16.next = 16;
            break;

          case 13:
            _context16.prev = 13;
            _context16.t0 = _context16["catch"](0);
            reject(_context16.t0);

          case 16:
          case "end":
            return _context16.stop();
        }
      }
    }, null, null, [[0, 13]]);
  });
}; //Detect negative mood


var handleMessageWithSentiment = function handleMessageWithSentiment(message) {
  var sentiment = {};
  var mood = firstEntity(message.nlp, 'wit$sentiment');

  if (mood && mood.confidence > 0.8) {
    sentiment.value = mood.value;
    sentiment.confidence = mood.confidence;
  }

  ;
  return sentiment;
}; //Function that return the traits of the a sentence


function firstEntity(nlp, name) {
  return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

var _default = {
  getFacebookUsername: getFacebookUsername,
  sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer,
  sendMessageAskingYesOrNo: sendMessageAskingYesOrNo,
  sendActivityMenu: sendActivityMenu,
  sendMemeMenu: sendMemeMenu,
  sendBrianMeme: sendBrianMeme,
  sendTrumpMeme: sendTrumpMeme,
  listenToStory: listenToStory,
  sendMusic: sendMusic,
  seenMessage: seenMessage,
  handlePositive: handlePositive,
  dumpTheTrash: dumpTheTrash,
  sendBye: sendBye,
  redo: redo,
  askingStartOrStop: askingStartOrStop,
  askDumpOrNot: askDumpOrNot,
  sendStart: sendStart,
  sendMessage: sendMessage,
  reset: reset
};
exports["default"] = _default;