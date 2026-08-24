---
title: "Chrome插件 - TMI to GCal - 腾讯会议邀请导入 Google 日历"
date: "2026-08-23"
slug: "/2026-08-23-tmi-to-gcal"
---

做这个插件最直接的原因，其实就是我自己有这个需求。

虽然我目前的主力手机是 iPhone，但我个人的工作电脑还是windows，为了我的日程安排和提醒可以在各个平台上同步，我一直把 Google 日历作为自己的主要日历服务。

在在线会议这件事上，Zoom 对 Google 日历的支持其实已经比较完善，创建会议时可以很方便地把会议日程添加到 Google 日历。但腾讯会议目前并没有提供直接导入 Google 日历的功能。

腾讯会议本身倒是提供了 CalDAV 和 Exchange 两种日历同步方式，只不过实际使用起来都有一些限制。CalDAV 目前主要适用于 macOS 和 iOS，在 Windows 上并没有一个足够方便的使用方式；而 Exchange 这条路，随着微软近年来对新版 Outlook 的调整，也已经无法像以前那样通过 Outlook 间接同步 Google 日历。

这样一来，如果主要在 Windows 上使用腾讯会议，同时又把 Google 日历作为自己的主日历，似乎已经没有一个足够简单、直接的同步方案了。

于是我想了下就剩下一个比较迂回的方案，利用腾讯会议的邀请信息，在浏览器上用插件进行解析来把会议添加到Google日历的方案。

用GPT搜索了一下发现还没有类似的工具来做这个，就让它直接vibe一个好了。

项目repo和使用方法：
[![GitHub](https://img.shields.io/badge/github-tmi--to--gcal-red?logo=github)](https://github.com/ReiiNoki/tmi-to-gcal)

希望可以帮助到和我一样有需要的朋友！
