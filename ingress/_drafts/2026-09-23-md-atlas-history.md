---
title: "从 777 场 Mission Day 活动数据里，我看到了什么？"
date: "2026-09-23"
slug: "/2026-09-23"
draft: true
tags:
  - Ingress
  - Mission Day
  - Data Archive
  - Data Analysis
  - Open Data
---

前一阵 [MD Atlas](https://reiinoki.dpdns.org/md-atlas/) 上线的时候，我写的还只是一个“能查到活动”的网站：有日期、城市、任务和评分，能翻能筛就算完成。真正开始整理之后才发现，把十几年的 Mission Day 拼成一份可信的历史档案，难点几乎都不在网站，而在数据本身——哪些活动应该收录、一场活动到底算不算 XMA MD、官方日程和实际任务数据冲突时该听谁的。

这篇文章记录的是这轮整理的过程。文中所有数字都来自 2026 年 9 月 22 日的数据快照，只代表当时能够核对到的范围。

## 档案的规模，以及它并不等于“全部 Ingress 任务”

目前维护中的数据包含 **794 个 Banner** 和 **15,419 个任务**。其中被确认是 Mission Day 的是 **777 个 Banner、15,283 个任务**；另外 **17 个 Banner、136 个任务**被隔离为非 Mission Day，不会进入公开档案。

地理上，这批数据覆盖 **77 个国家或地区、587 个城市和 105 个时区**。

之所以要单独隔离非 MD 数据，是因为数据源里本来就不只有 Mission Day。`event_category` 这个字段存在的意义是一道数据安全边界，而不是可有可无的标签：公开网站只发布 `mission_day`，其他类型继续留在维护数据里。

被隔离的 17 个 Banner 大致是这样分布的：

| 子类别 | 数量 | 示例 |
|---|---:|---|
| GORUCK | 4 | Fredericksburg / Knoxville / San Antonio Scavenger Hunt |
| Intel Ops | 2 | Intel Ops Kaohsiung 2019 |
| 品牌合作 | 5 | Star Wars 系列官方任务 |
| 动画合作 | 2 | Fuji Q × Ingress the Animation |
| 其他特殊活动 | 4 | Festival of Lights、SCOOP 等 |

这些数据看起来离 Mission Day 很远，但它们和 Anomaly、NL-1331、First Saturday 属于同一类问题：只要未来还想继续收录其他官方活动，顶层的 `event_category` 分类就不能取消。

## 三种 Mission Day：Standard、Lite 与 XMA MD

在所有 `event_category = mission_day` 的活动里，我又用三个互斥标签做了子分类：

| 标签 | 含义 | 当前数量 |
|---|---|---:|
| `md-xma` | 有可靠日程证据的 XM Anomaly 次日 Mission Day | 222 |
| `md-standard` | 普通或独立的 Mission Day，也是默认类型 | 544 |
| `md-lite` | 官方日程明确标为 Mission Day Lite 的活动 | 11 |
| **合计** | | **777** |

XMA MD 在年份上的分布也很不均匀：

| 年份 | 数量 |
|---|---:|
| 2015 | 6 |
| 2016 | 42 |
| 2017 | 38 |
| 2018 | 26 |
| 2019 | 36 |
| 2022 | 2 |
| 2023 | 27 |
| 2024 | 15 |
| 2025 | 13 |
| 2026 | 17 |

2020、2021 两年没有确认的 XMA MD。

分类本身没有捷径。人工审核的覆盖优先于自动规则；官方 Mission Day 日程里的 `[Anomaly MD]` 和 `Mission Day Lite` 标记最可信；更早的年份只能拿 Anomaly 日期、城市和系列资料去交叉核对。标题或描述里出现系列名只能算辅助证据，任务数量、任务操作类型和标题格式都不能单独决定分类。

这里最容易踩的坑是“恰好排在 Anomaly 次日”。同一天的其他普通 MD 或 Lite 不会连带归为 XMA，一场 Mission Day 也不会仅仅因为时间相邻就自动升级成 `md-xma`。

审核结果保存在 `data-tools/data/banner_classification_overrides.json`，可以用 `data-tools/tools/label_mission_day_types.py` 复现生成。每条 XMA 审核记录都能保存 `xma_series`、`xma_event_date`、`source_url`、`evidence_note` 和 `confidence`——也就是说，一个活动为什么被判定为 XMA，是可以回头查证的。

## XMA 的证据是从哪里来的

2023 年以后的 XMA MD 主要依据 Ingress 官方季度 Mission Day 页面。页面会直接把活动标成 `[Anomaly MD]`，再按日期和城市与本地 Banner 对照即可。这类页面一共用了 13 个，时间跨度从 2023 Q2 到 2026 Q3，例如：

```text
https://ingress.com/news/2023-q2-events
https://ingress.com/news/2023-q4-md
https://ingress.com/news/2026-q3-md
```

涉及的近期系列包括 Echo、Ctrl、Discoverie、Cryptic Memories、Buried Memories、Shared Memories、Erased Memories、+Theta、+Delta，以及 2026 年各季度的 Anomaly。

2022 年只确认了两场同城 Anomaly 次日 MD：

- 2022-07-30 Munich Superposition → 2022-07-31 Munich Mission Day；
- 2022-11-12 Los Angeles Epiphany Dawn → 2022-11-13 Los Angeles Mission Day。

同年 Jacksonville 没有找到足够明确的同城 Kythera 后续 MD 证据，因此一直保留为 `md-standard`，没有靠推测补成 XMA。

2015 到 2019 年的数据则依靠 Ingress Wiki、Fev Games 的历史报道，以及日期和城市交叉核对，覆盖了 Persepolis、Abaddon、Obsidian、Aegis Nova、Via Lux、Via Noir、13MAGNUS Reawakens、EXO5、Cassandra Prime、Recursion Prime、Darsana Prime、Abaddon Prime、Myriad、Umbra 等系列。

反过来说，有几个“日期巧合”被明确排除了：

- 2025-02-23 的 Barcelona 是普通 MD，同一天 Tucson 才是 Anomaly MD；
- 2026-03-22 的 Wörlitz 是 MD Lite，同一天 Hyderabad 和 Buenos Aires 才是 Anomaly MD；
- 2023-03-19 的 Ome 虽然在全球 MZFPK 活动次日，但并不是明确的同城实体 Anomaly 后续 MD。

## 两个边界案例：Sabadell 和 Oban

分类原则说起来简单，落到具体活动上就没那么干净。

**Sabadell** 是目前 11 场 MD Lite 里最特殊的一个。它的 Banner ID 是 `md-2023-sabadell-1334`，日期为 2023-12-23，地点在西班牙 Sabadell。实际数据是：18 个任务全部在线，发布者全部为 `MDNIA`，任务编号完整覆盖 1–18，平均评分约 95.1417%，记录完成次数合计 633。

无论从哪个角度看，它都更像一场标准 Mission Day。但 Ingress 官方 2023 Q4 日程白纸黑字写着：

> 2023-12-23 — Sabadell, Spain (Mission Day Lite)

比较合理的解释只有两种：要么它最初按 Lite 申报、后来才扩充成 18 个任务；要么这条官方日程本身就是误标，而且之后没有发布更正。既然找不到官方更正，档案就仍然按官方日程保留为 `md-lite`，并把它当作特例处理。

这件事说明，Mission Day Lite 更适合理解成一种官方活动标签，而不能只看任务数量自动判断。

**Oban** 则是反方向的例子。`md-2026-oban-2375` 是 2026-09-05 的活动，只有 6 个任务，全部由 `MDNIA03` 发布，发布者阵营为 `ENLIGHTENED`，平均评分 98.1883%，记录完成次数合计 222，作者、评分、距离和时长都完整。任务数量少得和 Lite 名单里的活动一模一样，但官方季度日程没有把它标成 Mission Day Lite，所以它依然是 `md-standard`。

顺带一提，当前 11 场 MD Lite 中，9 场是 6 个任务，Guatapé 是 7 个任务，只有 Sabadell 是 18 个任务。这组数字本身就说明“任务数 = Lite”是不成立的。

## 任务数据里藏着的另一面

活动分类做完之后，我才开始拆任务本身。分析用的是 Bannergress Mission Card 里的 `step_list`，结果比预想的有意思。

在公开 Mission Day 范围内，有 **1,279 个任务**包含 Field Trip Waypoint，分布在 **215 场活动**中，合计 **1,776 个 Field Trip Waypoint**。它不是少数任务里的冷门功能，而是曾经广泛使用的任务元素，现在更像是 Mission 系统早期留下的一层历史切片。当然，这项统计只能说明任务数据里记录了这些 Waypoint，不能说明玩家当时的实际体验，也不能说明这些地点今天是否还可用。

把最常见的 `hack` 和只看地点的 `viewWaypoint` 排除之后，剩下的特殊操作并不多：

| 操作 | 步骤数 | 涉及任务数 |
|---|---:|---:|
| `enterPassphrase` | 1,840 | 1,710 |
| `installMod` | 9 | 8 |
| `createLink` | 3 | 3 |
| `captureOrUpgrade` | 2 | 2 |

输入 Passphrase 是最常见的特殊要求，共有 1,710 个任务包含 1,840 个相关步骤；要求安装 Mod 的只有 8 个任务，Create Link 只有 3 个，Capture or Upgrade 只有 2 个。

15,283 个公开任务里，目前只有一个完全没有 Hack 步骤：

```text
MD 2019: Petaluma, Movie Locations
Mission ID: 8975adad115d49c0a4f3bcf675ea3e51.1c
```

它由 8 个步骤组成：`enterPassphrase` 6 个、`viewWaypoint` 2 个、`hack` 0 个。也就是说，这个任务不是带着玩家依次 Hack Portal，而是靠地点和 Passphrase 推进。它是否是 Ingress 历史上唯一的无 Hack Mission，当前数据回答不了，能够确认的范围只是 MD Atlas 收录的公开 Mission Day 任务。

还有 6 个状态为 `disabled` 的任务，它们的共同特征非常一致：每个任务都是 6 个步骤，而且所有步骤的 `poi_type` 都是 `unavailable`。

| 任务 | 所属活动 |
|---|---|
| MD: Kiel, South Cemetery | MD: Kiel |
| No.1 Yaohan Nextage / 八佰伴商厦 | MD: Shanghai |
| Red Town / 红坊 | MD: Shanghai |
| MDAS: Ft Lauderdale 1 | Mission Day At Sea |
| MD: Ann Arbor, The Cube | MD: Ann Arbor |
| MD: Brasília, Setor Militar Urbano | MD: Brasília |

这很符合“任务所需 Portal 全部消失后任务被下架”的形态，但必须区分数据现象和官方结论：我没有拿到这些任务的官方下架原因说明，只能说它们呈现出这样的共同特征，不能断言 Portal 消失就是唯一原因。上海的两个任务尤其让人感慨，Mission Day 留下的不只是一条路线，有时也间接记录了城市地点的变迁。

## 新加坡 2026：一次典型的补全

补数据的过程也值得记一笔。`md-2026-singapore-f5a2` 是 2026-09-20 的新加坡 Mission Day，类型 `md-xma`。它当时还没有出现在 `onlyOfficialMissions=true` 的 Bannergress 查询结果里，只能先用普通搜索找到它，再按 Banner ID 单独抓取。18 个任务全部在线，并且要等 18/18 个 Intel ID 与 Bannergress 任务 ID 严格对应之后，才允许合并。

最终的数据是：发布者 `NIAMission01`，发布者阵营 `RESISTANCE`，平均评分 91.8556%，记录完成次数合计 2,663，没有缺失作者、评分、距离或时长。

整个流程里，“严格对应才合并”是一条硬规则：Intel 侧的数据一律按 Mission ID 匹配，宁可留着缺口，也不靠猜测补全。这也是档案里没有推测性数据的原因。

## 技术上的取舍：静态 JSON、搜索索引与瘦身

公开数据放在 `frontend/public/data/`，结构是有意拆开的：

- `archive.json`：地图、列表、日历和筛选所需要的活动摘要；
- `search-index.json`：任务标题和地址的搜索索引；
- `analytics.json`：数据页的分析数据，延迟加载；
- `events/*.json`：777 个按活动拆分的任务详情。

最早版本的 `archive.json` 原始体积约 1,026 KiB、gzip 约 282 KiB。移除 `searchText`、`address`、`endDate`、`timezone`、`onlineMissionCount`、`offlineMissionCount` 之后，缩减到原始约 387 KiB、gzip 约 76.7 KiB，压缩后大约减少了 73%。`url` 字段被特意保留下来，这样即使详情加载失败，读者仍然能打开对应的 Bannergress 页面。

另外两份数据都改成了按需加载：`search-index.json` 原始约 562 KiB、gzip 约 190 KiB，只在用户第一次输入搜索内容时才加载；`analytics.json` 原始约 1.97 MiB、gzip 约 749 KiB，只在打开数据页时加载，并且用位置数组来减少重复字段名。单个活动详情则是原始大小中位数约 7.8 KiB、gzip 中位数约 1.8 KiB。

期间也认真讨论过要不要换掉 JSON。结论是：

- **CSV** 虽然体积更小，但活动与任务是嵌套关系，拆表之后还要面对浏览器没有可靠原生解析、`null` 和布尔值容易失真、不适合按活动懒加载等问题，因此只适合导出、审核和数据库导入，网站运行格式继续用 JSON。
- **Cloudflare D1** 完全可以放下当前规模，但为了减少文件数而迁移并不划算：静态资源全球缓存、结构简单，而 D1 需要 Worker API、数据库迁移、查询索引、缓存和故障处理，还要按读取或扫描行数计算用量，生产库也不能替代离线备份。比较现实的场景是以后再出现管理后台、在线更新或复杂服务端查询时，才考虑“静态摘要 + D1 详情”的混合架构。
- **哈希分片**也试算过：把 777 个详情文件分成 64 个桶后，每片大约 7–20 场活动、原始约 51–165 KiB、gzip 约 10–29 KiB。它确实能减少 Git 和文件系统中的文件数量，但打开单个活动的数据量会从约 1.8 KiB 上升到平均约 18 KiB，而且改动一场活动就会让整个分片失效。所以分片优化的是维护和部署的文件数，一活动一文件才是对实际访问更友好的方案。

目前的选择是先不实施分片，继续把精力放在精简 `archive.json` 上。

## 数据完整性、已知限制与维护方向

保证数据可信的流程大致是：从 Bannergress 增量抓取 Banner 和任务，生成 Mission Card 列表，再通过已登录的 Intel/IITC 会话导出评分、完成次数、距离和时长，按任务 ID 严格匹配后跑一遍合并检查，生成本地公开数据快照，最后由人工确认再同步到前端。

```bash
python tools/merge_mission_data.py --check-only
python tools/merge_mission_data.py
npm run data:build
npm run data:validate
npm run data:publish
```

合并时如果同一份数据有多个来源，优先级是：成功抓取 > 数据完整度 > 较新的 `fetched_at` > 批次文件名。

当前合并检查里仍然有一些已知提示，它们的存在本身就是数据现状的一部分：

- 344 个重复 Intel Mission ID，由合并优先级处理；
- 1 个 Banner Mission 数量不一致警告；
- 17 个离线 Banner、180 个离线任务；
- 37 条日期覆盖被应用；
- 7 个 Banner 日期仍未解决；
- 当前没有未分类 Banner。

需要留意的是，这里的“17 个离线 Banner”和前面“17 个被隔离的非 Mission Day Banner”是两回事，只是数量刚好相同。

真正占空间的也不是前端公开数据。本地文件的大致规模是：

| 路径 | 文件数 | 大小 |
|---|---:|---:|
| `frontend/public/data` | 780 | 约 9.12 MiB |
| `data-tools/data` | 340 | 约 186.42 MiB |
| `data-tools/output` | 9,383 | 约 113.28 MiB |
| `backups` | 15,590 | 约 926.25 MiB |

膨胀的主要是本地完整快照和 `output/build-backups`、`output/publish-backups`。而 `data-tools` 并不属于 Git 仓库，所以在清理备份之前必须先建立异地备份或私有远端，不能把生产数据只留在 D1 或一台电脑上。这次整理前保留的几个重要快照包括 `backups/data-tools-2026-09-21T03-49-49`、`backups/data-tools-2026-09-22T05-52-45` 和 `backups/data-tools-delta-archive-slim-2026-09-22T10-38-00`。

整个项目最后沉淀下来的核心判断，其实不复杂：不推测补全缺失数据；Intel 数据按 Mission ID 严格匹配；评分排行排除空值和 0 分；任务操作类型不作为 MD 类型的依据；`event_category` 继续作为非 MD 的隔离边界；`md-xma` 必须有可靠的日程、日期和城市证据；`md-standard` 是自动识别后的默认值；`md-lite` 优先尊重官方标签；Sabadell 保留为 18 个任务的 Lite 特例；公开详情继续一活动一文件；数据生成、提交、推送和部署相互独立，发布前人工确认。

至于接下来还能做什么，比较有意思的方向包括三种 MD 类型的任务操作与评分差异、XMA 各系列的活动规模变化、Field Trip Waypoint 在不同年份的使用趋势、disabled 任务与 Portal 消失之间的时间关系、发布者账号与阵营分布，以及历史页面与实际 Banner 结构冲突的其他案例。这些问题一时都还没有答案，但它们至少是可以被数据回答的。

## 写在最后

整理这份档案最大的收获，并不是把 777 场活动凑齐，而是慢慢接受了“数据只能说到某个程度”。官方日程和任务数据会对不上，历史页面会互相矛盾，任务会随着 Portal 消失而消失，所以档案里必然留着一些空格。与其用推测把它们填满，不如把证据、置信度和限制一起写清楚。

想自己翻一翻这些数据，可以访问 [MD Atlas](https://reiinoki.dpdns.org/md-atlas/)，项目代码公开在 [GitHub](https://github.com/ReiiNoki/md-atlas)。

最后照例说明：MD Atlas 是社区维护的数据整理项目，并非 Niantic 官方资料。文中结论只针对当前收录和能够核对的数据；随着历史页面、任务记录和新证据继续补充，统计结果与个别判断仍可能修订。
