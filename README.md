# THE ANGER DUMPSTER #

## Features ## 
*   Take in negative comments and tell user how negative they are, send a pic/gif make the idea of speaking out those unspoken (negative) thoughts as a way to dump garbage.

*   Suggest fun activities: Meme, Music.

## Inspiration ##

I dedicate this project to my very best friend who has been an outcast throughout high school and up till now. Before we met, the lack of a company to share stories became such a burden that left the guy with serious depression. Now that we are separated by distance and isolation due to pandemic, social media is the only way to connect. However, huge difference in schedule leaves us no choice but to minimize our essential chatting time. Therefore, I built this chatbot - The Anger Dumpster - so that my friend can let out everything he wishes to say and relieve his mind while I am off to study. This is for you.


## What it does ##

The bot will serve as a listener to the user. I would initiate a process called Dumping the Trash, which prompts the user to say things that I want to say such as daily incidents, gossips, or swear words (more restrictions will be placed on this feature) that bothers their mind. Then, the bot will comment on how negative the conversation is and send a gif showing a hilarious way to throw a trash, which might lift the mood of the user. Then, if the user does not want to continue, it would suggest certain activities such as Meme and Music. Besides, the bot was designed to respond to certain words like “sad”, “cockroaches”, “Ahh” to make it more of a human-to-human conversation.

## Tools ## 
*   [Nodejs](https://nodejs.dev) for JavaScript code execution
*   [Heroku Platform](https://www.heroku.com) for deploying the node.js App.

## Installed packages ##
```bash
npm install --save express dotenv ejs body-parser request
```

## How I built it ##

I started with basic steps of setting up the webhook according to the documentation and used Heroku as my server to deploy the bot. I then extracted the message from the webhook event, which was handled by functions that uses Regular Expression to match certain words for response and Natural Language Processing (NLP) for identifying purposes and mainly sentiment. Quick Replies were also implemented for directing the user. To stimulate the experience of having someone listening to one’s stories, I displayed a seen-message (sender action) by sending a POST request to Send API. The source code also includes a reset function that resets all the variable for user flow control and negativity score record after the user sends a good-bye message (detected by NLP).



## Challenges I ran into ##

It was first really challenging to set up certain feature (eg. the get-started button) since I had almost zero experience with node js. However, thanks to the help of the Messsenger documentation and online tutorials, I finally understood the basic concepts and syntax to build a demo chatbot. Furthermore, the system of grading how negative a sentence is far more dependent on the individual’s perspective, which I believe it would be a bias to base the bot on my opinion. The step to create a database to keep files such as pictures and gifs is still an issue.


## What I learned ##

This is my first encounter with JavaScript and HTML, in which I acquired the basic logic and syntax for my study in Computer Science. Natural Language Processing was also a completely new concepts that interested my particularly and guided me towards Wit.ai. I also got used to browsing through the documentations and getting the only essential information for help.

## What's next for Anger Dumpster ##

*   I am working on adding a new feature to the bot that makes it analyze the messages, then guess what the problem might be by matching with database and suggest a way to deal with it. In appropriate situation, it could potentially make a joke or pun from the content of the received message .
*   The bot also needs to implement a method to check whether certain message composed of words that trigger offence, discrimination or racism to inform the user to avoid such words in everyday life and guide them towards a more loving perspective.
*   I will also study and explore ways to establish database to save files for retrieving and storing. 



