import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import DOMPurify from 'dompurify';
import './AnnouncementModal.css';

const AnnouncementModal = ({ open, onClose, announcement, onCloseToday, onClosePermanently }) => {
  if (!announcement) return null;

  // 清理 HTML 内容，防止 XSS 攻击
  const sanitizedContent = DOMPurify.sanitize(announcement.content, {
    ALLOWED_TAGS: ['p', 'h3', 'ul', 'li', 'strong', 'em', 'a', 'br', 'div'],
    ALLOWED_ATTR: ['href', 'target', 'class']
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      size='small'
      className='announcement-modal'
      closeOnDimmerClick={false}
    >
      <Modal.Header>
        <Icon name='bullhorn' />
        {announcement.title}
      </Modal.Header>
      <Modal.Content scrolling>
        <div
          className='announcement-content'
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onCloseToday} basic>
          <Icon name='clock outline' />
          今日关闭
        </Button>
        <Button onClick={onClosePermanently} primary>
          <Icon name='check' />
          关闭公告
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AnnouncementModal;
