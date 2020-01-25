from config import KAFKA_NEWS_TOPIC, KAFKA_HOST,KAFKA_HOT_TOPIC
from kafka import KafkaAdminClient


# 删除一个topic
def delete_kafka(topic_name):
    adminClient = KafkaAdminClient(
        bootstrap_servers=[KAFKA_HOST],
    )
    adminClient.delete_topics(topics=[topic_name])


# 创建一个topic
def create_topic(topic_name):
    adminClient = KafkaAdminClient(
        bootstrap_servers=[KAFKA_HOST],
    )
    print(topic_name)
    adminClient.create_topics(topic_name)


if __name__ == '__main__':
    delete_kafka('KAFKA_NEWS_TOPIC')  # 先删除topic
    # delete_kafka(KAFKA_HOT_TOPIC)  # 先删除topic
    # create_topic('KAFKA_N2_TOPIC')
    # create_topic(KAFKA_HOT_TOPIC)
