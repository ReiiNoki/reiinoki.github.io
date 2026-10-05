---
title: "从 15,283 个任务里发现 Mission Day 的另一面"
date: "2026-09-22"
slug: "/2026-09-22"
draft: true
tags:
  - Ingress
  - Mission Day
  - Data Archive
  - Data Analysis
  - Open Data
---

在整理 [MD Atlas](https://reiinoki.dpdns.org/md-atlas/) 的过程中，我原本只是想把散落在各地、跨越多年的 Mission Day 活动集中起来，做成一个方便查询的历史档案。但当 777 场公开活动和 15,283 个公开任务被放进同一份数据集后，一些平时很难注意到的细节也逐渐浮了出来。

Mission Day 任务看起来大多都是 Hack Portal，但真把每一步拆开统计之后，会发现其中还有 Field Trip Waypoint、Passphrase、Install Mod，甚至 Create Link。除此之外，还有一个完全不需要 Hack 的任务，以及几组因为 Portal 全部不可用而被下架的任务。

这篇文章不谈活动分类和网站实现，只分享这些任务数据里比较有趣的发现。

## 曾经很常见的 Field Trip Waypoint

任务步骤分析使用的是 Bannergress Mission Card 中的 `step_list`。在目前公开的 Mission Day 数据中，有 **1,279 个任务**包含 Field Trip Waypoint，分布在 **215 场活动**里，合计出现了 **1,776 个 Field Trip Waypoint**。

现在回头看这些数据，Field Trip Waypoint 很像是 Mission 系统早期留下的一层历史切片：它不是少数几个任务偶然使用过的特殊功能，而是曾经出现在数百场 Mission Day 中的重要任务元素。

不过，这项统计只能说明任务数据中记录了这些 Waypoint，不能据此判断玩家当时的实际体验，也不能说明这些地点今天是否仍然可用。

## 除了 Hack，还能要求玩家做什么？

把最常见的 `hack` 和单纯查看地点的 `viewWaypoint` 排除以后，剩余操作的数量并不算多：

| 操作 | 步骤数 | 涉及任务数 |
|---|---:|---:|
| `enterPassphrase` | 1,840 | 1,710 |
| `installMod` | 9 | 8 |
| `createLink` | 3 | 3 |
| `captureOrUpgrade` | 2 | 2 |

最常见的特殊操作是输入 Passphrase，共有 **1,710 个任务**包含 **1,840 个**相关步骤。相比之下，要求安装 Mod 的只有 8 个任务，Create Link 只有 3 个任务，Capture or Upgrade 更只有 2 个任务。

这些数字也提醒了我，不能根据操作类型反推活动性质。某个任务要求输入密码、装 Mod 或连 Link，并不代表它属于某种特殊 Mission Day；任务操作适合用来观察设计差异，却不适合作为活动分类依据。

## 唯一一个完全不需要 Hack 的任务

15,283 个公开任务中，目前只有一个任务完全没有 Hack 步骤：

```text
MD 2019: Petaluma, Movie Locations
Mission ID: 8975adad115d49c0a4f3bcf675ea3e51.1c
```

它由 8 个步骤组成：

- `enterPassphrase`：6 个；
- `viewWaypoint`：2 个；
- `hack`：0 个。

换句话说，这个任务不是带着玩家依次 Hack Portal，而是通过地点和 Passphrase 推进。它是否是整个 Ingress 历史上唯一的无 Hack Mission，目前的数据无法回答；能够确认的范围只是 **MD Atlas 当前收录的公开 Mission Day 任务**。

## 当任务所需的 Portal 全部消失

数据中还有 6 个状态为 `disabled` 的任务。它们有一个很一致的特征：每个任务都有 6 个步骤，而且所有步骤的 `poi_type` 都是 `unavailable`。

| 任务 | 所属活动 |
|---|---|
| MD: Kiel, South Cemetery | MD: Kiel |
| No.1 Yaohan Nextage / 八佰伴商厦 | MD: Shanghai |
| Red Town / 红坊 | MD: Shanghai |
| MDAS: Ft Lauderdale 1 | Mission Day At Sea |
| MD: Ann Arbor, The Cube | MD: Ann Arbor |
| MD: Brasília, Setor Militar Urbano | MD: Brasília |

从数据表现来看，这很符合“任务所需 Portal 全部消失后，任务被下架”的情况。但这里必须区分数据现象和官方结论：我没有取得这些任务的官方下架原因，因此只能说它们呈现出这样的共同特征，不能断言 Portal 消失就是下架的唯一原因。

上海的两个任务也让我印象很深。Mission Day 保存的不只是一次活动的路线，有时也会间接留下城市地点变化的痕迹。当一整组 Waypoint 都变成 unavailable 时，这份任务数据本身也成了一种历史记录。

## 评分和完成次数应该怎样理解？

把任务放进排行榜很容易，但如果不先处理空值，结果会产生明显偏差。MD Atlas 当前采用的规则是：

1. 空评分和 0 分不参与评分排行；
2. 活动平均评分取该活动所有有效任务评分的算术平均值；
3. 分数相同时，记录完成次数更多的任务或活动优先；
4. “完成次数合计”是任务记录中的累计值，不等同于现场独立参与人数。

尤其是最后一点，同一个人可能完成多个任务，因此不能把一场活动所有任务的完成次数相加后，直接称为活动参与人数。同样，把尚未评分的任务当成 0 分，也会系统性拉低活动平均分。

这些限制看起来只是统计口径，但对于跨越多年、来源并不完全一致的历史数据来说，先承认数据不能说明什么，和展示数据本身一样重要。

## 数据档案也是另一种观察方式

如果只看 Mission Day 的活动列表，看到的通常是日期、城市和任务数量。把任务进一步拆成操作步骤后，才能看到它们具体要求玩家做过什么：有些任务依赖已经淡出视野的 Field Trip Waypoint，有些让玩家输入 Passphrase，极少数会要求装 Mod、连 Link 或占领 Portal，还有一些任务随着所需地点消失，最终只留下 disabled 状态的数据记录。

这些发现未必能改变我们对 Mission Day 的整体印象，但它们让档案不再只是一张活动清单。每一种罕见操作、每一个 unavailable Waypoint，都是当时任务设计和城市环境留下的一点痕迹。

如果想自己翻一翻这些数据，可以访问 [MD Atlas](https://reiinoki.dpdns.org/md-atlas/)；项目代码也公开在 [GitHub](https://github.com/ReiiNoki/md-atlas)。

最后需要说明：MD Atlas 是社区维护的数据整理项目，并非 Niantic 官方资料。现有结论只针对当前收录和能够核对的数据；随着历史页面、任务记录和新证据继续补充，统计结果与个别判断仍可能修订。


## 2022年发生了什么

## Field Trip Waypoint

## 非hack操作任务

## 已经下线的任务

## 已经下线的活动

## 完成次数最多的任务

## 评分最低的任务

## MD Lite?

## 最多任务的MD

## 特别的MD，比如拼图MD

## 特殊主题MD

[ingress mission day lucca commics and games](https://archivio.luccacomicsandgames.com/it/2016/videogames/news/ingress-mission-day/)
