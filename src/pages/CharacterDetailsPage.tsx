import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import CharacterDetailsCard from '../components/CharacterDetails/CharacterDetailsCard';
import { useCharacter } from '../hooks/useCharacter';

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { character, loading, error } = useCharacter(id!);

  if (loading) return <Loader active inline="centered" data-testid="loader"  />;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }} data-testid="error">{error}</div>;
  if (!character) return null;

  return <CharacterDetailsCard character={character} data-testid="character-details-card" />;
};

export default CharacterDetailPage;
