import * as amqplib from "amqplib";

(async function() {
  
  try {
    
    console.time("connect");
    const connection = await amqplib.connect(process.env.RND_RABBITMQ);
    console.timeEnd("connect");

    console.time("createChannel");
    const channel = await connection.createChannel();
    console.timeEnd("createChannel");

    console.time("assertQueue");
    await channel.assertQueue("tasks");
    console.timeEnd("assertQueue");

    channel.consume("tasks", message => {
      console.log(message.content.toString());
      channel.ack(message);
    }, {
      consumerTag: "my-syb"
    });

  } catch (err) {
    console.log(err);
  }


})();