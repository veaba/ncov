# import time
# import asyncio
#
#
# # 定义异步函数
# async def hello1(x):
#     await asyncio.sleep(1)
#     print(x, time.time())
#
#
# async def hello2(o):
#     await asyncio.sleep(1)
#     print(o, time.time())
#
#
# async def hello3(o):
#     await asyncio.sleep(1)
#     print(o, time.time())
#
#
# def run():
#     # while True:
#     for i in range(10):
#         loop.run_until_complete(hello1(11))
#         loop.run_until_complete(hello1(22))
#         loop.run_until_complete(hello1(33))
#
#
# loop = asyncio.get_event_loop()
# if __name__ == '__main__':
#     run()


import time
import asyncio


# 定义异步函数
async def hello():
    await asyncio.sleep(1)
    print('Hello World:%s' % time.time())


def hello1():
    time.sleep(1)
    print('dx %s' % time.time())


def run():
    for i in range(5):
        loop.run_until_complete(hello())
        loop.run_until_complete(hello1())  # 这个会错误


loop = asyncio.get_event_loop()
if __name__ == '__main__':
    run()
