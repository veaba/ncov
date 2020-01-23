from pykafka import KafkaClient
from config import KAFKA_HOST


client=KafkaClient(hosts=KAFKA_HOST)

topic=client.topics['hello-kafka-test']

consumer=topic.get_simple_consumer(consumer_group="hello-kafka-test",reset_offset_on_start=True)

for msg in consumer:
    if msg is not None:
        print(dir(msg))
        print(msg.value)
        print(msg.timestamp)
        print(str(msg.value,encoding='utf-8'))
