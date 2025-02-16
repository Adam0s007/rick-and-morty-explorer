import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useCharacter } from '../hooks/useCharacter';
import CharacterDetailPage from './CharacterDetailsPage';

jest.mock('../hooks/useCharacter');

jest.mock('../components/CharacterDetails/CharacterDetailsCard', () => {
  return (props: any) => (
    <div data-testid="character-details-card">{props.character.name}</div>
  );
});

describe('CharacterDetailPage', () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetailPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders loader when loading is true', () => {
    (useCharacter as jest.Mock).mockReturnValue({
      character: null,
      loading: true,
      error: null,
    });

    renderWithRouter();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error message when error exists', () => {
    const errorMessage = 'Error fetching character';
    (useCharacter as jest.Mock).mockReturnValue({
      character: null,
      loading: false,
      error: errorMessage,
    });

    renderWithRouter();
    expect(screen.getByTestId('error')).toHaveTextContent(errorMessage);
  });

  it('renders CharacterDetailsCard when character data is available', () => {
    const fakeCharacter = { id: 1, name: 'Rick Sanchez' };
    (useCharacter as jest.Mock).mockReturnValue({
      character: fakeCharacter,
      loading: false,
      error: null,
    });

    renderWithRouter();
    const detailsCard = screen.getByTestId('character-details-card');
    expect(detailsCard).toBeInTheDocument();
    expect(detailsCard).toHaveTextContent('Rick Sanchez');
  });
});
