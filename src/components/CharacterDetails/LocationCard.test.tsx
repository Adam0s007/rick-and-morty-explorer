import React from 'react';
import { render, screen } from '@testing-library/react';
import LocationCard from './LocationCard';
import { MemoryRouter } from 'react-router-dom';

describe('LocationCard', () => {
  const origin = { name: 'Earth', url: '/location/earth' };
  const location = { name: 'Citadel of Ricks', url: '/location/citadel' };

  it('renders location details correctly', () => {
    render(
      <MemoryRouter>
        <LocationCard origin={origin} location={location} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Location Details/i)).toBeInTheDocument();

    expect(screen.getByText(/Origin/i)).toBeInTheDocument();
    const originLink = screen.getByRole('link', { name: origin.name });
    expect(originLink).toBeInTheDocument();
    expect(originLink).toHaveAttribute('href', origin.url);

    expect(screen.getByText(/^Location$/i)).toBeInTheDocument();
    const locationLink = screen.getByRole('link', { name: location.name });
    expect(locationLink).toBeInTheDocument();
    expect(locationLink).toHaveAttribute('href', location.url);
  });
});
