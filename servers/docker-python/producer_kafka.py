from kafka import KafkaProducer
from config import KAFKA_HOST
import time

producer= KafkaProducer(
    bootstrap_servers=[KAFKA_HOST],
    api_version=(0, 10, 1)
)

while True:
    
    msg=bytes(str(time.time()),encoding='utf-8')
    producer.send('hello-kafka-test',msg)
    time.sleep(2)

