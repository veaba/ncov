from pykafka import KafkaClient
from kafka import KafkaConsumer
from kafka import KafkaProducer
import kafka
import time


def kafka_app():
    print('kafka try connected')
    # kafka_product()
    kafka_consumer()
    # pykafka_consumer()


# kafka 生产者
def kafka_product():
    print('将产生一条消息')
    producer = KafkaProducer(bootstrap_servers="localhost:9092")  # 创建生产者实例
    while True:
        current = time.time()
        message = "welcome to %s" % current
        print(message)
        producer.send("test", value=message.encode(), partition=2)  # 发送消息，指定topic和partition
        time.sleep(10)


# kafka 消费者
def kafka_consumer():
    # print('将消费一条消息')
    # consumer = KafkaConsumer(bootstrap_servers="localhost:9092", group_id="my")  # 创建消费者实例，并指定group id
    # consumer.assign([kafka.TopicPartition("hello-kafka-test", 100)])  # 订阅“test” topic下的partition 2消息，
    # # consumer.assign([kafka.TopicPartition("hello-kafka-test", 2)])  # 订阅“test” topic下的partition 2消息，
    # # 阻塞进程，从消费者不断拉取消息
    # for msg in consumer:
    #     recv = "%s:%d:%d: key=%s value=%s" % (
    #         msg.topic, msg.partition, msg.offset, msg.key, msg.value)  # 打印消息的topic、partition、offset及其他元信息
    #     print(recv)
    client = KafkaClient(zookeeper_hosts='127.0.0.1:9092')
    topic = client.topics['hello-kafka-test']

    with topic.get_sync_producer() as producer:
        producer.produce('hello-kafka-test')


def pykafka_consumer():
    client = KafkaClient(hosts="127.0.0.1:9092")
    print(client)


if __name__ == '__main__':
    kafka_app()
