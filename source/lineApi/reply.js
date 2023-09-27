"use strict";

const axios = require("axios");

const headers = {
  "headers": {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
  },
};

const sendReplyMessages = async (replyToken, messages) => {
  const body = JSON.stringify({
    "replyToken": replyToken,
    "messages": messages.map(message => ({
      "type": "text",
      "text": message,
    })),
  });

  return axios.post("https://api.line.me/v2/bot/message/reply", body, headers)
  .then(response => console.log(response.data));
};

exports.sendReplyMessage = (replyToken, message) => sendReplyMessages(replyToken, [message]);
exports.sendReplyMessages = sendReplyMessages;
