import json
# from socket_app import socket_app
from pykafka import KafkaClient
from config import KAFKA_HOST, KAFKA_NEWS_TOPIC, KAFKA_HOT_TOPIC


# 消费者,collection_mame
async def kafka_consumer(topic_key, collection_name):
    # socket_emit()
    print(topic_key, collection_name)
    if not topic_key:
        return RuntimeError('topic_key')
    client = KafkaClient(hosts=KAFKA_HOST)
    topic = client.topics[topic_key]
    consumer = topic.get_simple_consumer(consumer_group=topic_key, reset_offset_on_start=True)
    for msg in consumer:
        if msg is not None:
            # print(dir(msg))
            # print(msg.value)
            # print(msg.timestamp)
            msg_json_str = str(msg.value, encoding='utf-8')
            msg_json_double = msg_json_str.replace("'", '"')  # 单引号转引号
            # msg_json = json.dumps(msg_json_double)  # 转为字符串
            msg_json = json.loads(msg_json_double)  # 转为json
            print(msg_json)
            # todo socket传递到前端
            # todo 进入消息队列的次序是不对，所以，需要根据时间排序才可能真的使用
            # 如果是新闻，直接update到news表里面
            # todo
            print("msg_json:", msg_json)

            if collection_name == 'broadcasts':
                pass
        # update_news(msg_json, collection_name)
