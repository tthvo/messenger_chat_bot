import request from "request";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

var record = 0;
var already = false;
var menuAlready = false;


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
            let response_first = { "text": `Hi ${username}. Welcome to The Anger Dumpster` };
            let response_second = {
                "text":"Here you can bring me your anger. Then I dump it down for you."
            };
            //send a welcome message
            await sendMessage(sender_psid, response_first);
            await sendMessage(sender_psid, response_second);
            await askingStartOrStop(sender_psid);
            resolve("done!")
        } catch (e) {
            reject(e);
        }

    });
};

let askingStartOrStop = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let text = "";
            already = true;
            if (!already) {
                text = "Shall we start dumping something? :D";
                already = true;
            } else {
                text = "Shall we dump some more things? :D";
            }

            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "messaging_type": "RESPONSE",
                "message": {
                    "text": text,
                    "quick_replies": [
                        {
                            "content_type": "text",
                            "title": "Fine",
                            "payload": "START",
                        }, {
                            "content_type": "text",
                            "title": "Sorry no",
                            "payload": "STOP",
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

            resolve('done');
        } catch (e) {
            reject(e);
        }

    });
    
};

let sendMessageAskingYesOrNo = (sender_psid) => {

    
    let text;
    if (!menuAlready) {
        text = "Before you go, don't you want to do something fun? You can always look it up in the bottom right menu :D";
    } else {
        text: "Wanna have some more fun activities?"
    }
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "messaging_type": "RESPONSE",
        "message": {
            "text": text,
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
                                    },
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
            /*
                */
            let BrianMemeArr = [
                "https://i.pinimg.com/236x/bc/9f/9f/bc9f9fea82a0fce900807e9625fc0388--brian-memes-classic-memes.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTkvw2MHBLUs76B0E4WP3B4fVIxNOJ0eNo1Vw&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxkoao6ZLNdDDH1n5uDtiUXViMrggWP39r8A&usqp=CAU",
                "https://i.imgflip.com/2yibbm.jpg",
            ];

            let source = BrianMemeArr[Math.floor(Math.random() * 4)];
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
                "https://i.imgflip.com/3sjxri.jpg",
            ];

            let source = TrumpMemeArr[Math.floor(Math.random() * 3)];
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

let sendMusic = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment":{
                    "type":"template",
                    "payload":{
                        "template_type":"generic",
                        "elements":[
                            {
                                "title":"Taylor Music",
                                "image_url":"https://pyxis.nymag.com/v1/imgs/7fa/a30/8f51f630e1e5c9be6fce36bda363d5ce14-23-taylor-swift-lover.rsocial.w1200.jpg",
                                "subtitle":"Folklore",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://www.youtube.com/watch?v=KsZ6tROaVOQ&list=PLkqz3S84Tw-QfG01Bz1QYgJnvKXcgpLQ-",
                                    "webview_height_ratio": "tall",
                                },
                                "buttons":[
                                    {
                                        "type":"web_url",
                                        "url":"https://www.youtube.com/watch?v=KsZ6tROaVOQ&list=PLkqz3S84Tw-QfG01Bz1QYgJnvKXcgpLQ-",
                                        "title":"Take me there"
                                    }         
                                ]      
                            }, 
                            {
                                "title":"Red Velvet Music",
                                "image_url":"https://static.billboard.com/files/media/red-velvet-psycho-vid-2020-billboard-1548-1024x677.jpg",
                                "subtitle":"Red Flavor",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://www.youtube.com/watch?v=J_CFBjAyPWE&list=RDEMK_G5MH5gqHCt0QkBaUH7jQ&start_radio=1",
                                    "webview_height_ratio": "tall",
                                },
                                "buttons":[
                                    {
                                        "type":"web_url",
                                        "url":"https://www.youtube.com/watch?v=J_CFBjAyPWE&list=RDEMK_G5MH5gqHCt0QkBaUH7jQ&start_radio=1",
                                        "title":"Take me there"
                                    }         
                                ]      
                            }, 
                            {
                                "title":"BlackPink t Music",
                                "image_url":"https://media.vogue.co.uk/photos/5ef5c7b196e2923cb3e2316d/master/pass/BlackPink.jpg",
                                "subtitle":"Black Pink in your area",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://www.youtube.com/watch?v=ioNng23DkIM&list=PLNF8K9Ddz0kKfujG6blfAxngYh_C66C_q",
                                    "webview_height_ratio": "tall",
                                },
                                "buttons":[
                                    {
                                        "type":"web_url",
                                        "url":"https://www.youtube.com/watch?v=ioNng23DkIM&list=PLNF8K9Ddz0kKfujG6blfAxngYh_C66C_q",
                                        "title":"Take me there"
                                    }         
                                ]      
                            }
                        ]
                    }
                } 
            };

            //
            //Send the music
            await sendMessage(sender_psid, response);
            resolve("done");
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

let seenMessage = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action":"mark_seen"
            };
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
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendStart = (sender_psid) => {
   
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {"text": "Alright! Pass the garbage to me 😤!"};
            let response2 = {"text": "And remember to send 'Done' when you are done :D"};
            await sendMessage(sender_psid, response1);
            await sendMessage(sender_psid, response2);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    });

};

