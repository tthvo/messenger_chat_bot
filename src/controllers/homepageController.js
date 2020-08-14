import request from "request";

let getHomepage = (req, res) => {
    return res.render("homepage.ejs");
};

let getFacebookUserProfile = (req, res) => {
    return res.render("profile.ejs");

};

let setUpUserFacebookProfile = (req, res) => {
    // Send the HTTP request to the Messenger Platform
    let data = {
        "get_started":{
            "payload":"GET_STARTED"
          },
        "persistent_menu": [
        {
            "locale": "default",
            "composer_input_disabled": false,
            "call_to_actions": [
                {
                    "type": "postback",
                    "title": "Talk to an agent",
                    "payload": "CARE_HELP"
                },
                {
                    "type": "postback",
                    "title": "Outfit suggestions",
                    "payload": "CURATION"
                },
                {
                    "type": "web_url",
                    "title": "Shop now",
                    "url": "https://www.originalcoastclothing.com/",
                    "webview_height_ratio": "full"
                }
            ]
        }
        ],
        "whitelisted_domains":[
            "https://chatbot-protocol.herokuapp.com/"      
        ]

    };


    request({
        "uri": "https://graph.facebook.com/v8.0/me/messenger_profile",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": data
        }, (err, res) => {
        if (!err) {
            console.log('message sent!');
            return res.status(200).json({
                message: "Setup done!"

            });
        } else {
            return res.status(500).json({
                message : "Error from the node server"

            });
            
        }
    }); 

};

export default {
    getHomepage,
    getFacebookUserProfile,
    setUpUserFacebookProfile
};