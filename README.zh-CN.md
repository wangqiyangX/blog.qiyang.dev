# blog.qiyang.dev

[English](./README.md)

Qiyang 的个人博客与文档站，基于 Next.js 16 和 Fumadocs 构建。

## 项目简介

这个项目是一个以内容为核心的博客站点，结合了以下能力：

- 基于 Fumadocs 的 MDX 内容系统
- 英文与简体中文本地化路由
- 支持多语言分词的站内全文搜索
- 自动生成 OG 图片、面向 LLM 的导出能力，以及 Giscus 评论

## 技术栈

- Next.js 16 App Router
- React 19
- Fumadocs UI + Fumadocs MDX
- Tailwind CSS 4
- 使用 Bun 进行本地依赖管理

## 本地开发

### 前置条件

- Bun 1.3+

### 安装依赖

```bash
bun install
```

### 启动开发环境

```bash
bun run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

### 类型检查

```bash
bun run types:check
```

### 生产构建

```bash
bun run build
bun run start
```

## 项目结构

```text
app/          Next.js 路由、布局、API 和 OG 图片路由
components/   UI 组件、搜索 UI、评论组件、MDX 辅助组件
content/      MDX 内容，以及本地化栏目页
lib/          内容加载、i18n 工具、共享布局配置
```

## 内容编写

- 所有文档和博客内容放在 `content/` 下
- 本地化栏目首页使用 `index.mdx` 和 `index.zh.mdx`
- 本地化导航元数据使用 `meta.json` 和 `meta.zh.json`
- 新增内容后会由 `fumadocs-mdx` 自动纳入内容系统

## 本地化

当前支持的语言：

- `en`
- `zh`

本地化范围包括：

- 路由级语言切换
- 栏目首页内容本地化
- 侧边栏导航元数据本地化
- 搜索 UI 与搜索索引本地化
- 日期格式和站点标题本地化

## 搜索

站内搜索基于 Fumadocs 内置搜索和 `/api/search` 路由实现。中文搜索使用
`@orama/tokenizers/mandarin` 做分词，以提升中文检索效果。

## 说明

- `postinstall` 会执行 `fumadocs-mdx` 生成内容产物
- OG 图片会根据页面元数据动态生成
- 项目提供 `llms.txt` 和 Markdown 导出路由，方便 LLM 使用

## 许可

私有项目。
