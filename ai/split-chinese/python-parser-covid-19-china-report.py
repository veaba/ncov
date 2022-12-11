# 使用Python 脚本解析新冠疫情报告并得出响应的统计字段数据
# todo 匹配相似度，判断这段讲什么内容，从而调用不同的解析函数来完成，不过事先需要知道这有多少段
import jieba
from gensim 