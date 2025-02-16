import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCard from './CharacterCard';
import { MemoryRouter } from 'react-router-dom';
import { Character } from '../models/Character';

const character: Character = {
  id: 1,
  name: 'Test Character',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
  image: 'https://example.com/test-character.png',
  episode: [],
  url: '',
  created: ''
};

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => jest.fn(),
  };
});

describe('CharacterCard', () => {
  it('renders character info correctly', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={character} />
      </MemoryRouter>
    );

    
    const image = screen.getByRole('img', { name: character.name });
    expect(image).toHaveAttribute('src', character.image);

   
    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.status)).toBeInTheDocument();

    expect(screen.getByText(new RegExp(character.gender, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(character.species, 'i'))).toBeInTheDocument();


    const detailsButton = screen.queryByRole('button', { name: /view details/i });
    expect(detailsButton).not.toBeVisible();
  });

  it('reveals extra content on hover and hides on mouse leave', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={character} />
      </MemoryRouter>
    );

    const cardElement = screen.getByTestId('character-card');
    expect(cardElement).toBeInTheDocument();

    fireEvent.mouseEnter(cardElement!);
    const detailsButton = screen.getByRole('button', { name: /view details/i });
    expect(detailsButton).toBeVisible();

    fireEvent.mouseLeave(cardElement!);
    expect(detailsButton).not.toBeVisible();
  });

  it('navigates to character details page on click', () => {
    const mockNavigate = jest.fn();
    

    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

    render(
      <MemoryRouter>
        <CharacterCard character={character} />
      </MemoryRouter>
    );

    const cardElement = screen.getByTestId('character-card');
    expect(cardElement).toBeInTheDocument();


    fireEvent.click(cardElement!);
    expect(mockNavigate).toHaveBeenCalledWith(`/character/${character.id}`);
  });
});
