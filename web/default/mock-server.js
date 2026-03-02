const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock 公告 API
app.get('/api/announcement', (req, res) => {
  res.json({
    success: true,
    message: '',
    data: {
      id: 'announcement_v2',
      title: '系统公告',
      content: `
        <div>
          <h3>平台使用规范</h3>
          <p>为保障平台的高效稳定运作，持续为您提供优质、流畅的 API 接口服务，我们现对系统进行了全面升级。</p>
          <h3>平台使用规范</h3>
          <ul>
            <li>🚫 严禁规则内容：严禁利用本平台接口（含"酒店"等各类文娱场景）生成或传播及任何违法信息、暴力加密等违法违规内容。</li>
            <li>🔒 自动化风控与隐私保护：平台已启用系统级智能过滤机制，我们承诺对违规识别行自动识别与机器拦截，全程无人工干预，请放心使用。</li>
            <li>🛡️ 系统防御与管理机制：为维护平台的共建环境，针对高频触发风控拦截、屡次违规的账号，系统将自动封禁式防御：系统警告 → 接口限流 → 临时封禁 → 永久封禁。</li>
          </ul>
          <h3>共建优质生态</h3>
        </div>
      `,
      enabled: true,
      created_at: Date.now() / 1000,
      updated_at: Date.now() / 1000
    }
  });
});


// Mock 首页配置 API
app.get('/api/homepage_config', (req, res) => {
  res.json({
    success: true,
    message: '',
    data: {
      mode: 'custom',
      hero: {
        title: 'Ailinkor - 企业级 AI 接口平台',
        subtitle: '为全球开发者提供稳定、高效、安全的 AI API 服务 | 支持 GPT-4、Claude、Gemini 等主流大模型 | 毫秒级响应，99.9% 可用性保障',
        cta_text: '立即体验',
        cta_link: '/login'
      },
      features: [
        {
          id: 'feature_1',
          icon: 'lightning',
          title: '极速响应',
          description: '全球 CDN 加速，智能路由选择，平均响应时间 < 200ms，让您的应用快人一步'
        },
        {
          id: 'feature_2',
          icon: 'shield check',
          title: '企业级安全',
          description: '银行级加密传输，完善的权限管理，通过 ISO 27001 认证，守护您的数据安全'
        },
        {
          id: 'feature_3',
          icon: 'chart line',
          title: '弹性扩展',
          description: '按需付费，无需预付，自动扩容，轻松应对流量高峰，成本可控透明'
        },
        {
          id: 'feature_4',
          icon: 'code branch',
          title: '开发者友好',
          description: '完整的 SDK 支持，详尽的 API 文档，活跃的开发者社区，快速集成上线'
        },
        {
          id: 'feature_5',
          icon: 'globe',
          title: '全球覆盖',
          description: '部署于全球 15+ 数据中心，智能就近接入，为全球用户提供一致的高质量体验'
        },
        {
          id: 'feature_6',
          icon: 'headphones',
          title: '专业支持',
          description: '7×24 小时技术支持，专属客户成功团队，平均响应时间 < 5 分钟'
        }
      ],
      services: [
        {
          id: 'service_1',
          icon: 'microchip',
          title: 'GPT-4 Turbo',
          description: '最新 GPT-4 Turbo 模型，128K 上下文，更强的推理能力，更准确的输出'
        },
        {
          id: 'service_2',
          icon: 'brain',
          title: 'Claude 4',
          description: 'Anthropic Claude 4 系列，擅长长文本分析，代码生成，复杂推理任务'
        },
        {
          id: 'service_3',
          icon: 'paint brush',
          title: 'DALL·E 3 & Midjourney',
          description: '顶级 AI 绘图服务，支持文生图、图生图，创意无限，质量卓越'
        },
        {
          id: 'service_4',
          icon: 'language',
          title: '多模态 AI',
          description: '图像识别、语音合成、视频理解，一站式多模态 AI 能力，赋能您的应用'
        },
        {
          id: 'service_5',
          icon: 'database',
          title: 'Embedding 向量化',
          description: '高性能文本向量化服务，支持语义搜索、推荐系统、知识库构建'
        },
        {
          id: 'service_6',
          icon: 'cogs',
          title: '定制化服务',
          description: '企业专属模型微调，私有化部署方案，满足您的个性化需求'
        }
      ]
    }
  });
});

// Mock notice API
app.get('/api/notice', (req, res) => {
  res.json({
    success: true,
    message: '',
    data: ''
  });
});

// Mock home_page_content API
app.get('/api/home_page_content', (req, res) => {
  res.json({
    success: true,
    message: '',
    data: ''
  });
});

// Mock status API
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    message: '',
    data: {
      system_name: 'Ailinkor',
      logo: '/logo.svg',
      version: 'v1.0.0',
      start_time: Date.now() / 1000 - 86400,
      email_verification: true,
      github_oauth: false,
      wechat_login: false,
      turnstile_check: false
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
