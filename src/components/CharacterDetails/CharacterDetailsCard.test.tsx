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
    useNavigate: jest.fn(),
  };
});


jest.mock('./ProfileCard', () => (props: any) => (
  <div data-testid="profile-card">Profile: {props.character.name}</div>
));
jest.mock('./GeneralInfoCard', () => (props: any) => (
  <div data-testid="general-info-card">{props.title}</div>
));
jest.mock('./LocationCard', () => (props: any) => (
  <div data-testid="location-card">
    {props.origin.name} - {props.location.name}
  </div>
));
jest.mock('./EpisodesCard', () => (props: any) => (
  <div data-testid="episodes-card">Episode: {props.episodes[0]}</div>
));

describe('CharacterDetailsCard', () => {
  it('renders the "Back to Character List" button and reacts on click', () => {
    const mockNavigate = jest.fn();
    const useNavigate = require('react-router-dom').useNavigate;
    useNavigate.mockImplementation(() => mockNavigate);

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

  it('renders ProfileCard with the correct character name', () => {
    render(
      <MemoryRouter>
        <CharacterDetailsCard character={mockCharacter} />
      </MemoryRouter>
    );
    const profileCard = screen.getAllByTestId('profile-card')[0];
    expect(profileCard).toHaveTextContent(`Profile: ${mockCharacter.name}`);
  });

  it('renders GeneralInfoCard with title "General Information"', () => {
    render(
      <MemoryRouter>
        <CharacterDetailsCard character={mockCharacter} />
      </MemoryRouter>
    );
    const generalInfoCards = screen.getAllByTestId('general-info-card');
    generalInfoCards.forEach((card) => {
      expect(card).toHaveTextContent('General Information');
    });
  });

  it('renders LocationCard with origin and location names', () => {
    render(
      <MemoryRouter>
        <CharacterDetailsCard character={mockCharacter} />
      </MemoryRouter>
    );
    const locationCards = screen.getAllByTestId('location-card');
    locationCards.forEach((card) => {
      expect(card).toHaveTextContent(`${mockCharacter.origin.name} - ${mockCharacter.location.name}`);
    });
  });

  it('renders EpisodesCard with the correct episode url', () => {
    render(
      <MemoryRouter>
        <CharacterDetailsCard character={mockCharacter} />
      </MemoryRouter>
    );
    const episodesCard = screen.getByTestId('episodes-card');
    expect(episodesCard).toHaveTextContent(`Episode: ${mockCharacter.episode[0]}`);
  });
});
