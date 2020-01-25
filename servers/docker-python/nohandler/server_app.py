from aiohttp import web
import socketio
from nohandler.socket_app import socket_app

sio = socketio.AsyncServer(cors_allowed_origins='*')
app = web.Application()
sio.attach(app)


async def index(request):
    return web.Response(text="Hello Python socket.io", content_type="text/html")


# 连接消息
@sio.event
def connect(sid, environ):
    print('connect_sid', sid)
    print('connect_environ', environ)


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
    print('disconnect: ', sid)


async def background_task():
    count = 0
    while True:
        await sio.sleep(3)
        count += 1
        x = {'data': 'sd'}
        await sio.emit('my_response', x)


app.router.add_get('/', index)


async def xx():
    while True:
        await sio.sleep(2)
        await sio.emit('my_response', {'x': 44})


async def socket_emit(x=None, o=None):
    print(x)
    # sio.emit('my_response', {'data': 'dsads'})
    await sio.start_background_task(xx)


def server_app(application):
    sio.start_background_task(background_task)
    sio.start_background_task(socket_app, socket_emit)
    web.run_app(application)


# We kick off our server
if __name__ == '__main__':
    server_app(app)
