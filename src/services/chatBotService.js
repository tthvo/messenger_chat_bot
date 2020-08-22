import request from "request";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let getFacebookUsername = (sender_psid) => {
    return new Promise((resolve, reject) => {
        // Send the HTTP request to the Messenger Platform
        let uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`;
        request({
            "uri": uri,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                //convert string to json object
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
    return new Promise(async (resolve, reject) => {
        try {
            let response_first = { "text": `Hi ${username}. Nice to meet you buddy!` };
            //send a welcome message
            await sendMessage(sender_psid, response_first);
            resolve("done!")
        } catch (e) {
            reject(e);
        }

    });
};

let sendMessageAskingYesOrNo = (sender_id) => {
    let request_body = {
        "recipient": {
            "id": sender_id
        },
        "messaging_type": "RESPONSE",
        "message": {
            "text": "Are you ok ? Do you want to do something for fun ?",
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "Yeah fine",
                    "payload": "YEAH_FINE",
                }, {
                    "content_type": "text",
                    "title": "Sorry no",
                    "payload": "SORRY_NO",
                }
            ]
        }
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
};

let sendActivityMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
           
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Activities",
                                "subtitle": "What shall we do today ?",
                                "image_url": "https://www.mememaker.net/api/bucket?path=static/img/memes/full/2019/Jul/2/8/so-what-to-do-now-16529.png",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "Music",
                                        "payload": "MUSIC",
                                    },

                                    {
                                        "type": "postback",
                                        "title": "Meme",
                                        "payload": "MEME",
                                    }
                                ],
                            } ]
                    }
                }
            };
            //send a image with button view main menu
            await sendMessage(sender_psid, response);

            resolve("done!")
        } catch (e) {
            reject(e);
        }
    });

};

let sendMemeMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {

        try {
            let response_first = {
                "text": "Great choice! Let's have a look at meme menu.",
                "sender_action":"typing_on"
            };
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "BAD LUCK BRIAN MEME",
                                "subtitle": "Bad Day heh ?",
                                "image_url": "https://i.kym-cdn.com/entries/icons/facebook/000/009/515/BadLuckBryan.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "YES BRIAN",
                                        "payload": "BRIAN_MEME",
                                    }
                                ],
                            },
                            {
                                "title": "TRUMP MEME",
                                "subtitle": "Make American Great Again ?!! JK",
                                "image_url": "https://images.indianexpress.com/2017/11/trump-water-bottle-meme-759.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "WHY NOT TRUMP",
                                        "payload": "TRUMP_MEME",
                                    }
                                ],
                            },

                        ]
                    }
                }
            };

            //send a welcome message
            await sendMessage(sender_psid, response_first);
            //Send the meme menu
            await sendMessage(sender_psid, response);
            resolve("done!")
        } catch (e) {
            reject(e);
        }
    });

};

let sendBrianMeme = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try { 
            let response = {
                "attachment":{
                    "type":"image", 
                    "payload":{
                      "url":"https://i.pinimg.com/236x/bc/9f/9f/bc9f9fea82a0fce900807e9625fc0388--brian-memes-classic-memes.jpg", 
                      "is_reusable":true
                    }
                }
            };
            await sendMessage(sender_psid, response);
            resolve("done!")
        } catch (e) {
            reject(e);
        }
    });
};

let sendTrumpMeme = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment":{
                    "type":"image", 
                    "payload":{
                      "url":"https://i.redd.it/antyobs25se21.jpg", 
                      "is_reusable":true
                    }
                }
            };

            //send a welcome message
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};

let goBackToMainMenu = (sender_psid) => {
    sendActivityMenu(sender_psid);
};

let handleReserveTable = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getFacebookUsername(sender_psid);
            let response = { text: `Hi ${username}, What time and date you would like to reserve a table ?` };
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};

let sendMessage = (sender_psid, response) => {
    return new Promise((resolve, reject) => {
        try {
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
                    console.log("message sent!");
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};


let sendMessageAskingPhoneNumber = (sender_id) => {
    let request_body = {
        "recipient": {
            "id": sender_id
        },
        "messaging_type": "RESPONSE",
        "message": {
            "text": "Thank you. And what's the best phone number for us to reach you at?",
            "quick_replies": [
                {
                    "content_type": "user_phone_number",
                }
            ]
        }
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
};

let sendMessageDoneReserveTable = async (sender_id) => {
    try {
        let response = {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://bit.ly/giftDonalTrump"
                }
            }
        };
        await sendMessage(sender_id, response);

        //get facebook username
        let username = await getFacebookUsername(sender_id);

        //send another message
        let response2 = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": `Done! \nOur reservation team will contact you as soon as possible ${username}.\n \nWould you like to check our Main Menu?`,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "SHOW MAIN MENU",
                            "payload": "MAIN_MENU"
                        },
                        {
                            "type":"phone_number",
                            "title":"☎ HOT LINE",
                            "payload":"+911911"
                        }
                    ]
                }
            }
        };
        await sendMessage(sender_id, response2);
    } catch (e) {
        console.log(e);
    }
};

let sendNotificationToTelegram = (user) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                chat_id: process.env.TELEGRAM_GROUP_ID,
                parse_mode: "HTML",
                text: `
| --- <b>A new reservation</b> --- |
| ------------------------------------------------|
| 1. Username: <b>${user.name}</b>   |
| 2. Phone number: <b>${user.phoneNumber}</b> |
| 3. Time: <b>${user.time}</b> |
| 4. Quantity: <b>${user.quantity}</b> |
| 5. Created at: ${user.createdAt} |
| ------------------------------------------------ |                           
      `
            };

            // Send the HTTP request to the Telegram
            request({
                "uri": `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

export default  {
    getFacebookUsername,
    sendResponseWelcomeNewCustomer,
    sendMessageAskingYesOrNo,
    sendActivityMenu,
    sendMemeMenu,
    sendBrianMeme,
    sendTrumpMeme,
    goBackToMainMenu,
    handleReserveTable,
    sendMessageAskingPhoneNumber ,
    sendMessageDoneReserveTable,
    sendNotificationToTelegram
};