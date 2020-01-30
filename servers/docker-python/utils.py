# 工具类库函数
import re
import time
import datetime


# M站微博时间解析工具，这个时间会和时间有点误差，大约在1分钟以内
def parser_weibo_time(time_str):
    now_time = time.time()
    now_timestamp = int(round(now_time * 1000))
    now_hour = datetime.datetime.now().strftime('%H')
    now_minute = datetime.datetime.now().strftime('%M')
    if time_str == '刚刚':
        return now_timestamp
    elif re.search(r'分钟', time_str):
        # 50分钟前
        minute = re.match(r'\d+', time_str).group()
        minute_timestamp = int(minute) * 60 * 1000
        return now_timestamp - minute_timestamp
    elif re.search(r'小时', time_str):
        # 1小时前
        hour = re.match(r'\d+', time_str).group()
        hour_timestamp = int(hour) * 60 * 60 * 1000
        return now_timestamp - hour_timestamp
    elif re.search(r'今天', time_str):
        # 今天 07:50
        remove_today_str = re.sub(r'今天 ', '', time_str)
        hour_minute = remove_today_str.split(':')
        [hour, minute] = hour_minute
        hour_timestamp = int(hour) * 60 * 60 * 1000
        minute_timestamp = int(minute) * 60 * 1000
        zero_timestamp = now_timestamp - int(now_hour) * 3600 * 1000 - int(now_minute) * 60 * 1000
        return zero_timestamp + hour_timestamp + minute_timestamp
    elif re.search(r'昨天', time_str):
        # 昨天 09:00
        remove_today_str = re.sub(r'昨天 ', '', time_str)
        hour_minute = remove_today_str.split(':')
        [hour, minute] = hour_minute
        hour_timestamp = int(hour) * 60 * 60 * 1000
        minute_timestamp = int(minute) * 60 * 1000
        zero_timestamp = now_timestamp - int(now_hour) * 3600 * 1000 - int(now_minute) * 60 * 1000
        yesterday_timestamp = int(zero_timestamp) - (24 * 3600 * 1000)  # 获取昨天凌晨
        return yesterday_timestamp + hour_timestamp + minute_timestamp
    elif re.search(r'(月|日)', time_str):
        # 1月29日08: 15
        time_str = '2019年' + re.sub(r': ', ':', time_str) + ':00'
        # 将其转换为时间数组
        timeArray = time.strptime(time_str, "%Y年%m月%d日%H:%M:%S")
        return int(round(time.mktime(timeArray) * 1000))

    elif re.search(r'-', time_str):
        # 2019-11-3 11:23
        time_str = time_str + ':00'
        # 将其转换为时间数组
        timeArray = time.strptime(time_str, "%Y-%m-%d %H:%M:%S")
        return int(round(time.mktime(timeArray) * 1000))


if __name__ == '__main__':

    arr = ['刚刚', '50分钟前', '1小时前', '今天 07:50', '昨天 09:00', '1月29日08: 15', '2019-11-3 11:23']
    for item in arr:
        if parser_weibo_time(item):
            print(item, parser_weibo_time(item))
