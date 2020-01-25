import json
import socketio
from aiohttp import web
# from socket_app import socket_app
from mongo import update_news, query_list

sio = socketio.AsyncServer(cors_allowed_origins='*')
app = web.Application()
sio.attach(app)


async def index(request):
    return web.Response(text="Hello Python socket.io", content_type="text/html")


# 连接消息
@sio.event
def connect(sid, environ):
    pass
    # print('connect_sid', sid)
    # print('connect_environ', environ)


# 全局性
# @sio.on('message')
# async def print_message(sid, message):
#     # When we receive a new event of type
#     # 'message' through a socket.io connection
#     # we print the socket ID and the message
#     print("Socket ID: ", sid)
#     print(111, message)

@sio.on('hello')
async def print_hello(sid, message):
    print(222, message)
    # time.sleep(2)
    # await sio.emit('my_message', {'response': '哈哈收到了'})  # 这样可以，怎么可以主动发送呢


# todo broadcast 广播消息
@sio.event
async def emit_broadcast():
    data = "服务发来的消息"
    print('消息被执行')
    await sio.emit('broadcast', {'xxx': data})


@sio.event
async def my_broadcast_event(sid, message):
    print(3333, sid, message)
    # await sio.emit('my_response', {'data': message['data']})


# todo 微博消息
# We bind our aiohttp endpoint to our app
# router
# 断开连接
@sio.event
def disconnect(sid):
    pass
    # print('disconnect: ', sid)


async def background_task():
    while True:
        # 每一分钟读取数据库,前20条，并打标记，过滤打非标记，再入库
        await sio.sleep(5)
        news_list = query_list('broadcast')
        # 广播的数据
        broadcast_list = [item for item in json.loads(news_list) if 'is_read' not in item]
        await sio.emit('my_response', {'code': 0, 'data': broadcast_list})
        for item in broadcast_list:
            print(item)
            # item['_id'] = item['_id']['$oid']
            del item['_id']
            item['is_read'] = 1
            print('1111=>',item)
            update_news(item, 'broadcast')


app.router.add_get('/', index)


async def xx():
    while True:
        await sio.sleep(2)
        await sio.emit('my_response', {'x': 44})


def server_app(application):
    sio.start_background_task(background_task)
    web.run_app(application)


# We kick off our server
if __name__ == '__main__':
    server_app(app)
