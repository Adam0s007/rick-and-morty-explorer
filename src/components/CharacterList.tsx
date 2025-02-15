import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import CharacterCard from './CharacterCard';
import { Character } from '../models/Character';

interface CharacterGridProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

const CharacterList: React.FC<CharacterGridProps> = ({ characters, loading, error }) => {
  if (loading) return <Loader active inline="centered" />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <Card.Group
      itemsPerRow={4}
      stackable
      doubling
      style={{ alignItems: 'flex-start', justifyContent: 'center' }}
    >
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </Card.Group>
  );
};

export default CharacterList;
