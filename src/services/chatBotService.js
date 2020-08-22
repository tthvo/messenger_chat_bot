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
            let response_first = { "text": `Hi ${username}. I am Quill. Nice to meet you buddy!` };
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
            "text": "Are you ok? Do you want to do something for fun?",
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "Yeah fine",
                    "payload": "YEAH_FINE",
                    "image_url":"https://i.pinimg.com/originals/1a/47/5c/1a475cb62dc8726ca420abb9da20cf76.png"
                }, {
                    "content_type": "text",
                    "title": "Sorry no",
                    "payload": "SORRY_NO",
                    "image_url":"https://cdn5.vectorstock.com/i/1000x1000/58/04/sad-face-icon-flat-style-vector-10185804.jpg"
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
                                "subtitle": "Sample of how to be great LOL",
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
            let BrianMemeArr = [
                "https://i.pinimg.com/236x/bc/9f/9f/bc9f9fea82a0fce900807e9625fc0388--brian-memes-classic-memes.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTkvw2MHBLUs76B0E4WP3B4fVIxNOJ0eNo1Vw&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxkoao6ZLNdDDH1n5uDtiUXViMrggWP39r8A&usqp=CAU",
                "https://i.imgflip.com/2yibbm.jpg",

            ];

            let random = Math.floor(Math.random() * 5);  
            let source = BrianMemeArr[random];
            let response = {
                "attachment":{
                    "type":"image", 
                    "payload":{
                      "url": source, 
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
            let TrumpMemeArr = [
                "https://i.redd.it/antyobs25se21.jpg",
                "https://static.boredpanda.com/blog/wp-content/uploads/2020/08/donald-trump-axios-jonathan-swan-interview-funny-jokes-fb6-png__700.jpg",
                "https://static.boredpanda.com/blog/wp-content/uploads/2020/08/donald-trump-axios-jonathan-swan-interview-funny-jokes-fb6-png__700.jpg",
                "https://i.imgflip.com/3sjxri.jpg"
            ];


            let random = Math.floor(Math.random() * 5); 
            let source = BrianMemeArr[random]; 
            let response = {
                "attachment":{
                    "type":"image", 
                    "payload":{
                      "url": source, 
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


export default  {
    getFacebookUsername,
    sendResponseWelcomeNewCustomer,
    sendMessageAskingYesOrNo,
    sendActivityMenu,
    sendMemeMenu,
    sendBrianMeme,
    sendTrumpMeme,
};