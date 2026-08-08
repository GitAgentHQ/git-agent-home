---
target: 首页
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
timestamp: 2026-08-07T15-25-55Z
slug: app-components-home-view-tsx
---
# Critique: git-agent 首页 (home-view)

Method: dual-agent (A: a1322e593d034aa2f · B: a9089a1ee94750447)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Copy 按钮有 "Copy→Copied" 反馈 + aria-live；扣分：复制失败 `catch {}` 静默吞掉无提示 |
| 2 | Match System / Real World | 3 | 终端隐喻贴合开发者；扣分：核心 CTA 是自然语言指令而非 `brew install` 命令 |
| 3 | User Control and Freedom | 2 | 卡片进详情后返回键退出网站（URL 从不变化）；无法深链、无法新标签；子视图无语言切换 |
| 4 | Consistency and Standards | 3 | 设计系统一致性是全场最强项；扣分：安装 CTA 打破"命令即代码块"模式，详情 SPA state 与 explore URL 路由两套导航并存 |
| 5 | Error Prevention | 3 | 落地页几乎无输入；扣分：复制失败静默、免费声明仅一行小字 |
| 6 | Recognition Rather Than Recall | 3 | 信息全在页可见；扣分：6 卡 × 4-6 条功能 ≈ 30 条要点，读不完 |
| 7 | Flexibility and Efficiency | n/a | 说服型营销页无专家高频任务，不适用 |
| 8 | Aesthetic and Minimalist Design | 3 | 美学 5 分极有辨识度；极简 2 分：6 卡文档墙 + GraphPitch 长段落 |
| 9 | Error Recovery | 3 | 复制按钮失败时无任何反馈，静默失败 |
| 10 | Help and Documentation | n/a | 营销页本身即说服，深层帮助一跳可达，不适用 |
| **Total** | | **23/32** | **Acceptable** |

## Design Specificity Verdict

**大部分定制，但说服骨架模板化。** Terminal Printer 隐喻执行彻底（单色+奶油、噪声纸纹、条形码序列号 GA-001…006、每卡独有条形码），换产品名必须重新设计。但页面骨架是标准 SaaS 落地页套路（hero+CTA → 功能卡网格 → 定价对比 → explore → footer）。最大的特异性浪费：CLI 产品最有说服力的素材——终端输出本身（混乱 diff → 原子提交）——完全缺席；名为 graph pitch 的区块用一整段散文解释共变图谱，却没画出这张图。

**Deterministic scan**: 检测器在 home-view.tsx 和 app.css 上 0 真实问题。目录级 3 个发现全是误报（2 个 root.tsx Google Fonts 品牌字体 + 1 个 templates.ts 示例字符串里的 `<img>` 文本）。

**Visual overlays**: 浏览器可视化未执行——评估 B 因 API 错误（image_url 序列化失败）崩溃，改用 curl SSR DOM 抓取，无 overlay 注入。

## Overall Impression

视觉是全场最强者——单色+奶油+噪声+条形码的设计语言罕见且执行纪律好。但作为说服页，它把最有说服力的话（免费、共变图谱、真实终端输出）埋在 6 张命令卡组成的文档墙之后，而唯一的转化 CTA 是"复制一句自然语言指令"而非 `brew install`。首页在同时服务营销和文档两个主人，两边都不完美。

## What's Working

1. **真正有辨识度的设计系统，执行纪律罕见**——单色+奶油+噪声纸纹+条形码+mono 语音贯彻全站，GA-001…006 序列号是给开发者的彩蛋。
2. **无障碍成熟度远超同类**——skip link、focus-visible 双主题、aria-live 复制反馈、全站 reduced-motion、语义 landmark、prefers-contrast。
3. **定价对比是诚实、具体的说服装置**——实测 token 成本、等比条形、来源标注、"free" 行独立呈现。

## Priority Issues

### [P1] 唯一主 CTA 是"句子"不是"命令"
- **Why**: 首页唯一转化动作让用户复制 `Install git-agent — follow https://git-agent.dev/install.md` 而非 `brew install gitagenthq/tap/git-agent`（`INSTALL_COMMAND` 常量已定义却未用）。评估 B 的 SSR 抓取确认了这一点。首次访客不知道粘哪，压力测试者找不到命令本体。
- **Fix**: 主复制块显示真实 `brew install` 命令，把"或让 agent 按 install.md 安装"降为次级链接。
- **Suggested command**: /impeccable clarify（或 harden）

