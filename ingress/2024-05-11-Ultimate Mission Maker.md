---
layout: page
permalink: /ingress/2024-05-11.html
title: 基于 Ultimate Mission Maker 的组图任务申请教程
---

## 基于 Ultimate Mission Maker 的组图任务申请教程

这个IITC上的任务申请插件已经上线很久了居然没人写过教程，北蓝甚至也没介绍过就顺便写一个教程介绍一下这个插件吧。

### 1. 工具准备

- Chrome或Edge等可以使用篡改猴（Tampermonkey）插件的浏览器
- IITC，没用过的同学可以查阅北蓝之前的教程：[IITC （Ingress Intel Total Conversion）教程](https://mp.weixin.qq.com/s/zg-jimo8uBjUvfcI5iTfeQ)
- [Ultimate Mission Maker](https://umm.8bitnoise.rocks/) 插件，点击链接下载，下载后重启IITC地图生效。

### 2. 界面简介

在个人ID下面会出现一个UMM Opt的新按钮，按下即会出现工具的界面。

![UMM插件按钮位置](/ingress/2024-05-11/image001.png)

工具的主界面如下

![UMM主界面](/ingress/2024-05-11/image002.png)

左上角是任务路线选择和各个任务的路线切换工具

![任务路线切换工具](/ingress/2024-05-11/image004.png)

### 3. 使用方法

#### 任务标题和描述编辑

在主界面按下Edit banner details

![Edit banner details按钮](/ingress/2024-05-11/image003.png)

在这里可以编辑任务系列名，任务介绍，任务数量和各个任务的标题格式，编辑后最下方会生成给定格式的任务名预览。

![任务标题格式编辑界面](/ingress/2024-05-11/image005.png)

其中，符号T表示任务名，NN和N分别表示有无前导0的任务编号，M表示任务总数。

例如我在格式中填写的 T N-M，可以得到Hello 1-12这样的系列任务名。

编辑后按下save保存。

#### 任务路线编辑

这里就需要使用左上角的任务路线编辑工具了。

![任务路线编辑工具](/ingress/2024-05-11/image006.png)

只要在地图上选po就可以编辑任务路线，例如我现在这个是任务1，路线有7个po那工具上就会显示1和P7，按下 >>| 或 |<< 按钮可以切换编辑中的任务。

如果想要规划较长路线的组图，可以在地图上直接选取一个长路线，在主界面中选择Split mission

![Split mission功能](/ingress/2024-05-11/image007.png)

填入任务长度就可以分割成对应数量的任务了。

如果想任务路线进行合并或反转，可以选择主界面的Merge missions或Reverse mission，我没用过就不多介绍了，一般也用不上。

#### 任务数据导入和导出

任务编辑完成后，在主界面按下Export banner data to file可以将任务路线导出为json文件。如果想要对之前的任务进行编辑可以按下"选择文件"来导入json文件进行任务编辑。

### 4. 任务申请

任务图片分割可使用这个工具：[Mission Banner Cropper](https://www.giacintogarcea.com/ingress/tools/missionset/)

进入任务申请网站：[Ingress Mission Creator Tool](https://missions.ingress.com/)

现在网站左上角会有这一个新的导入按钮

![导入按钮位置](/ingress/2024-05-11/image008.png)

点击文件夹按钮导入之前的json文件

在申请主页面点击右上方Create New Mission创建新任务。

在左上方文件夹右侧下拉列表选择想申请的任务，点击Import出现以下通知即可导入任务路线。

![导入成功通知](/ingress/2024-05-11/image009.png)

任务类型分为Sequential(序列完成)和Any Order（任意顺序完成）类型可供选择。如果申请序列型的话，可以打勾设置为隐藏路线的任务（这时需要为其他agent提供线索）。

下一页面的任务标题和描述已经填好了，只需要把任务图标导入即可。

![任务图标导入界面](/ingress/2024-05-11/image012.png)

路线也导入完毕，直接下一步提交即可。

![提交页面](/ingress/2024-05-11/image011.png)

用这个工具唯一的缺点就是任务路线无法使用Field Trip的地点了，不过现在影响也不大。

以上就是基于UMM的组图任务申请教程了。我觉得最方便的地方还是如果你申请一套组图有几个怎么申都申不过的时候，只要给其他agent发一份json文件就可以帮你申请。IITC的po位置也比原生Intel准确得多。希望可以帮助到以后想申请组图的各位！
