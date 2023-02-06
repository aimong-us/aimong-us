const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.AI_KEY,
});

const openai = new OpenAIApi(configuration);

//this controller will be responsible for the middleWare that controls CRUD to the DB;
const aiController = {};

aiController.getAiMessage = async (req, res, next) => {
  const messages = res.locals.messages.map((message) => message.message);
  console.log(messages);
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `You are in a online chatroom, and this array contains the messages that have 
        been sent in the chatroom so far: ${messages}. Write a fun message to send as if you were 
        a participant in this chatroom, but do everything you can to hide the fact that you are not human.`,
      max_tokens: 50,
      temperature: 0.9,
    });

    req.body.message = response.data.choices[0].text;
    return next();
  } catch (err) {
    return next({
      log: 'aiController.getAiMessage: ERROR: err',
      message: {
        err: 'Error occurred in dbController.getAiMessage. Check server logs for more details.',
      },
    });
  }
};

module.exports = aiController;
