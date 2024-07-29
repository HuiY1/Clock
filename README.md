# Clock时钟网使用说明
【清华大学】软件23 张铭宇，软件22 蔡万栩，软件23 杨宇鸿，软件21 马家豪



#### 实验工具

Html5，CSS3，JavaScript，Chorme 126.0.6478.127，Visual Studio Code

#### github网站链接

https://huiy1.github.io/Clock/

#### 实验分工

**概述**  网页可大致分解为如下结构：边栏与整体框架、时钟、闹钟、计时器、秒表。对这些模块进行逐一实现，最后在一个项目中合并，检查并修改可能存在的冲突。

**分工**  蔡万栩--边栏与整体框架；张铭宇--计时器与秒表；杨宇鸿--时钟；马家豪--闹钟。模块合并、测试检查、文档撰写、PPT制作由四人共同完成。



#### 功能与实现

**边栏与整体框架**  可分为顶部导航栏、侧边导航栏、页面内容框。

**顶部导航栏**  采用绝对定位 absolute 标定其在页面上的位置，固定高度、宽度填满页面。内部含有一个 a 标签，居左设置为 float: left，以及一个 button 标签，居右设置为 float: right。a 标签作为 LOGO 链接到页面本身，内部含有两个 p 标签，预设好字体、颜色、宽高，调整 margin 放置到合适位置。button 标签设置 invertColors() 函数，在按钮被点击时反转页面内容框的背景色，以及所有在页面内容中的标签的颜色。button 标签内部放置 SVG，通过绘制上下两个半圆实现一个简易的 UI。

**侧边导航栏**  采用绝对定位 absolute 标定其在页面上的位置，固定宽度、高度减去顶部导航栏的高度后填满页面。侧边导航栏是一个 ul 标签里面含有四个 li 标签，分别表示时钟、闹钟、计时器、秒表四个选项。每个 li 标签中有一个 a 标签，href 内容指向目标的模块的 id，用于页面切换逻辑。

**页面内容框**  采用绝对定位 absolute 标定其在页面上的位置，宽度、高度都减去导航栏的宽高后填满页面。里面含有四个 div，分别是时钟、闹钟、计时器、秒表四个模块。

对于页面内容框中的第 n 个模块，设 id="section_n"，class="content" 。添加 DOMContentLoaded 事件监听器，获取所有 .page-item a 元素（即侧边导航栏中的分页链接）记为 links变量。获取所有 .content 元素（即页面内容框中的四个模块）记为 contents。
为 links 中每个元素都添加点击事件监听器，点击后首先将所有 .content 元素移除 active，此时隐藏了所有的模块。随后根据当前被点击的链接链接到的 id，为目标内容添加 active，使其显示。

特别的，在DOMContentLoaded 事件中，额外使用 if (links.length > 0) 判断是否存在分页链接，如果第一个分页链接存在，调用 links[0].click() 模拟点击第一个链接，触发其点击事件监听器，就做到了页面加载完毕时默认显示了模块1（时钟模块）。



**时钟**  



**闹钟**  

HTML中的输入框和按钮用于用户输入闹钟时间和控制闹钟开关，一个显示器显示当前时间，打开闹钟后会有一个显示器显示闹钟时间。
在JavaScript中，setclock()函数启动闹钟并显示在屏幕上，resetclock()函数清除闹钟。

**计时器**  

HTML中的输入框和按钮用于用户输入时间和控制定时器。
在JavaScript中，startTimer()函数获取用户输入的时间，进行验证并启动定时器；stopTimer()函数停止定时器；resetTimer()函数重置定时器。

**秒表**  

HTML中的显示器和按钮用于控制秒表和显示时间。
在JavaScript中，startStopwatch()函数启动秒表；stopStopwatch()函数停止秒表；resetStopwatch()函数重置秒表和圈数；recordLap()函数记录当前时间并显示在圈数列表中。


#### 使用说明

Clock.main 文件夹中含有 index.html，script.js，styles.css，mixkit-alert-quick-chime-766.wav。用浏览器打开 index.html 即可。

**时钟：**  

**闹钟：**  

输入小时、分钟、秒数。
点击“Set”按钮设置闹钟。
再次点击“Set”按钮重置闹钟。
点击“Reset”按钮清除闹钟。

**定时器：**

输入小时、分钟、秒数。
点击“开始”按钮启动定时器。
点击“停止”按钮停止定时器。
点击“重置”按钮重置定时器。

**秒表：**

点击“开始”按钮启动秒表。
点击“停止”按钮停止秒表。
点击“重置”按钮重置秒表。
点击“圈数”按钮记录当前时间。

#### 问题及解决

1. 时钟与闹钟代码合并后在页面上二者显示的时间不相同。**解决方案：** 查找相关部分的 JS 代码，并将二者更新时间函数统一为一个 updateTime() 函数，这样能够使得不同页面的时间没有错位，且在时钟时间调整后闹钟时间也统一调整。
2. 秒表毫秒显示问题：秒表显示精度为1秒，而不是毫秒。**解决方案：** 将秒表更新时间改为10毫秒，并在formatTime1()函数中添加毫秒部分的显示。



#### 参考资料

SVG + JS 时钟简易教程-CSDN：https://blog.csdn.net/study_way/article/details/133905649

菜鸟教程：https://www.runoob.com/

大模型-ChatGPT：https://chat.openai.com/
