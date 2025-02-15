import React from 'react';
import { Card, Image, Icon, SemanticCOLORS } from 'semantic-ui-react';
import { Character } from '../../models/Character';

const statusColors: Record<Character['status'], SemanticCOLORS> = {
  Alive: 'green',
  Dead: 'red',
  unknown: 'grey'
};


const ProfileCard: React.FC<{ character: Character }> = ({ character }) => {
  const statusKey =
    character.status === 'Alive' || character.status === 'Dead'
      ? character.status
      : 'unknown';
  const statusIconName =
    character.status === 'Alive'
      ? 'heartbeat'
      : character.status === 'Dead'
      ? 'remove circle'
      : 'help circle';

  return (
    <Card fluid>
      <Image src={character.image} wrapped ui={false} alt={character.name} />
      <Card.Content>
        <Card.Header>
          {character.name} (id: {character.id})
        </Card.Header>
        <Card.Meta>
          <span>
            {character.status}{' '}
            <Icon name={statusIconName} color={statusColors[statusKey]} />
          </span>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;
