import React, { useState } from 'react';
import { Card, Icon, Image, Label, Button } from 'semantic-ui-react';
import { Character } from '../models/Character';
import { useNavigate } from 'react-router-dom';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <Card
      raised
      centered
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        textAlign: 'left',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '20em'
      }}
      onClick={() => navigate(`/character/${character.id}`)}
    >
      <Image src={character.image} alt={character.name} wrapped ui={false} />
      
      <Card.Content>
        <Card.Header>{character.name}</Card.Header>
        <Card.Meta>{character.status}</Card.Meta>
      </Card.Content>

      <Card.Content extra style={{ padding: '1em' }}>
        <Label.Group style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em', justifyContent: 'space-between' }}>
          <Label color="blue" basic>
            <Icon name="venus mars" /> {character.gender}
          </Label>
          <Label color="teal" basic>
            <Icon name="user" /> {character.species}
          </Label>
        </Label.Group>
      </Card.Content>

      <Card.Content extra
        style={{
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.6)',
            width: '100%',
          overflow: 'hidden',
          transition: 'max-height 300ms ease, opacity 300ms ease, padding 300ms ease',
          maxHeight: hovered ? '80px' : '0px',
          opacity: hovered ? 1 : 0,
          textAlign: 'center',
          padding: hovered ? '1em' : '0 1em'
        }}
      >
        <Button color="blue" >
          View Details
        </Button>
      </Card.Content>
    </Card>
  );
};

export default CharacterCard;
