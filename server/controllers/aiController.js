const db = require('../models/chatroomModels.js');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.AI_KEY,
});

const openai = new OpenAIApi(configuration);

//this controller will be responsible for the middleWare that controls CRUD to the DB;
const aiController = {};

aiController.getAiMessage = async () => {
  try {
    const query = 'SELECT * FROM messages';
    const data = await db.query(query);

    const messages = data.rows.slice(-11, -1).map((message) => message.message);

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Given this array of messages that have been sent in an online chatroom: ${messages}. 
        Write a single message to add to chatroom. The message should be no more than one short sentence, 
        have limited punctuation, and use hip abbreviations. Do not send any greetings. Instead, justask questions, or say funny 
        or random things.
        `,
      max_tokens: 30,
      temperature: 0.5,
    });

    const aiMessage = response.data.choices[0].text;
    return aiMessage;
  } catch (err) {
    console.log(err);
  }
};

aiController.getAiUser = async () => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'Write a fun online chatroom username',
      max_tokens: 30,
      temperature: 0.9,
    });

    aiUsername = response.data.choices[0].text;

    const query = `
    INSERT INTO users(username, password, email)
    VALUES($1, $2, $3)
    RETURNING *`;
    const values = [aiUsername, 'ai', 'ai'];

    const data = await db.query(query, values);
    aiUserId = data.rows[0].user_id;

    return aiUserId;
  } catch (err) {
    console.log(err);
  }
};

module.exports = aiController;
