# git-agent-home ![](https://img.shields.io/badge/React-19.0-blue) ![](https://img.shields.io/badge/Cloudflare-Workers-orange)

[![CI](https://img.shields.io/github/actions/workflow/status/GitAgentHQ/git-agent-home/deploy.yml)](https://github.com/GitAgentHQ/git-agent-home/actions) [![License](https://img.shields.io/github/license/GitAgentHQ/git-agent-home)](https://github.com/GitAgentHQ/git-agent-home/blob/main/LICENSE)

[English](README.md) | **简体中文**

[git-agent](https://github.com/GitAgentHQ/git-agent-cli) 的 Web 控制台——一款 AI 驱动的 Git CLI，可生成 Conventional Commits 格式的提交信息并将修改拆分为原子提交。基于 React Router 7 构建，部署于 Cloudflare Workers。

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
  - `components/` — UI 组件（HomeView、CommandDetail、TicketView、Barcode、Pattern）
  - `routes/` — 路由定义
- `workers/` — Cloudflare Worker 入口
- `public/skill.md` — git-agent CLI 的 Claude Code 技能

## Claude Code 技能

`public/skill.md` 作为静态资源提供，并已在 Claude Code 中注册为技能。该文件记录了所有 CLI 命令、参数、配置解析规则和提交格式要求。当 CLI 接口变更时，请同步更新此文件。

## 相关项目

| 项目 | 描述 |
|------|------|
| [git-agent-cli](https://github.com/GitAgentHQ/git-agent-cli) | AI 驱动的 Git CLI |
| [git-agent-proxy](https://github.com/GitAgentHQ/git-agent-proxy) | 具备认证和限流功能的 Cloudflare Worker 代理 |

## 许可证

MIT
