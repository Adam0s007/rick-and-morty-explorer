import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterList from './CharacterList';
import { Character } from '../models/Character';

jest.mock('./CharacterCard', () => {
  return ({ character }: { character: Character }) => (
    <div data-testid="character-card">{character.name}</div>
  );
});

describe('CharacterList', () => {
  const sampleCharacter: Character = {
    id: 1,
    name: 'Sample Character',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'https://example.com/sample.png',
    episode: ['ep1'],
    url: '',
    created: ''
  };

  it('renders loader when loading is true', () => {
    render(
      <CharacterList characters={[]} loading={true} error={null} />
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error message when error is provided', () => {
    const errorMessage = 'Failed to fetch characters';
    render(
      <CharacterList characters={[]} loading={false} error={errorMessage} />
    );
    expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage);
  });

  it('renders "No characters found" when characters array is empty', () => {
    render(
      <CharacterList characters={[]} loading={false} error={null} />
    );
    expect(screen.getByTestId('no-results')).toHaveTextContent('No characters found');
  });

  it('renders character grid with CharacterCard components when characters are provided', () => {
    render(
      <CharacterList characters={[sampleCharacter]} loading={false} error={null} />
    );

    expect(screen.getByTestId('character-grid')).toBeInTheDocument();
    expect(screen.getByTestId('character-card')).toHaveTextContent(sampleCharacter.name);
  });
});
