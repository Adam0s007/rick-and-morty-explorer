import React from "react";
import { Card, Loader, Message } from "semantic-ui-react";
import CharacterCard from "./CharacterCard";
import { Character } from "../models/Character";

interface CharacterGridProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

const CharacterList: React.FC<CharacterGridProps> = ({
  characters,
  loading,
  error,
}) => {
  if (loading) return <Loader active inline="centered" data-testid="loader" />;
  if (error)
    return <Message error content={error} data-testid="error-message" />;

  if (!loading && !error && characters.length === 0) {
    return <div data-testid="no-results">No characters found</div>;
  }
  return (
    <Card.Group
      data-testid="character-grid"
      itemsPerRow={4}
      stackable
      doubling
      style={{ alignItems: "flex-start", justifyContent: "center" }}
    >
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </Card.Group>
  );
};

export default CharacterList;