### [P1] 双语是无状态、不可深链、且只存在于首页
- **Why**: `LangSwitch` 只渲染在首页。语言是 client-only `useState`，不写 URL/localStorage。SSR 恒英文，zh 浏览器 hydration 后翻转（闪英→中 FOUC）。进 explore 子页后语言重置为英文且无切换入口。双语是 PRODUCT.md 的第一等品牌承诺。
- **Fix**: 语言持久化到 localStorage 并/或 URL（?lang=zh）；LangSwitch 加进 CommandDetail 与 PseoLayout。
- **Suggested command**: /impeccable harden

### [P1] 卡片导航破坏返回键与深链
- **Why**: 命令详情由 `useState<View>` 驱动，URL 从不变化。详情按返回 = 退出网站；无法深链、无法新标签（卡片是 button）。违背启发式 3。
- **Fix**: 用 URL search param/hash 驱动详情视图（?cmd=commit），或 EntryCard 改包 Link。
- **Suggested command**: /impeccable adapt

### [P2] 说服顺序把"为什么"埋在文档墙后
- **Why**: 差异化（共变图谱）和成本优势（free）出现在 6 张卡（≈3000px）之后。首次访客到不了"为什么选它"就流失。
- **Fix**: 把 GraphPitch/PricingCompare 提到 entry-grid 前，或 6 卡缩为 3 卡。
- **Suggested command**: /impeccable layout（或 distill）

### [P2] 说服页零社会证明
- **Why**: 无 stars、无评测、无下载数、无终端输出示例。对"在我的仓库里 commit"的高信任动作，信任证据为零。
- **Fix**: hero 与 grid 之间加 proof strip（GitHub stars / 用户引语 / 混乱 diff → 原子提交输出示例）。
- **Suggested command**: /impeccable bolder（或 delight）

### [P3] SSR 首帧不可见
- **Why**: 评估 B 确认 13 处 `opacity:0` 初始状态（main + 6 entry-grid-cell + 6 explore-card）。无 JS/慢 hydration 时整页或 explore 区空白。
- **Fix**: 用 Framer Motion 的 SSR 渐进增强方案，或对首屏内容跳过初始隐藏。
- **Suggested command**: /impeccable optimize

## Persona Red Flags

**Jordan（首次访问者）**: 首屏 CTA 是句子不是命令，"粘到哪"卡住。6 卡文档墙 30 条要点铺面，没有"跟别的 AI commit 工具有啥不同"的速答。若在到达 pricing（free）前滚出，全页最有力的话看不到。

**Riley（压力测试者）**: 想要真实 `brew install` 命令拿不到。点 View details 进详情后发现返回键退出网站、不能新标签、页面上无语言切换。找不到任何 stars/评测。

**Casey（分心移动用户）**: 6 卡移动端单列 ≈3000px 长滚。"粘贴到编程助手"在手机上无终端是怪异指令。安装代码块 <640px 下 URL 随意断行像坏链接。

## Minor Observations

- 冗余叙事：副标题、GraphPitch、3+ 卡都强调 "offline / no API key / zero config"。
- 弱收尾：footer 无再次 CTA，"Made by Frad" + 微弱 mailto 结束全页。
- 卡片 "View details →" 是 35% 透明度次级文本，对比度偏弱。
- entry-card 按钮无显式 aria-label，可访问名称从整卡文本推导，冗长。

## Questions to Consider

1. 这个 CTA 到底在说服谁——人还是 agent？hero 让访客"复制粘贴到编程助手"，全站其他处是"给人看的命令"。
2. 一个 CLI 产品的首页，为什么没有一个终端输出？共变图谱用散文解释却画出图，装饰语言讲"打印机"隐喻却没展示产品打印出来的东西。
3. 首页是否同时服务营销+文档两个主人因此两边不完美？
4. 中文是第一等语言，但架构是英文优先（SSR 恒英文、语言不持久、子视图无切换）。
