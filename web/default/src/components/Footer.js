import React from 'react';
import { Container, Grid, Header, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='site-footer'>
      <Container>
        <Grid columns={4} stackable>
          <Grid.Column>
            <div className='footer-brand'>
              <Logo size={36} showText={true} dark={false} />
              <p className='footer-description'>
                企业级 AI 接口平台，提供稳定可靠的 AI 模型服务。
              </p>
              <div className='footer-social'>
                <a href='#' aria-label='GitHub'>
                  <i className='github icon'></i>
                </a>
                <a href='#' aria-label='Twitter'>
                  <i className='twitter icon'></i>
                </a>
                <a href='#' aria-label='Discord'>
                  <i className='discord icon'></i>
                </a>
              </div>
            </div>
          </Grid.Column>

          <Grid.Column>
            <Header as='h4' className='footer-header'>
              产品
            </Header>
            <List link className='footer-list'>
              <List.Item as={Link} to='/api-docs'>
                API 文档
              </List.Item>
              <List.Item as={Link} to='/pricing'>
                价格方案
              </List.Item>
              <List.Item as={Link} to='/models'>
                模型列表
              </List.Item>
              <List.Item as={Link} to='/dashboard'>
                控制台
              </List.Item>
            </List>
          </Grid.Column>

          <Grid.Column>
            <Header as='h4' className='footer-header'>
              资源
            </Header>
            <List link className='footer-list'>
              <List.Item as={Link} to='/about'>
                关于我们
              </List.Item>
              <List.Item as='a' href='https://apifox.newapi.ai/' target='_blank' rel='noopener noreferrer'>
                API 测试
              </List.Item>
              <List.Item as={Link} to='/blog'>
                博客
              </List.Item>
              <List.Item as={Link} to='/changelog'>
                更新日志
              </List.Item>
            </List>
          </Grid.Column>

          <Grid.Column>
            <Header as='h4' className='footer-header'>
              支持
            </Header>
            <List link className='footer-list'>
              <List.Item as={Link} to='/help'>
                帮助中心
              </List.Item>
              <List.Item as={Link} to='/contact'>
                联系我们
              </List.Item>
              <List.Item as={Link} to='/terms'>
                服务条款
              </List.Item>
              <List.Item as={Link} to='/privacy'>
                隐私政策
              </List.Item>
            </List>
          </Grid.Column>
        </Grid>

        <div className='footer-bottom'>
          <p className='footer-copyright'>
            © {new Date().getFullYear()} Ailinkor. All rights reserved.
          </p>
          <div className='footer-links'>
            <a href='#'>服务状态</a>
            <span className='separator'>·</span>
            <a href='#'>安全</a>
            <span className='separator'>·</span>
            <a href='#'>合规</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
