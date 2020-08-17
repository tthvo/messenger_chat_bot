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
                                "type": "web_url",
                                "title": "Tic Tac To",
                                "url": "https://playtictactoe.org/",
                                "webview_height_ratio": "full"
                            },
                            {
                                "type": "web_url",
                                "title": "Make meme",
                                "url": "https://imgflip.com/memegenerator/",
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