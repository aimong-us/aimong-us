const db = require('../models/chatroomModels.js');

  const API_KEY =  process.env.AI_KEY;
  const url = 'https://api.openai.com/v1/completions';


const aiController = {}

const createErr = (errObj) => {
  const { method, type, err } = errObj;
  return {
    log: `dbController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in dbController.${method}. Check server logs for more details.`,
    },
  };
};

aiController.getAiMessage = (req, res, next) => {

  const messages = res.locals.messages.map((message) => message.message);

  const shortenedMessages = messages.slice(messages.length - 5);
  
  console.log(shortenedMessages);

  const bearer = 'Bearer ' + API_KEY;
  fetch(url, {
      method: 'POST',
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `You are in a online chatroom, and this array contains the messages that have 
        been sent in the chatroom so far: ${shortenedMessages}. Write a fun message to send as if you were 
        a participant in this chatroom, but do everything you can to hide the fact that you are not human.`,
        temperature: 0.9,
        max_tokens: 50,

      }),
    })
    .then((response) => {
      // req.body.message = response.data.choices[0].text;
      console.log('this is working');
      return response.json()
      // console.log(response);
      // console.log(req.body.message);
      // return next();
    }).then((data)=>{
      res.locals.message = data.choices[0].text.trim();
      return next();
    })
    .catch((error) => {
      return next(
        createErr({
          method: 'aiController.getAiMessage',
          type: 'problem fetching ai message',
          err: error,
        })
      )
    })
    // .catch(()=> {
    //   console.log('this is not working');
    // })
}



module.exports = aiController;