let listenToStory = (sender_psid, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            await seenMessage(sender_psid);
            let received_message = message.text;
            let sentiment = handleMessageWithSentiment(message);
            if (sentiment.value === 'negative') {
                if (received_message.toLowerCase().includes('sad')) {
                    record -= 1;
                    let response = {"text": "I am sorry to hear that"};
                    await sendMessage(sender_psid, response);
                }
                else if (received_message.toLowerCase().includes('kill') || received_message.toLowerCase().includes('murder')) {
                    record -= 5;
                    let response = {"text": "🙀🙀🙀"};
                    await sendMessage(sender_psid, response);
                } else if (received_message.toLowerCase().includes('cockroaches')) {
                    record -= 3;
                    let response = {"text": "Usually they sleep right next to you at night 😂😂😂"};
                    await sendMessage(sender_psid, response);
                } else {
                    record -= 1;                 
                }  
            } else if (received_message.toLowerCase().search(/do you (like|love)/i)) {
                let response = {"text": "I am not sure ^^"};                
                await sendMessage(sender_psid, response);
            } 
            else if (received_message.toLowerCase().search(/(feel|am) (better|relieved)/i)) {
                let response = {"text": "I am happy to hear that! ^^"};                
                await sendMessage(sender_psid, response);
            } else if (received_message.toLowerCase().includes('sed')) {
                record -= 1;
                let response = {"text": "*pat pat :("};                
                await sendMessage(sender_psid, response);
            } else if(received_message.toLowerCase().includes('done')) {
                await askDumpOrNot(sender_psid);
            } else if(received_message.toLowerCase().includes('how are you')) {
                let response = {"text": "I am great. Thank you for asking."};
                await sendMessage(sender_psid, response);
            } else if (sentiment.value === 'positive') {
                let response = {"text": "I am happy that you are!"};
                await sendMessage(sender_psid,response);              
            } else {
                record -= 1;
            }
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let handlePositive = (sender_psid, received_message) => {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "messaging_type": "RESPONSE",
        "message": {
            "text": "You are welcome. Are you feeling better now?",
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "Yes I am !",
                    "payload": "DONE",
                    "image_url":"https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/smiling-face-with-open-mouth.png"
                }, {
                    "content_type": "text",
                    "title": "Sorry no..",
                    "payload": "NOT_YET",
                    "image_url":"https://emojiprints.com/wp-content/uploads/Crying-Face-Emoji-Classic-Round-Sticker.jpg"
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

let sendBye = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            already = false;
            record = 0;
            menuAlready = false;
            let response = {"text": "Thank you for coming to the Dumpster! I hope the best for you!"}
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let redo = (sender_psid) => {
    already = false;
    record = 0;
    menuAlready = false;
    askingStartOrStop(sender_psid);
};

let sayScore = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let textArr = ["That was aggressive 😮", "Fairly negative 😮", "Not much negativity though"];
            var chosen = 0;
            if (record > -5)
                chosen = 2;
            else if (record > -10)
                chosen = 1;

            let response = {"text": textArr[chosen]};
            await sendMessage(sender_psid, response);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    });
   

};

let askDumpOrNot = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "messaging_type": "RESPONSE",
                "message": {
                    "text": "Time to dump? :D",
                    "quick_replies": [
                        {
                            "content_type": "text",
                            "title": "Dump!",
                            "payload": "DUMP",
                        }, {
                            "content_type": "text",
                            "title": "Wait",
                            "payload": "WAIT",
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

            resolve('done');
        } catch (e) {
            reject(e);
        }

    });
    
};

let dumpTheTrash = (sender_psid, option) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Arr = [
                "https://media.tenor.com/images/85fd7e7119e2a63ade45991953119ddf/tenor.gif",  // In and out
                "https://media1.tenor.com/images/9761847bcf035fb1ea3411803856f6f7/tenor.gif",  //Man in the dumpster
                "https://media2.giphy.com/media/26uf35ez3HpmLIX6g/giphy.gif",  // Machine
            ];

            let source = Arr[option]; // 0 <= option <= 2
            let response = {
                "attachment":{
                    "type":"image", 
                    "payload":{
                      "url": source, 
                      "is_reusable":true
                    }
                }
            };
            await sayScore(sender_psid);
            //send a welcome message
            await sendMessage(sender_psid, response);
            await askingStartOrStop(sender_psid);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });

};

//Detect negative mood
let handleMessageWithSentiment = (message) => {
    let sentiment = {};
    let mood = firstEntity(message.nlp, 'wit$sentiment');
    if (mood && mood.confidence > 0.8) {
        sentiment.value = mood.value;
        sentiment.confidence = mood.confidence;
    };
    return sentiment;

};
//Function that return the traits of the a sentence
function firstEntity(nlp, name) {
    return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

export default  {
    getFacebookUsername,
    sendResponseWelcomeNewCustomer,
    sendMessageAskingYesOrNo,
    sendActivityMenu,
    sendMemeMenu,
    sendBrianMeme,
    sendTrumpMeme,
    listenToStory,
    sendMusic,
    seenMessage,
    handlePositive,
    dumpTheTrash,
    sendBye,
    redo,
    askingStartOrStop,
    askDumpOrNot,
    sendStart,
    sendMessage 
};