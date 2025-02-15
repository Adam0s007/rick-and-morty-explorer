import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import CharacterDetailsCard from '../components/CharacterDetails/CharacterDetailsCard';
import { useCharacter } from '../hooks/useCharacter';

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { character, loading, error } = useCharacter(id!);

  if (loading) return <Loader active inline="centered" />;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
  if (!character) return null;

  return <CharacterDetailsCard character={character}  />;
};

export default CharacterDetailPage;
