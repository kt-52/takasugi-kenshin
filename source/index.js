"use strict";

const { portNumber } = require("../environment.json");

const { sendReplyMessage } = require("./lineApi/reply.js");
const { sendPushMessage } = require("./lineApi/push.js");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs").promises;
const { pickupOutsideReferenceRangeEntries } = require("./healthCheckXmlParser.js")
const { entriesToComponent } = require("./healthCheckComponents.js")

app.use(bodyParser.urlencoded({ "extended": true }));
app.use(bodyParser.json());

app.listen(portNumber, () => console.log(`Example app listening at http://localhost:${portNumber}`));

app.get("/", (_, response) => response.sendStatus(200));
app.post("/webhook", async (request, response) =>
  await Promise.all(request.body.events.map(handleEvent)).then(_ => response.sendStatus(200))
);

const handleEvent = async event => {
  switch (event.type) {
    case "follow":
      return handleFollowEvent(event);
    case "message":
      return handleMessageEvent(event);
    default:
      return Promise.resolve(null);
  };
};

const handleFollowEvent = async followEvent => sendReplyMessage(followEvent.replyToken, "貴殿の健康、わしが守らん。");
const handleMessageEvent = async messageEvent => {
  // sorry cheating...
  if (messageEvent.message.text !== "VUNSMmFFYzJNbDk0VnlSK2FTTkZkelpXWkVSYVpIdzNaQzRxTDAxRA") {
    return Promise.resolve(null);
  }

  await sendPushMessage(messageEvent.source.userId, "健診結果受領せり。")
  await new Promise(resolve => setTimeout(resolve, 1000));

  const xml = await fs.readFile("./xml/sample.xml")
  const entries = await pickupOutsideReferenceRangeEntries(xml);
  const components = entriesToComponent(entries);
  console.log(JSON.stringify(components, null, 2));

  if (components.length) {
    for (const component of components) {
      await sendPushMessage(messageEvent.source.userId, component.name);
      await sendPushMessage(messageEvent.source.userId, component.comment);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return sendPushMessage(messageEvent.source.userId, "以上なり。");
  } else {
    return sendPushMessage(messageEvent.source.userId, "全ての検査、基準値にあり。貴殿の健康素晴らしきかな。");
  }
};
