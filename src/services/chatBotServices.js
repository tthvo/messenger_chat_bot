import request from "request";


let getFacebookUserName = (sender_psid) => {
    return new Promise((resolve, reject) => {
        let uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.PAGE_ACCESS_TOKEN }`;
    
        request({
        "uri": uri,
        "method": "GET",
        }, (err, res, body) => {
        if (!err) {
            body = JSON.parse(body);
            let username = `${body.last_name} ${body.first_name}`;
            resolve(username);
        } else {
            reject("Unable to send message:" + err);
        }
        }); 

    });

  };
let sendResponseWelcomeNewCustomer = (username, sender_psid) => {
    return new Promise((resolve,reject) =>{
        let response_first = { "text": `Nice to me you ${username}. My name is Mr.NoName` }; 

        let response_second = {
            "attachment": {
              "type": "template",
              "payload": {
                "template_type": "generic",
                "elements": [{
                  "title": "Restaurant demo",
                  "subtitle": "Tap a button to answer.",
                  "image_url": "https://bit.ly/imageToSend",
                  "buttons": [
                    {
                      "type": "postback",
                      "title": "Menu",
                      "payload": "MENU",
                    },
                  ],
                }]
              }
            }
        }

        //Send message welcome
        await sendMessage(sender_psid, response_first);

        //Send the an image with button view main menu
        await sendMessage(sendMessage,response_second);
    
        

    });

    

};

let sendMessage = (sender_psid, response) => {
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

};



export default {
    getFacebookUserName,
    sendResponseWelcomeNewCustomer

};