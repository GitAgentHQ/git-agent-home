# git-agent-home ![](https://img.shields.io/badge/React-19.0-blue) ![](https://img.shields.io/badge/Cloudflare-Workers-orange)

[![CI](https://img.shields.io/github/actions/workflow/status/GitAgentHQ/git-agent-home/deploy.yml)](https://github.com/GitAgentHQ/git-agent-home/actions) [![License](https://img.shields.io/github/license/GitAgentHQ/git-agent-home)](https://github.com/GitAgentHQ/git-agent-home/blob/main/LICENSE)

[English](README.md) | **简体中文**

[git-agent](https://github.com/GitAgentHQ/git-agent-cli) 的 Web 控制台——一个 AI 驱动的 Git 执行层。把工作的意图交给它，它会发现、暂存、拆分、验证并提交原子化的 Conventional Commits。基于 React Router 8 构建，部署于 Cloudflare Workers。

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev          # http://localhost:5173

# 类型检查
pnpm typecheck

# 生产环境构建
pnpm build

# 部署到 Cloudflare Workers
pnpm deploy
```

## 项目结构

- `app/` — React Router 7 应用
  - `components/` — UI 组件（HomeView、CommandDetail、TicketView、Barcode、Pattern、CodeBlock、ComparisonTable、HubGrid、LangSwitch、PseoLayout、PseoFooter、HomeFooter、CrossLinksSection）
  - `routes/` — 路由定义：首页、SEO 落地页（`/for/[language]`、`/vs/[competitor]`、`/glossary/[term]`、`/templates/[type]`）、sitemap、robots.txt
- `workers/` — Cloudflare Worker 入口
- `public/install.md` — 安装与编程助手交接指南，包含 Pi 原生 `pi-git-agent` 包

## 编程助手交接

`public/install.md` 作为静态资源提供，用于安装和说明编程助手如何交接 Git 操作。推荐的写入入口是裸 `git-agent --intent "..."`：编程助手传入用户目标和验证上下文，之后由 git-agent 负责发现改动、暂存、原子规划、hook 验证和提交。CLI 接口或自主工作流发生变化时，请同步更新此文档。

## 相关项目

| 项目 | 描述 |
|------|------|
| [git-agent-cli](https://github.com/GitAgentHQ/git-agent-cli) | AI 驱动的 Git CLI |
| [pi-git-agent](https://github.com/GitAgentHQ/pi-git-agent) | Pi 原生包（`pi-git-agent@0.7.3`） |

## 许可证

[MIT](LICENSE)
