import request from "request";

let setUpMessengerPlatform = (PAGE_ACCESS_TOKEN) => {
    return new Promise((resolve, reject) => {
        try {
            let data = {
                "get_started": {
                    "payload": "GET_STARTED"
                },
                
                "persistent_menu": [
                    {
                        "locale": "default",
                        "composer_input_disabled": false,
                        "call_to_actions": [
                            {
                                "type": "postback",
                                "title": "🤣 More Meme 🤣",
                                "payload": "MEME"
                            },
                            {
                                "type": "postback",
                                "title": "🎼 Some Music 🎼",
                                "payload": "MUSIC"
                            },
                            {
                                "type": "web_url",
                                "title": "🎲 Tic Tac To 🎲",
                                "url": "https://playtictactoe.org/",
                                "webview_height_ratio": "full"
                            }
                        ]
                    }
                ],
                
                "whitelisted_domains": [
                    "https://chatbot-protocol.herokuapp.com/"
                ]
            };

            request({
                "uri": "https://graph.facebook.com/v8.0/me/messenger_profile",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": data
            }, (err, res, body) => {
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

export default  {
    setUpMessengerPlatform
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