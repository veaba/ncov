from server_app import server_app
from spider_app import spider_app
from socket_app import socket_app
from config import KAFKA_NEWS_TOPIC, KAFKA_HOT_TOPIC
import threading


def async_app():
    server_app()
    threads = [
        # threading.Thread(target=server_app),
        threading.Thread(target=spider_app),
        threading.Thread(target=socket_app),
        # threading.Thread(target=kafka_consumer, args=(KAFKA_HOT_TOPIC, 'broadcasts',)),
    ]

    for t in threads:
        t.start()


if __name__ == '__main__':
    async_app()
