# Markdown

标题 Headings：
# 标题 1 
## 标题 2 
### 标题 3
#### 标题 4
##### 标题 5
###### 标题 6 (对应HTML中的标签)

**注意：标题与#之间要留一个空格** 

段落 Paragraph ：
两段文字之间至少要留有一个空行（one or more blank lines）

字体 Styling Text：
斜体： *This text will be italic*  （对应HTML中的标签）
粗体：**This text will be bold** （对应HTML中的标签）

列表 Lists：
无序号的列表 Unordered Lists
* item 
* item
或者
- item
- item
注意： *和-要与列表内容之间要有空格， *是实心的圆点，-是空心的圆点

有序号的列表 Ordered List:s
1. item
2. item
注意： 列表序号与列表内容之间要有空格

嵌套的列表 Nested Lists:
1. item
  1.1 item
  1.2 item
注意： 嵌套列表要缩进2个空格  indenting list items by two spaces

引用 Blockquotes：
引用文字前填加 > （indicate blockquotes with a >）
> 引用文本


代码快 Code Block
To produce a code block in Markdown, simply indent every line of the block by at least 4 spaces or 1 tab.
在每行代码前，使用4个空格或者tab缩进。
例如：
# Title
    if x > y:
        print x
        
链接 Links：
把链接文字放在中括号[]中，把对应的URL放到小括号()中。（wrapping link text in brackets [ ], and then wrapping the link in parenthesis ( ) ）.
[Sina Blog](blog.sina.com.cn)

参考URL：
1. https://help.github.com/articles/markdown-basics
2. http://zhangchi.de/post/intro-to-markdown.html