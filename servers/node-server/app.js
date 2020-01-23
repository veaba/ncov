/***********************
 * @name JS
 * @author Jo.gel
 * @date 2020/1/23
 ***********************/
const kafka = require('kafka-node');

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'});
const consumer = new Consumer(
	client,
	[
		{topic: 'hello-kafka-test', partition: 1}
	],
	{
		autoCommit: false
	}
);
consumer.on('hello-kafka-test', function (message) {
	console.log(message);
});

