# encoding=utf-8
# Word2Vec是通过深度学习将词表征为数值型向量的工具
# 安装gensim 拓展包

from random import choice
from gensim.models import Word2Vec 

# 生成数据集

ls_of_ls=[
    ["Python","大数据","人工技能","Tensorflow"],
    ["网络安全","Web渗透","SQLMAP","XSL"],
    ["网站开发","HTML","CSS","JavaScript"]
]

ls_of_words=[]

for i in range(1000):
    ls=choice(ls_of_ls) # 随机选择某行数据集
    ls_of_words.append([choice(ls) for _ in range(9,15)])

print("===>",ls_of_words)