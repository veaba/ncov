/***********************
 * @name JS
 * @author Jo.gel
 * @date 2020/1/23
 * @topic spider-broadcasts 广播
 * @topic spider-news 一般新闻
 ***********************/
const kafka = require('kafka-node');
const {KAFKA_NEWS_TOPIC, KAFKA_HOST, KAFKA_PORT} = require('./config');
const Consumer = kafka.Consumer;
const Offset = kafka.Offset;
const Client = kafka.KafkaClient;
const topic = KAFKA_NEWS_TOPIC;

const client = new Client({kafkaHost: KAFKA_HOST + ':' + KAFKA_PORT});
const topics = [{topic: topic}];

const consumer = new Consumer(client, topics);
const offset = new Offset(client);

consumer.on('message', function (message) {
	console.log(message);
});

consumer.on('error', function (err) {
	console.log('error', err);
});

/*
* If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
*/
consumer.on(KAFKA_NEWS_TOPIC, function (topic) {
	topic.maxNum = 2;
	offset.fetch([topic], function (err, offsets) {
		if (err) {
			return console.error(err);
		}
		var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
		consumer.setOffset(topic.topic, topic.partition, min);
	});
});
