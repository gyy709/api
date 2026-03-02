import React from 'react';
import { Container, Grid, Card, Icon, Header } from 'semantic-ui-react';
import './FeaturesSection.css';

const FeaturesSection = ({ features }) => {
  if (!features || features.length === 0) return null;

  return (
    <div className='features-section'>
      <Container>
        <Header as='h2' textAlign='center' className='section-title'>
          核心优势
        </Header>
        <Grid columns={3} stackable doubling>
          {features.map((feature) => (
            <Grid.Column key={feature.id}>
              <Card fluid className='feature-card'>
                <Card.Content textAlign='center'>
                  <Icon name={feature.icon} size='huge' />
                  <Card.Header className='feature-title'>
                    {feature.title}
                  </Card.Header>
                  <Card.Description className='feature-description'>
                    {feature.description}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default FeaturesSection;
