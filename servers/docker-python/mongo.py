# 连接mongo数据库
import pymongo
from config import MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD, MONGO_AUTH_MECHAISM, MONGO_DB
import json


def mongo_connect():
    client = pymongo.MongoClient(
        host=MONGO_IP,
        port=MONGO_PORT,
        username=MONGO_USER,
        password=MONGO_PASSWORD,
        authSource=MONGO_DB,
        authMechanism=MONGO_AUTH_MECHAISM
    )
    return client[MONGO_DB]


def mongo_news():
    pass


def save_news():
    pass


# 可以更新一条不重复的数据
# query json字符串
def update_news(query, name):
    db = mongo_connect()
    result = db[name].update_one(query, {'$set': query}, upsert=True)


# 插入一条数据
def insert_news(query, name):
    db = mongo_connect()
    result = db[name].insert_one(query)


def delete_news():
    pass


def get_param():
    pass


def query_collection_list():
    db = mongo_connect()
    # 查询所有文本
    print(db.list_collection_names())


def query_list(name):
    client = mongo_connect()
    print(client)
    db = client[MONGO_DB]
    # 查询所有文本
    collection = db[name]
    for item in collection.find():
        print(item)


if __name__ == '__main__':
    # query_list('news')
    update_news({'name': '哈哈'}, 'news')
