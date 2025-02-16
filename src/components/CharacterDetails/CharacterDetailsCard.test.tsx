import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterDetailsCard from './CharacterDetailsCard';
import { Character } from '../../models/Character';
import { MemoryRouter } from 'react-router-dom';
import { ROUTES } from '../../config/routes';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '/location/1' },
  location: { name: 'Citadel of Ricks', url: '/location/3' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z'
};

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => jest.fn(),
  };
});

describe('CharacterDetailsCard', () => {
  it('renders the "Back to Character List" button and reacts on click', () => {
    const mockNavigate = jest.fn();

    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

    render(
      <MemoryRouter>
        <CharacterDetailsCard character={mockCharacter} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /Back to Character List/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.CHARACTERS);
  });
});
