import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileCard from './ProfileCard';
import { Character } from '../../models/Character';

const aliveCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://example.com/rick.png',
  episode: ['episode1'],
  url: '',
  created: ''
};

const deadCharacter: Character = {
  id: 2,
  name: 'Birdperson',
  status: 'Dead',
  species: 'Bird-Person',
  type: '',
  gender: 'Male',
  origin: { name: 'Bird World', url: '' },
  location: { name: 'Planet Squanch', url: '' },
  image: 'https://example.com/birdperson.png',
  episode: ['episode2'],
  url: '',
  created: ''
};

const unknownCharacter: Character = {
  id: 3,
  name: 'Mystery',
  status: 'Unknown',
  species: 'Alien',
  type: '',
  gender: 'unknown',
  origin: { name: 'Unknown', url: '' },
  location: { name: 'Unknown', url: '' },
  image: 'https://example.com/unknown.png',
  episode: ['episode3'],
  url: '',
  created: ''
};

describe('ProfileCard', () => {
  it('renders correctly for an alive character', () => {
    render(<ProfileCard character={aliveCharacter} />);
    
    expect(screen.getByRole('img', { name: aliveCharacter.name })).toHaveAttribute('src', aliveCharacter.image);
    expect(screen.getByText(/Rick Sanchez \(id: 1\)/)).toBeInTheDocument();
    expect(screen.getByText(/Alive/)).toBeInTheDocument();

  });

  it('renders correctly for a dead character', () => {
    render(<ProfileCard character={deadCharacter} />);
    
    expect(screen.getByRole('img', { name: deadCharacter.name })).toHaveAttribute('src', deadCharacter.image);
    expect(screen.getByText(/Birdperson \(id: 2\)/)).toBeInTheDocument();
    expect(screen.getByText(/Dead/)).toBeInTheDocument();

  });

  it('renders correctly for an unknown status character', () => {
    render(<ProfileCard character={unknownCharacter} />);
    
    expect(screen.getByRole('img', { name: unknownCharacter.name })).toHaveAttribute('src', unknownCharacter.image);
    expect(screen.getByText(/Mystery \(id: 3\)/)).toBeInTheDocument();
    expect(screen.getByText(/Unknown/)).toBeInTheDocument();

  });
});
