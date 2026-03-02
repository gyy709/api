import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import './TutorialSection.css';

const TutorialSection = () => {
  return (
    <div className='tutorial-section'>
      <Container>
        <Header as='h2' textAlign='center' className='section-title'>
          快速接入指南
        </Header>
        <p className='section-subtitle'>
          仅需修改 API Key 和 Base URL，即可快速接入全球顶尖 AI 模型
        </p>
        
        <div className='tutorial-grid'>
          <div className='tutorial-step'>
            <div className='step-number'>01</div>
            <div className='step-content'>
              <h3 className='step-title'>获取 API Key</h3>
              <p className='step-description'>
                注册账号后，在控制台创建您的专属 API Key
              </p>
            </div>
          </div>

          <div className='tutorial-step'>
            <div className='step-number'>02</div>
            <div className='step-content'>
              <h3 className='step-title'>配置 Base URL</h3>
              <p className='step-description'>
                将您的请求地址指向 Ailinkor 服务端点
              </p>
            </div>
          </div>

          <div className='tutorial-step'>
            <div className='step-number'>03</div>
            <div className='step-content'>
              <h3 className='step-title'>开始调用</h3>
              <p className='step-description'>
                使用标准 OpenAI SDK 格式即可调用所有模型
              </p>
            </div>
          </div>
        </div>

        <Segment className='code-example'>
          <div className='code-header'>
            <span className='code-lang'>Python</span>
            <button className='copy-btn'>复制代码</button>
          </div>
          <pre className='code-content'>
{`from openai import OpenAI

client = OpenAI(
    api_key="your-ailinkor-api-key",
    base_url="https://api.ailinkor.com/v1"
)

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)`}
          </pre>
        </Segment>

        <div className='compatibility-section'>
          <h3 className='compatibility-title'>兼容所有主流框架</h3>
          <div className='framework-tags'>
            <span className='framework-tag'>OpenAI SDK</span>
            <span className='framework-tag'>LangChain</span>
            <span className='framework-tag'>LlamaIndex</span>
            <span className='framework-tag'>Semantic Kernel</span>
            <span className='framework-tag'>AutoGen</span>
            <span className='framework-tag'>Dify</span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TutorialSection;
