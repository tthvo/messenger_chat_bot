"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _request = _interopRequireDefault(require("request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var setUpMessengerPlatform = function setUpMessengerPlatform(PAGE_ACCESS_TOKEN) {
  return new Promise(function (resolve, reject) {
    try {
      var data = {
        "get_started": {
          "payload": "GET_STARTED"
        },
        "persistent_menu": [{
          "locale": "default",
          "composer_input_disabled": false,
          "call_to_actions": [{
            "type": "postback",
            "title": "🤣 More Meme 🤣",
            "payload": "MEME"
          }, {
            "type": "postback",
            "title": "🎼 Some Music 🎼",
            "payload": "MUSIC"
          }, {
            "type": "web_url",
            "title": "🎲 Tic Tac To 🎲",
            "url": "https://playtictactoe.org/",
            "webview_height_ratio": "full"
          }]
        }],
        "whitelisted_domains": ["https://chatbot-protocol.herokuapp.com/"]
      };
      (0, _request["default"])({
        "uri": "https://graph.facebook.com/v8.0/me/messenger_profile",
        "qs": {
          "access_token": PAGE_ACCESS_TOKEN
        },
        "method": "POST",
        "json": data
      }, function (err, res, body) {
        if (!err) {
          resolve("setup done!");
        } else {
          reject(err);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

var _default = {
  setUpMessengerPlatform: setUpMessengerPlatform
};
/* 
function removePersistentMenu(){
 request({
    url: 'https://graph.facebook.com/v2.6/me/thread_settings',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json:{
        setting_type : "call_to_actions",
        thread_state : "existing_thread",
        call_to_actions:[ ]
    }

}, function(error, response, body) {
    console.log(response)
    if (error) {
        console.log('Error sending messages: ', error)
    } else if (response.body.error) {
        console.log('Error: ', response.body.error)
    }
})
}*/

exports["default"] = _default;