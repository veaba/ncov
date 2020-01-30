# todo爬取关于疫情的微博
# todo 权威媒体：央视微博、人民日报、环球网、澎湃新闻
# todo 省市级 建委:
import re
import time
from selenium import webdriver
from config import CCTV_WEB_URL, CCTV_M_WEIBO_URL
from mongo import update_news, fond_one
from utils import parser_weibo_time
import threading
import platform


def spider_cctv_web_single(page):
    page_url = CCTV_WEB_URL + '&page=' + str(page + 1)
    options = webdriver.ChromeOptions()
    if platform.system().lower() == 'windows':
        options = webdriver.ChromeOptions()
        options.add_argument("headless")  # 静默
        driver = webdriver.Chrome(options=options)
    else:
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        driver = webdriver.Chrome(options=options, executable_path='chromedriver')
    driver.get(page_url)
    print('获取页面CCTV新闻==>')
    time.sleep(2)
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
                "title": news.find_element_by_css_selector('.tit').text,  # 标题
                "create_time": create_time,  # 发布时间
                "channel": "央视新闻",  # 来源
                "newsUrl": news_url,  # 新闻地址
                "desc": news.find_element_by_css_selector('.bre').text,  # 描述
            }
            # print('爬取的数据，准备写入数据库', ob)
            msg_json = ob
            # 广播新闻,热门
            if re.match(r'增加|新增|确诊|首例|死亡|首|', ob['title']):
                if not fond_one({'title': ob['title']}, 'broadcasts'):
                    update_news(msg_json, 'broadcasts')
            if not fond_one({'title': ob['title']}, 'news'):
                update_news(msg_json, 'news')
    driver.quit()


# 爬取 微博相关疫情地图,m站

def spider_weibo_web(page_url):
    print('爬取微博==>')
    options = webdriver.ChromeOptions()
    if platform.system().lower() == 'windows':
        options = webdriver.ChromeOptions()
        options.add_argument("headless")  # 静默
        driver = webdriver.Chrome(options=options)
    else:
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        driver = webdriver.Chrome(options=options, executable_path='chromedriver')
    driver.get(page_url)
    time.sleep(2)
    panel_nodes = driver.find_elements_by_css_selector('.card.m-panel.card9')
    # 放弃M站，是无法获取微博地址
    for feed_node in panel_nodes:
        if feed_node.find_element_by_css_selector('.weibo-text'):
            all_text_node = feed_node.find_element_by_css_selector('.weibo-text')
            all_text = all_text_node.text
            if re.match(r'#疫情联防联控实时播报#', all_text):
                create_time = feed_node.find_element_by_css_selector('.time').text
                news_url = 'https://m.weibo.cn/u/2656274875'
                # print('属于疫情播报', create_time, news_url, all_text)
                title = re.search(r'【(.+?)】', all_text)
                if title:
                    title = title.group()
                weibo_json = {
                    "title": title.replace('#', ''),
                    "create_time": parser_weibo_time(create_time),  # 发布时间
                    "channel": "央视新闻微博",  # 来源
                    "newsUrl": news_url,  # 新闻地址
                    "desc": all_text
                }
                if not fond_one({'title': weibo_json['title'], 'newsUrl': weibo_json['newsUrl'], 'pass': True},
                                'weibos'):
                    # print('微博数据', weibo_json)
                    update_news(weibo_json, 'weibos')
    driver.quit()


# 3分钟爬取一次cctv
def always_spider_cctv():
    for page in range(30, -1, -1):
        spider_cctv_web_single(page)
    while True:
        for page in range(2):
            spider_cctv_web_single(page)
        time.sleep(3 * 60)  # 2*60


# 一分钟爬取一次微博消息
def always_spider_cctv_weibo():
    while True:
        spider_weibo_web(CCTV_M_WEIBO_URL)
        time.sleep(60)


# 运行爬虫+写入数据库
def spider_app():
    # CCTV 新闻
    # spider_cctv_web(CCTV_WEB_URL)  # 先执行全部，再执行定时器部分
    # while True:
    #     spider_cctv_web(CCTV_WEB_URL, pre_page=1)
    #     time.sleep(3 * 60)  # 2*60

    # 央视新闻微博
    # spider_weibo_web(WEIBO_CCTV_WEB)
    # spider_weibo_web(CCTV_M_WEIBO_URL)

    threads = [
        # threading.Thread(target=spider_cctv_web, args=(CCTV_WEB_URL,)),
        threading.Thread(target=always_spider_cctv),
        threading.Thread(target=always_spider_cctv_weibo)
    ]
    for t in threads:
        t.start()


if __name__ == '__main__':
    spider_app()
