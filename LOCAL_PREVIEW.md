# 🎉 Ailinkor 定制化首页 - 本地预览指南

## ✅ 服务状态

所有服务已成功启动：

1. **Mock API 服务器** - 运行在 http://localhost:3001
   - 提供公告 API
   - 提供首页配置 API

2. **前端开发服务器** - 运行在 http://localhost:3000
   - React 应用
   - 自动代理 API 请求到 3001 端口

## 🌐 访问地址

**立即访问：** http://localhost:3000

## 🎨 查看内容

### 1. 系统公告弹窗
- 首次访问会自动弹出系统公告
- 支持"今日关闭"和"关闭公告"两种关闭方式
- 今日关闭：24 小时内不再显示
- 关闭公告：永久不再显示该公告

### 2. Ailinkor 品牌首页

#### Hero 区域
- 品牌标语：**Ailinkor API - 更强模型 更低价格 更易落地**
- 副标题：致力于为开发者提供快速、便捷的 Web API 接口调用方案
- CTA 按钮：开启AI新体验

#### 核心特性（4个卡片）
1. **#1 API** - 100%使用官方 API 渠道建设
2. **兼容性与支持** - 兼容 OpenAI 接口协议
3. **灵活计费** - 无需付费，即可使用 Midjourney 绘图
4. **全球布局** - 部署在全球多个数据中心

#### 服务展示（4个卡片）
1. **服务保障** - 7x24 小时技术支持
2. **活动计费** - 按需付费，灵活调整
3. **Midjourney** - 专业 AI 绘图服务
4. **#1 API** - 业界领先的 API 服务

### 3. 响应式设计
- 在浏览器中调整窗口大小查看响应式效果
- 支持桌面端、平板、移动端

## 🧪 测试功能

### 测试公告关闭功能
1. 点击"今日关闭"
2. 刷新页面 → 公告不显示
3. 打开浏览器开发者工具 → Application → Local Storage
4. 找到 `announcement_close_record` 键，删除它
5. 刷新页面 → 公告重新显示
6. 点击"关闭公告"
7. 刷新页面 → 公告不显示（永久）

### 测试响应式布局
1. 按 F12 打开开发者工具
2. 点击设备工具栏图标（或按 Ctrl+Shift+M）
3. 选择不同设备查看效果：
   - iPhone 12 Pro
   - iPad
   - Desktop

## 🛠️ 技术栈

- **前端框架**: React 18
- **UI 库**: Semantic UI React
- **安全防护**: DOMPurify（防止 XSS 攻击）
- **Mock 服务器**: Express.js
- **状态管理**: React Hooks + LocalStorage

## 📝 修改内容

### 修改首页内容
编辑文件：`one-api/web/default/mock-server.js`

找到 `/api/homepage_config` 路由，修改：
- `hero.title` - 主标题
- `hero.subtitle` - 副标题
- `features` - 特性列表
- `services` - 服务列表

保存后重启 mock 服务器：
```bash
# 停止当前 mock 服务器（Ctrl+C）
# 重新启动
node mock-server.js
```

### 修改公告内容
编辑文件：`one-api/web/default/mock-server.js`

找到 `/api/announcement` 路由，修改：
- `title` - 公告标题
- `content` - 公告内容（支持 HTML）

## 🎯 下一步

### 部署到生产环境
1. 安装 Go 环境
2. 编译后端：`go build -ldflags "-s -w" -o one-api`
3. 运行：`./one-api`
4. 访问：http://localhost:3000

### 自定义样式
- Hero 区域样式：`one-api/web/default/src/components/HeroSection.css`
- 特性卡片样式：`one-api/web/default/src/components/FeaturesSection.css`
- 服务卡片样式：`one-api/web/default/src/components/ServicesSection.css`
- 公告弹窗样式：`one-api/web/default/src/components/AnnouncementModal.css`

## 🐛 常见问题

### Q: 公告不显示？
A: 检查浏览器控制台是否有错误，确认 mock 服务器正在运行。

### Q: 样式显示不正常？
A: 清除浏览器缓存，刷新页面。

### Q: 修改后没有生效？
A: React 开发服务器支持热重载，但有时需要手动刷新浏览器。

## 📞 支持

查看完整文档：
- 设计文档：`.kiro/specs/one-api-custom-homepage/design.md`
- 使用说明：`one-api/AILINKOR_CUSTOMIZATION.md`

---

**享受你的 Ailinkor 定制化首页！** 🚀
