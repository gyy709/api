import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import './HeroSection.css';

const HeroSection = ({ config }) => {
  const modelTags = [
    'GPT-5',
    'Claude 4.6',
    'Gemini 2.0',
    'GPT-4o',
    'Claude 3.5 Sonnet',
    'DALL·E 3',
    'Midjourney v6',
    'Sora',
    'Llama 3.3',
    'DeepSeek V3'
  ];

  return (
    <div className='hero-section'>
      <Container>
        <div className='hero-content-wrapper'>
          <div className='hero-left'>
            <div className='hero-badge'>
              <span className='badge-dot'></span>
              服务 · 99.99% 可用性
            </div>
            <Header as='h1' className='hero-title'>
              <Logo size={52} showText={true} dark={true} />
            </Header>
            <p className='hero-tagline'>主流 AI 大模型 API 聚合平台</p>
            <p className='hero-subtitle'>{config.subtitle}</p>
            <ul className='hero-features'>
              <li>稳定 · 高并发 · 源头接口</li>
              <li>仅修改 Key 和 Base URL 就可使用</li>
            </ul>
            <div className='hero-cta-group'>
              <Button 
                as={Link} 
                to={config.ctaLink} 
                size='huge' 
                className='hero-cta'
              >
                立即开始 →
              </Button>
              <Button 
                as={Link} 
                to='/api-docs' 
                size='huge' 
                className='hero-cta-secondary'
              >
                <i className='book icon'></i>
                查看文档
              </Button>
            </div>
          </div>
          
          <div className='hero-right'>
            <div className='model-tags-cloud'>
              {modelTags.map((tag, index) => (
                <div key={index} className='model-tag'>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className='hero-stats'>
          <div className='stat-item'>
            <div className='stat-value'>99.9%</div>
            <div className='stat-label'>服务可用性</div>
          </div>
          <div className='stat-item'>
            <div className='stat-value'>1亿+</div>
            <div className='stat-label'>日调用量 RPM</div>
          </div>
          <div className='stat-item'>
            <div className='stat-value'>24x7</div>
            <div className='stat-label'>技术支持</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;
