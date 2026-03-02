import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Grid, Header, Loader } from 'semantic-ui-react';
import { API, showError, showNotice, timestamp2string } from '../../helpers';
import { StatusContext } from '../../context/Status';
import { marked } from 'marked';
import { UserContext } from '../../context/User';
import AnnouncementModal from '../../components/AnnouncementModal';
import HeroSection from '../../components/HeroSection';
import FeaturesSection from '../../components/FeaturesSection';
import ServicesSection from '../../components/ServicesSection';
import TutorialSection from '../../components/TutorialSection';

const STORAGE_KEYS = {
  ANNOUNCEMENT_CLOSE: 'announcement_close_record',
  ANNOUNCEMENT_DATA: 'announcement_data',
  HOMEPAGE_CONFIG: 'homepage_config'
};

const Home = () => {
  const { t } = useTranslation();
  const [statusState, statusDispatch] = useContext(StatusContext);
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [userState] = useContext(UserContext);
  
  // 新增状态
  const [announcement, setAnnouncement] = useState(null);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [homePageConfig, setHomePageConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  // 获取关闭记录
  const getCloseRecord = () => {
    try {
      const record = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT_CLOSE);
      return record ? JSON.parse(record) : { closedToday: null, closedPermanently: [] };
    } catch (error) {
      return { closedToday: null, closedPermanently: [] };
    }
  };

  // 判断是否显示公告
  const shouldShowAnnouncement = (announcement, closeRecord) => {
    if (!announcement || !announcement.enabled) {
      return false;
    }

    if (!closeRecord) {
      return true;
    }

    // 检查永久关闭
    if (closeRecord.closedPermanently && 
        closeRecord.closedPermanently.includes(announcement.id)) {
      return false;
    }

    // 检查今日关闭
    if (closeRecord.closedToday) {
      const now = Date.now();
      const closedTime = closeRecord.closedToday;
      const oneDayMs = 24 * 60 * 60 * 1000;
      
      if (now - closedTime < oneDayMs) {
        return false;
      }
    }

    return true;
  };

  // 获取公告
  const fetchAnnouncement = async () => {
    try {
      const res = await API.get('/api/announcement');
      const { success, data } = res.data;
      
      if (success && data && data.id) {
        setAnnouncement(data);
        const closeRecord = getCloseRecord();
        setShowAnnouncement(shouldShowAnnouncement(data, closeRecord));
      }
    } catch (error) {
      console.error('获取公告失败:', error);
    }
  };

  // 获取首页配置
  const fetchHomePageConfig = async () => {
    try {
      const res = await API.get('/api/homepage_config');
      const { success, data } = res.data;
      
      if (success && data) {
        setHomePageConfig(data);
        try {
          localStorage.setItem(STORAGE_KEYS.HOMEPAGE_CONFIG, JSON.stringify(data));
        } catch (error) {
          console.warn('无法缓存首页配置:', error);
        }
      }
    } catch (error) {
      console.error('获取首页配置失败:', error);
      // 尝试使用缓存
      try {
        const cached = localStorage.getItem(STORAGE_KEYS.HOMEPAGE_CONFIG);
        if (cached) {
          setHomePageConfig(JSON.parse(cached));
        }
      } catch (e) {
        console.error('无法读取缓存:', e);
      }
    }
  };

  // 今日关闭
  const handleCloseToday = () => {
    try {
      const closeRecord = getCloseRecord();
      closeRecord.closedToday = Date.now();
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT_CLOSE, JSON.stringify(closeRecord));
      setShowAnnouncement(false);
    } catch (error) {
      console.error('保存关闭记录失败:', error);
      setShowAnnouncement(false);
    }
  };

  // 永久关闭
  const handleClosePermanently = () => {
    try {
      const closeRecord = getCloseRecord();
      
      if (!closeRecord.closedPermanently) {
        closeRecord.closedPermanently = [];
      }
      
      if (announcement && !closeRecord.closedPermanently.includes(announcement.id)) {
        closeRecord.closedPermanently.push(announcement.id);
      }
      
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT_CLOSE, JSON.stringify(closeRecord));
      setShowAnnouncement(false);
    } catch (error) {
      console.error('保存关闭记录失败:', error);
      setShowAnnouncement(false);
    }
  };

  const displayNotice = async () => {
    const res = await API.get('/api/notice');
    const { success, message, data } = res.data;
    if (success) {
      let oldNotice = localStorage.getItem('notice');
      if (data !== oldNotice && data !== '') {
        const htmlNotice = marked(data);
        showNotice(htmlNotice, true);
        localStorage.setItem('notice', data);
      }
    } else {
      showError(message);
    }
  };

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = data;
      if (!data.startsWith('https://')) {
        content = marked.parse(data);
      }
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);
    } else {
      showError(message);
      setHomePageContent(t('home.loading_failed'));
    }
    setHomePageContentLoaded(true);
  };

  const getStartTimeString = () => {
    const timestamp = statusState?.status?.start_time;
    return timestamp2string(timestamp);
  };

  useEffect(() => {
    displayNotice().then();
    displayHomePageContent().then();
    fetchAnnouncement().then();
    fetchHomePageConfig().then(() => {
      setLoading(false);
    });
  }, []);

  // 如果正在加载，显示加载器
  if (loading) {
    return <Loader active>加载中...</Loader>;
  }

  // 如果配置为自定义模式且有配置数据，显示新首页
  if (homePageConfig && homePageConfig.mode === 'custom') {
    return (
      <>
        <AnnouncementModal
          open={showAnnouncement}
          onClose={() => setShowAnnouncement(false)}
          announcement={announcement}
          onCloseToday={handleCloseToday}
          onClosePermanently={handleClosePermanently}
        />
        
        <HeroSection config={homePageConfig.hero} />
        <FeaturesSection features={homePageConfig.features} />
        <ServicesSection services={homePageConfig.services} />
        <TutorialSection />
      </>
    );
  }

  // 否则显示原有首页
  return (
    <>
      <AnnouncementModal
        open={showAnnouncement}
        onClose={() => setShowAnnouncement(false)}
        announcement={announcement}
        onCloseToday={handleCloseToday}
        onClosePermanently={handleClosePermanently}
      />
      
      {homePageContentLoaded && homePageContent === '' ? (
        <div className='dashboard-container'>
          <Card fluid className='chart-card'>
            <Card.Content>
              <Card.Header className='header'>
                {t('home.welcome.title')}
              </Card.Header>
              <Card.Description style={{ lineHeight: '1.6' }}>
                <p>{t('home.welcome.description')}</p>
                {!userState.user && <p>{t('home.welcome.login_notice')}</p>}
              </Card.Description>
            </Card.Content>
          </Card>
          <Card fluid className='chart-card'>
            <Card.Content>
              <Card.Header>
                <Header as='h3'>{t('home.system_status.title')}</Header>
              </Card.Header>
              <Grid columns={2} stackable>
                <Grid.Column>
                  <Card
                    fluid
                    className='chart-card'
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}
                  >
                    <Card.Content>
                      <Card.Header>
                        <Header as='h3' style={{ color: '#444' }}>
                          {t('home.system_status.info.title')}
                        </Header>
                      </Card.Header>
                      <Card.Description
                        style={{ lineHeight: '2', marginTop: '1em' }}
                      >
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5em',
                          }}
                        >
                          <i className='info circle icon'></i>
                          <span style={{ fontWeight: 'bold' }}>
                            {t('home.system_status.info.name')}
                          </span>
                          <span>{statusState?.status?.system_name}</span>
                        </p>
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5em',
                          }}
                        >
                          <i className='code branch icon'></i>
                          <span style={{ fontWeight: 'bold' }}>
                            {t('home.system_status.info.version')}
                          </span>
                          <span>
                            {statusState?.status?.version || 'unknown'}
                          </span>
                        </p>
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5em',
                          }}
                        >
                          <i className='github icon'></i>
                          <span style={{ fontWeight: 'bold' }}>
                            {t('home.system_status.info.source')}
                          </span>
                          <a
                            href='https://github.com/songquanpeng/one-api'
                            target='_blank'
                            style={{ color: '#2185d0' }}
                          >
                            {t('home.system_status.info.source_link')}
                          </a>
                        </p>
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5em',
                          }}
                        >
                          <i className='clock outline icon'></i>
                          <span style={{ fontWeight: 'bold' }}>
                            {t('home.system_status.info.start_time')}
                          </span>
                          <span>{getStartTimeString()}</span>
                        </p>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>

                <Grid.Column>
                  <Card
                    fluid
                    className='chart-card'
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}
                  >
                    <Card.Content>
                      <Card.Header>
                        <Header as='h3' style={{ color: '#444' }}>
                          {t('home.system_status.config.title')}
                        </Header>
                      </Card.Header>
                      <Card.Description
                        style={{ lineHeight: '2', marginTop: '1em' }}
                      >
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5em',
                          }}
                        >
                          <i className='envelope icon'></i>
                          <span style={{ fontWeight: 'bold' }}>
                            {t('home.system_status.config.email_verify')}
                          </span>
                          <span
                            style={{
                              color: statusState?.status?.email_verification
                                ? '#21ba45'
                                : '#db2828',
                              fontWeight: '500',
                            }}
                          >
                            {statusState?.status?.email_verification
                              ? t('home.system_status.config.enabled')
                              : t('home.system_status.config.disabled')}
                          </span>
                        </p>
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5em',
                          }}
                        >
                          <i className='github icon'></i>
                          <span style={{ fontWeight: 'bold' }}>
                            {t('home.system_status.config.github_oauth')}
                          </span>
                          <span
                            style={{
                              color: statusState?.status?.github_oauth
                                ? '#21ba45'
                                : '#db2828',
                              fontWeight: '500',
                            }}
                          >
                            {statusState?.status?.github_oauth
                              ? t('home.system_status.config.enabled')
                              : t('home.system_status.config.disabled')}
                          </span>
                        </p>
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5em',
                          }}
                        >
                          <i className='wechat icon'></i>
                          <span style={{ fontWeight: 'bold' }}>
                            {t('home.system_status.config.wechat_login')}
                          </span>
                          <span
                            style={{
                              color: statusState?.status?.wechat_login
                                ? '#21ba45'
                                : '#db2828',
                              fontWeight: '500',
                            }}
                          >
                            {statusState?.status?.wechat_login
                              ? t('home.system_status.config.enabled')
                              : t('home.system_status.config.disabled')}
                          </span>
                        </p>
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5em',
                          }}
                        >
                          <i className='shield alternate icon'></i>
                          <span style={{ fontWeight: 'bold' }}>
                            {t('home.system_status.config.turnstile')}
                          </span>
                          <span
                            style={{
                              color: statusState?.status?.turnstile_check
                                ? '#21ba45'
                                : '#db2828',
                              fontWeight: '500',
                            }}
                          >
                            {statusState?.status?.turnstile_check
                              ? t('home.system_status.config.enabled')
                              : t('home.system_status.config.disabled')}
                          </span>
                        </p>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid>
            </Card.Content>
          </Card>
        </div>
      ) : (
        <>
          {homePageContent.startsWith('https://') ? (
            <iframe
              src={homePageContent}
              style={{ width: '100%', height: '100vh', border: 'none' }}
            />
          ) : (
            <div
              style={{ fontSize: 'larger' }}
              dangerouslySetInnerHTML={{ __html: homePageContent }}
            ></div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
