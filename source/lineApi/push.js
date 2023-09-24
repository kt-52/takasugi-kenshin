"use strict";

const { channelAccessToken } = require("../../environment.json");
const axios = require("axios");

const headers = {
  "headers": {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${channelAccessToken}`,
  },
};

const sendPushMessages = async (userId, messages) => {
  const body = JSON.stringify({
    "to": userId,
    "messages": messages.map(message => ({
      "type": "text",
      "text": message,
    })),
  });

  return axios.post("https://api.line.me/v2/bot/message/push", body, headers)
  .then(response => console.log(response.data));
};

exports.sendPushMessage = (userId, message) => sendPushMessages(userId, [message]);
exports.sendPushMessages = sendPushMessages;
