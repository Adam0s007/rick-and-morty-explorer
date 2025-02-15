import React from 'react';
import { Card, Label } from 'semantic-ui-react';

const EpisodesCard: React.FC<{ episodes: string[] }> = ({ episodes }) => (
  <Card fluid>
    <Card.Content>
      <Card.Header>Episodes ({episodes.length})</Card.Header>
    </Card.Content>
    <Card.Content style={{ maxHeight: '200px', overflowY: 'auto' }}>
      <Label.Group
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        {episodes.map((episodeUrl, index) => (
          <Label
            key={index}
            color="blue"
            style={{
              margin: '0.5em',
              width: '12em',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            as="a"
            href={episodeUrl}
            target="_blank"
          >
            Episode {episodeUrl.split('/').pop()}
          </Label>
        ))}
      </Label.Group>
    </Card.Content>
  </Card>
);

export default EpisodesCard;
