import amqp from "amqplib";
import config from '../config/config.js';


let channel, connection;

/* Create rabbitMQ connetection function  */
export async function connect() {
  connection = await amqp.connect(config.RABBITMQ_URI);

  channel = await connection.createChannel();

  console.log("Connected to RabbitMQ!");
};


/* Publish the queue  */
export async function publishToQueue(queueName, data) {

  await channel.assertQueue(queueName, { durable: true });
  await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  console.log("Message send to Queue", queueName);

}
