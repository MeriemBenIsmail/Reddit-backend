const express = require("express");
const { KafkaClient, Consumer } = require("kafka-node");

const app = express();

const client = new KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new Consumer(client, [{ topic: "your-topic" }]);
let sentMessage = "";
// consume kafka messages: setting up the kafka consumer to listen for new messages
consumer.on("message", (message) => {
  sentMessage = message;
});

// route for fetching data
app.get("/api/get-message", (req, res) => {
  res.json(sentMessage);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
