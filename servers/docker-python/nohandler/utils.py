# 工具类库函数
import time
import threading


# 定时器 多线程执行函数
class SetTimeInterval(threading.Thread):
    def __init__(self, fn=None, second=1, clear=False):
        threading.Thread.__init__(self)
        self.fn = fn
        self.second = second
        self.clear = clear

    def run(self):
        while True:
            if self.clear:
                break
            time.sleep(self.second)
            self.fn()
