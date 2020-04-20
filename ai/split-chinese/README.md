# 中文分词

> 将国家卫建委每日发布的消息转为可用数据

## 参考项目

- [gensim词向量Word2Vec安装及《庆余年》中文短文本相似度计算 | CSDN博文精选](https://blog.csdn.net/dQCFKyQDXYm3F8rB0/article/details/103740473)

- [gensim词向量Word2Vec](https://blog.csdn.net/Yellow_python/article/details/84347878)

- [Python程序写诗【训练1分钟】古诗生成](https://blog.csdn.net/Yellow_python/article/details/86726619)

- [新型冠状病毒肺炎疫情防控 > 疫情通报](http://www.nhc.gov.cn/xcs/yqtb/list_gzbd.shtml)

- [word2vec 构建中文词向量](https://www.cnblogs.com/Newsteinwell/p/6034747.html)

- [使用tensorflow实现word2vec中文词向量的训练](https://zhuanlan.zhihu.com/p/28979653)

- [利用word2vec对关键词进行聚类](https://blog.csdn.net/zhaoxinfan/article/details/11069485)

## gensim词向量Word2Vec 计算 卫健委

## 生成requirements

> python freeze > requirements.txt 


## jieba 

### 取到jieba的词性代码
```python 

import jieba.posseg as psg
string ="""
　4月12日0—24时，31个省（自治区、直辖市）和新疆生产建设兵团报告新增确诊病例108例，其中98例为境外输入病例，10例为本土病例（黑龙江7例，广东3例）；新增死亡病例2例（湖北2例）；新增疑似病例6例，均为境外输入病例（黑龙江4例，上海2例）。
　　当日新增治愈出院病例88例，解除医学观察的密切接触者1092人，重症病例减少18例。
　　境外输入现有确诊病例867例（含重症病例38例），现有疑似病例72例。累计确诊病例1378例，累计治愈出院病例511例，无死亡病例。
　　截至4月12日24时，据31个省（自治区、直辖市）和新疆生产建设兵团报告，现有确诊病例1156例（其中重症病例121例），累计治愈出院病例77663例，累计死亡病例3341例，累计报告确诊病例82160例，现有疑似病例72例。累计追踪到密切接触者719908人，尚在医学观察的密切接触者9655人。
　　湖北无新增确诊病例，新增治愈出院病例57例（武汉57例），新增死亡病例2例（武汉2例），现有确诊病例244例（武汉243例），其中重症病例75例（武汉74例）。累计治愈出院病例64338例（武汉47186例），累计死亡病例3221例（武汉2579例），累计确诊病例67803例（武汉50008例）。无新增疑似病例，无现有疑似病例。
　　31个省（自治区、直辖市）和新疆生产建设兵团报告新增无症状感染者61例，其中境外输入无症状感染者12例；当日转为确诊病例28例（境外输入28例）；当日解除医学观察55例（境外输入9例）；尚在医学观察无症状感染者1064例（境外输入307例）。
　　累计收到港澳台地区通报确诊病例1437例：香港特别行政区1004例（出院360例，死亡4例），澳门特别行政区45例（出院13例），台湾地区388例（出院109例，死亡6例）。

"""
seg_list=psg.cut(string)

for i in seg_list:
    print("==>",type(i),i)

```

### 中文词性

<table>
<tbody>
    <tr>
        <th>代码</td>
        <th>词汇类型</td>
        <th>描述</td>
    </tr>
    <tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">Ag</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">形语素</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">形容词性语素。形容词代码为 a，语素代码ｇ前面置以A。</p>
			</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">a</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">形容词</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">取英语形容词 adjective的第1个字母。</p>
			</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">ad</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">副形词</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">直接作状语的形容词。形容词代码&nbsp;a和副词代码d并在一起。</p>
			</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">an</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">名形词</p>
			</td>
			<td style="border-color:#c0c0c0;">具有名词功能的形容词。形容词代码 a和名词代码n并在一起。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">b</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">区别词</p>
			</td>
			<td style="border-color:#c0c0c0;">取汉字“别”的声母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">c</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">连词</p>
			</td>
			<td style="border-color:#c0c0c0;">取英语连词 conjunction的第1个字母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p>dg</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">副语素</p>
			</td>
			<td style="border-color:#c0c0c0;">副词性语素。副词代码为 d，语素代码ｇ前面置以D。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">d</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">副词</p>
			</td>
			<td style="border-color:#c0c0c0;">取 adverb的第2个字母，因其第1个字母已用于形容词。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">e</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">叹词</p>
			</td>
			<td style="border-color:#c0c0c0;">取英语叹词 exclamation的第1个字母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">f</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">方位词</p>
			</td>
			<td style="border-color:#c0c0c0;">取汉字“方”</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">g</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">语素</p>
			</td>
			<td style="border-color:#c0c0c0;">绝大多数语素都能作为合成词的“词根”，取汉字“根”的声母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">h</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">前接成分</p>
			</td>
			<td style="border-color:#c0c0c0;">取英语 head的第1个字母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">i</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">成语</p>
			</td>
			<td style="border-color:#c0c0c0;">取英语成语 idiom的第1个字母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">j</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">简称略语</p>
			</td>
			<td style="border-color:#c0c0c0;">取汉字“简”的声母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">k</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">后接成分</p>
			</td>
			<td style="border-color:#c0c0c0;">&nbsp;</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">l</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">习用语</p>
			</td>
			<td style="border-color:#c0c0c0;">习用语尚未成为成语，有点“临时性”，取“临”的声母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">m</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">数词</p>
			</td>
			<td style="border-color:#c0c0c0;">取英语 numeral的第3个字母，n，u已有他用。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">Ng</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">名语素</p>
			</td>
			<td style="border-color:#c0c0c0;">名词性语素。名词代码为 n，语素代码ｇ前面置以N。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">n</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">名词</p>
			</td>
			<td style="border-color:#c0c0c0;">取英语名词 noun的第1个字母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">nr</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">人名</p>
			</td>
			<td style="border-color:#c0c0c0;">名词代码 n和“人(ren)”的声母并在一起。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">ns</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">地名</p>
			</td>
			<td style="border-color:#c0c0c0;">名词代码 n和处所词代码s并在一起。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">nt</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">机构团体</p>
			</td>
			<td style="border-color:#c0c0c0;">“团”的声母为 t，名词代码n和t并在一起。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">nz</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">其他专名</p>
			</td>
			<td style="border-color:#c0c0c0;">“专”的声母的第 1个字母为z，名词代码n和z并在一起。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">o</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">拟声词</p>
			</td>
			<td style="border-color:#c0c0c0;">取英语拟声词 onomatopoeia的第1个字母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">p</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">介词</p>
			</td>
			<td style="border-color:#c0c0c0;">取英语介词 prepositional的第1个字母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">q</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">量词</p>
			</td>
			<td style="border-color:#c0c0c0;">取英语 quantity的第1个字母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">r</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">代词</p>
			</td>
			<td style="border-color:#c0c0c0;">取英语代词 pronoun的第2个字母,因p已用于介词。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">s</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">处所词</p>
			</td>
			<td style="border-color:#c0c0c0;">取英语 space的第1个字母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">tg</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">时语素</p>
			</td>
			<td style="border-color:#c0c0c0;">时间词性语素。时间词代码为 t,在语素的代码g前面置以T。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">t</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">时间词</p>
			</td>
			<td style="border-color:#c0c0c0;">取英语 time的第1个字母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">u</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">助词</p>
			</td>
			<td style="border-color:#c0c0c0;">取英语助词 auxiliary</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">vg</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">动语素</p>
			</td>
			<td style="border-color:#c0c0c0;">动词性语素。动词代码为 v。在语素的代码g前面置以V。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">v</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">动词</p>
			</td>
			<td style="border-color:#c0c0c0;">取英语动词 verb的第一个字母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">vd</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">副动词</p>
			</td>
			<td style="border-color:#c0c0c0;">直接作状语的动词。动词和副词的代码并在一起。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">vn</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">名动词</p>
			</td>
			<td style="border-color:#c0c0c0;">指具有名词功能的动词。动词和名词的代码并在一起。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">w</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">标点符号</p>
			</td>
			<td style="border-color:#c0c0c0;">&nbsp;</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">x</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">非语素字</p>
			</td>
			<td style="border-color:#c0c0c0;">非语素字只是一个符号，字母 x通常用于代表未知数、符号。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">y</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">语气词</p>
			</td>
			<td style="border-color:#c0c0c0;">取汉字“语”的声母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">z</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">状态词</p>
			</td>
			<td style="border-color:#c0c0c0;">取汉字“状”的声母的前一个字母。</td>
		</tr><tr><td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">un</p>
			</td>
			<td style="border-color:#c0c0c0;">
			<p style="margin-left:10px;">未知词</p>
			</td>
			<td style="border-color:#c0c0c0;">不可识别词及用户自定义词组。取英文Unkonwn首两个字母。(非北大标准，CSW分词中定义)</td>
		</tr></tbody></table>