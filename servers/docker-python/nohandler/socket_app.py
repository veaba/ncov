# 暂时无法使用
from pykafka import KafkaClient
from config import KAFKA_HOST, KAFKA_NEWS_TOPIC, KAFKA_HOT_TOPIC
from mongo import update_news
import json
import time
import threading
from concurrent.futures import ThreadPoolExecutor


def test():
    # socket_emit()
    pass


# 消费者,collection_mame
async def kafka_consumer(topic_key, collection_name, socket_emit):
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
            # print("msg_json:", msg_json)
            update_news(msg_json, collection_name)
            await socket_emit('my_response', msg_json)
            # pool.submit(socket_emit, "my_response", msg_json)
            # if collection_name == 'news':
            #     print(collection_name)
            #     update_news(msg_json, collection_name)
            # # 将新闻更新到广播表里面

            if collection_name == 'broadcasts':
                pass
        # update_news(msg_json, collection_name)


def socket_app(socket_emit):
    print(time.time())
    # await kafka_consumer(KAFKA_NEWS_TOPIC, 'news', socket_emit)
    threads_list = [
        # threading.Thread(target=kafka_consumer, args=(KAFKA_NEWS_TOPIC, 'news')),
        threading.Thread(target=kafka_consumer, args=(KAFKA_NEWS_TOPIC, 'news', socket_emit)),
    ]
    # socket_emit(65)
    for t in threads_list:
        t.start()


if __name__ == '__main__':
    # kafka_consumer(KAFKA_NEWS_TOPIC, 'news')
    test()
    pass
