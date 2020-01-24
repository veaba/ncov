# todo爬取关于疫情的微博
# todo 权威媒体：央视微博、人民日报、环球网、澎湃新闻
# todo 省市级 建委:
import re
import math
import time
from selenium import webdriver
from config import CCTV_WEB_URL, KAFKA_NEWS_TOPIC
from producer_kafka import kafka_producer
from topic_kafka import delete_kafka


# 爬取央视网全部页面
# todo 如果入参是setInterval=2，则每x 分钟爬取前两页
def spider_cctv_web(page_url, pre_page=None):
    if not page_url:
        return RuntimeError('请输入页面地址')
    options = webdriver.ChromeOptions()
    options.add_argument("headless")  # 静默
    driver = webdriver.Chrome(options=options)
    driver.get(page_url)
    js = 'location.reload()'
    driver.execute_script(js)

    # 首次确立count
    if not pre_page:
        page_node = driver.find_element_by_css_selector('.lmdhd')
        page_text = page_node.text
        page_count_all = re.sub(r'[^\d]', '', page_text)
        page_count = math.ceil(int(page_count_all) / 10)
        # 央妈不支持超过30page的查询
        if page_count > 30:
            page_count = 30
        driver.quit()
    else:
        page_count = pre_page
    for page in range(page_count, -1, -1):
        spider_cctv_web_single(page)


def spider_cctv_web_single(page):
    page_url = CCTV_WEB_URL + '&page=' + str(page + 1)
    if not page_url:
        return
    options = webdriver.ChromeOptions()
    options.add_argument("headless")  # 静默
    driver = webdriver.Chrome(options=options)
    driver.get(page_url)
    js = 'location.reload()'
    driver.execute_script(js)
    newsNodeList = driver.find_elements_by_css_selector('.image')
    for news in newsNodeList:
        if news:
            news_url = news.find_element_by_css_selector('a').get_attribute('href')
            news_url = re.findall(r'targetpage=(.*?)&point', news_url)
            news_url = news_url[0]
            create_time = news.find_element_by_css_selector('.tim').text
            create_time = re.sub(r'发(.+?)：', '', create_time)
            ob = {
                'title': news.find_element_by_css_selector('.tit').text,  # 标题
                'create_time': create_time,  # 发布时间
                'chanel': '央视新闻',  # 来源
                'news_url': news_url,  # 新闻地址
                'desc': news.find_element_by_css_selector('.bre').text,  # 描述
            }
            print('爬取的数据，准备写kafka', ob)
            kafka_producer(ob, KAFKA_NEWS_TOPIC)
    driver.quit()


if __name__ == '__main__':
    delete_kafka(KAFKA_NEWS_TOPIC)  # 先删除topic
    spider_cctv_web(CCTV_WEB_URL)  # 先执行全部，再执行定时器部分
    while True:
        spider_cctv_web(CCTV_WEB_URL, pre_page=2)
        print('定时器===', time.time())
        time.sleep(2 * 60)  # 2*60
