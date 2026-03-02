# Ailinkor 定制化首页使用说明

## 功能概述

本定制版本为 one-api 添加了以下功能：

1. **系统公告弹窗** - 支持富文本展示、今日关闭/永久关闭功能
2. **官网风格首页** - Hero 区域、特性展示、服务卡片，完全响应式设计

## 快速开始

### 1. 构建前端

```bash
cd web/default
npm install
npm run build
```

### 2. 编译后端

```bash
go build -ldflags "-s -w" -o one-api
```

### 3. 运行服务

```bash
./one-api
```

访问 `http://localhost:3000` 即可看到新的首页。

## 配置说明

### 首页配置

首页默认显示为自定义官网风格，包含：

- **Hero 区域**: "Ailinkor API - 更强模型 更低价格 更易落地"
- **核心特性**: 4 个特性卡片展示平台优势
- **服务展示**: 4 个服务卡片展示具体服务

### 修改首页内容

首页内容通过后端 API 配置，默认配置在 `controller/homepage.go` 的 `getDefaultHomePageConfig()` 函数中。

要修改首页内容，可以：

1. 直接修改 `getDefaultHomePageConfig()` 函数中的默认值
2. 通过管理员 API 接口动态更新配置（需要管理员权限）

### 配置系统公告

系统公告通过管理员 API 接口配置：

```bash
POST /api/option/announcement
Authorization: Bearer <admin_token>

{
  "title": "系统公告",
  "content": "<div><h3>平台使用规范</h3><p>内容...</p></div>",
  "enabled": true
}
```

## API 接口

### 公共接口

- `GET /api/announcement` - 获取公告内容
- `GET /api/homepage_config` - 获取首页配置

### 管理员接口

- `POST /api/option/announcement` - 更新公告（需要 Root 权限）
- `POST /api/option/homepage_config` - 更新首页配置（需要 Root 权限）

## 首页模式切换

首页支持两种模式：

1. **custom** - 自定义官网风格（默认）
2. **default** - 原有系统状态页面

要切换模式，修改首页配置中的 `mode` 字段。

## 技术栈

- 前端：React 18 + Semantic UI React
- 后端：Go + Gin 框架
- 安全：DOMPurify（XSS 防护）

## 文件结构

```
one-api/
├── controller/
│   └── homepage.go              # 公告和首页配置 API
├── router/
│   └── api.go                   # 路由注册
└── web/default/src/
    ├── components/
    │   ├── AnnouncementModal.js # 公告弹窗组件
    │   ├── HeroSection.js       # Hero 区域组件
    │   ├── FeaturesSection.js   # 特性展示组件
    │   └── ServicesSection.js   # 服务展示组件
    └── pages/Home/
        └── index.js             # 首页主组件
```

## 注意事项

1. 公告内容支持 HTML，但会经过 DOMPurify 清理以防止 XSS 攻击
2. 首页配置的特性和服务列表最多支持 12 项
3. 公告关闭记录存储在浏览器 LocalStorage 中
4. 首页配置缓存在 LocalStorage 中，提高加载速度

## 品牌信息

- 品牌名称：Ailinkor
- 默认标语：更强模型 更低价格 更易落地
- 核心理念：致力于为开发者提供快速、便捷的 Web API 接口调用方案

## 支持

如有问题，请查看：
- 设计文档：`.kiro/specs/one-api-custom-homepage/design.md`
- 任务列表：`.kiro/specs/one-api-custom-homepage/tasks.md`
