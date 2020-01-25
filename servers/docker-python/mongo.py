# 连接mongo数据库
import pymongo
from config import MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD, MONGO_AUTH_MECHAISM, MONGO_DB
import json
from bson import json_util, son


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
# 表格名称
def update_news(query, collection_name):
    print(type(query))
    print(22, query)
    db = mongo_connect()
    result = db[collection_name].update_one(query, {'$set': query}, upsert=True)


# 插入一条数据
def insert_news(query, collection_name):
    db = mongo_connect()
    result = db[collection_name].insert_one(query)


def delete_news():
    pass


def get_param():
    pass


def query_collection_list():
    db = mongo_connect()
    # 查询所有文本
    print(db.list_collection_names())


def query_list(name):
    db = mongo_connect()
    collection = db[name]
    # count = collection.estimated_document_count()  # 长度   print(count)
    data_list = collection.find().limit(20)
    return json_util.dumps(data_list)


if __name__ == '__main__':
    x = query_list('hellos')
    print(x)
    # update_news({'name': '哈哈'}, 'hellos')
    # for item in x:
    #     # print(son.SON(item))
    #     update_news(item, 'hellos')
    update_news({"_id": {"$oid": "5e2c249972e0bd5acd1218b0"}, "name": "\u54c8\u54c8"},'hellos')
