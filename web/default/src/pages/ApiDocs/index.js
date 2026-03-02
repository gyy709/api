import React from 'react';
import { Container, Header, Card, Grid, Icon } from 'semantic-ui-react';
import './ApiDocs.css';

const ApiDocs = () => {
  const aiModelApis = [
    { icon: 'list', title: '模型列表', description: '获取可用的模型列表。', link: '#' },
    { icon: 'comments', title: '聊天', description: '对话补全接口。', link: '#' },
    { icon: 'file text', title: '补全', description: '传统文本补全接口。', link: '#' },
    { icon: 'database', title: '嵌入', description: '文本嵌入向量生成接口。', link: '#' },
    { icon: 'search', title: '重排序', description: '文档重排序接口。', link: '#' },
    { icon: 'shield', title: '审查', description: '内容安全审核接口。', link: '#' },
    { icon: 'headphones', title: '音频', description: '语音识别和语音合成接口。', link: '#' },
    { icon: 'podcast', title: '实时语音', description: '实时音频流接口。', link: '#' },
    { icon: 'image', title: '图像', description: 'AI图像生成接口。', link: '#' },
    { icon: 'video', title: '视频', description: 'AI视频生成接口。', link: '#' },
    { icon: 'question circle', title: '未实现', description: '占位接口，暂未实现。', link: '#' }
  ];

  const managementApis = [
    { icon: 'server', title: '系统', description: '系统信息和状态接口。', link: '#' },
    { icon: 'sliders horizontal', title: '系统设置', description: '系统配置管理接口。', link: '#' },
    { icon: 'user check', title: '用户认证', description: '用户登录、注册、密码管理等接口。', link: '#' },
    { icon: 'users', title: '用户管理', description: '用户信息管理接口。', link: '#' },
    { icon: 'key', title: '双因素认证', description: '2FA 双因素认证接口。', link: '#' },
    { icon: 'linkify', title: 'OAuth', description: '第三方 OAuth 登录接口。', link: '#' },
    { icon: 'sitemap', title: '渠道管理', description: 'API 渠道配置管理接口。', link: '#' },
    { icon: 'cube', title: '模型管理', description: '模型配置管理接口。', link: '#' },
    { icon: 'key', title: '令牌管理', description: 'API 令牌管理接口。', link: '#' },
    { icon: 'ticket', title: '兑换码', description: '兑换码管理接口。', link: '#' },
    { icon: 'credit card', title: '支付', description: '支付和充值接口。', link: '#' },
    { icon: 'file alternate', title: '日志', description: '使用日志查询接口。', link: '#' },
    { icon: 'chart bar', title: '统计', description: '数据统计接口。', link: '#' },
    { icon: 'tasks', title: '任务', description: '异步任务管理接口。', link: '#' },
    { icon: 'folder open', title: '分组', description: '用户分组管理接口。', link: '#' },
    { icon: 'shop', title: '供应商', description: '供应商管理接口。', link: '#' },
    { icon: 'shield alternate', title: '安全验证', description: '安全验证相关接口。', link: '#' }
  ];

  return (
    <div className='api-docs-page'>
      <Container>
        <div className='api-docs-header'>
          <Header as='h1' className='page-title'>
            API 参考
          </Header>
          <p className='page-description'>
            Ailinkor API 提供完整的 RESTful API 接口，分为 <strong>AI 模型接口</strong> 和 <strong>管理接口</strong> 两大类。
            您可以通过这些接口实现 AI 能力调用和系统管理功能。
          </p>
          <Card className='callout-card'>
            <Card.Content>
              <Card.Header>
                <Icon name='flask' /> 在线调试
              </Card.Header>
              <Card.Description>
                您可以访问{' '}
                <a href='https://apifox.newapi.ai/' target='_blank' rel='noopener noreferrer'>
                  Apifox 操练场
                </a>{' '}
                在线测试和调试 API 接口，或浏览下方的 API 文档。
              </Card.Description>
            </Card.Content>
          </Card>
        </div>

        <div className='api-section'>
          <Header as='h2' className='section-title'>
            AI 模型接口
          </Header>
          <p className='section-description'>
            AI 模型接口提供各种 AI 能力的调用，兼容 OpenAI API 格式。
          </p>
          <Grid columns={3} stackable doubling>
            {aiModelApis.map((api, index) => (
              <Grid.Column key={index}>
                <Card fluid className='api-card' as='a' href={api.link}>
                  <Card.Content>
                    <Icon name={api.icon} size='big' className='api-icon' />
                    <Card.Header className='api-title'>{api.title}</Card.Header>
                    <Card.Description className='api-description'>
                      {api.description}
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
          </Grid>
        </div>

        <div className='api-section'>
          <Header as='h2' className='section-title'>
            管理接口
          </Header>
          <p className='section-description'>
            管理接口用于系统配置、用户管理、业务管理等后台操作。
          </p>
          <Grid columns={3} stackable doubling>
            {managementApis.map((api, index) => (
              <Grid.Column key={index}>
                <Card fluid className='api-card' as='a' href={api.link}>
                  <Card.Content>
                    <Icon name={api.icon} size='big' className='api-icon' />
                    <Card.Header className='api-title'>{api.title}</Card.Header>
                    <Card.Description className='api-description'>
                      {api.description}
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default ApiDocs;
