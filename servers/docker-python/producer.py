from kafka import KafkaProducer
from config import KAFKA_HOST, KAFKA_NEWS_TOPIC
from topic_kafka import create_topic


# 生产者
def kafka_producer(json, topic_key):
    if not topic_key:
        return RuntimeError('topic_key')
    # 使用kafka
    producer = KafkaProducer(
        bootstrap_servers=[KAFKA_HOST],
        api_version=(0, 10, 1)
    )
    str_json = str(json)
    bytes_json = bytes(str_json, encoding='utf-8')
    producer.send(topic_key, bytes_json)
    producer.close()


if __name__ == '__main__':
    create_topic(KAFKA_NEWS_TOPIC)  # 创建topic
    kafka_producer({}, KAFKA_NEWS_TOPIC)
