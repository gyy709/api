import React from 'react';
import { Container, Grid, Card, Icon, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './ServicesSection.css';

const ServicesSection = ({ services }) => {
  if (!services || services.length === 0) return null;

  return (
    <div className='services-section'>
      <Container>
        <Header as='h2' textAlign='center' className='section-title'>
          AI 模型服务
        </Header>
        <Grid columns={4} stackable doubling>
          {services.map((service) => (
            <Grid.Column key={service.id}>
              <Card fluid className='service-card'>
                <Card.Content textAlign='center'>
                  <Icon name={service.icon} size='huge' />
                  <Card.Header className='service-title'>
                    {service.title}
                  </Card.Header>
                  <Card.Description className='service-description'>
                    {service.description}
                  </Card.Description>
                  {service.link && (
                    <Link to={service.link} className='service-link'>
                      了解更多 →
                    </Link>
                  )}
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ServicesSection;
