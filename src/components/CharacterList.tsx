import React from 'react';
import { Grid, Dropdown, Button, Loader, Card } from 'semantic-ui-react';
import CharacterCard from '../components/CharacterCard';
import { Character } from '../models/Character';

interface HomePageViewProps {
  statusOptions: { key: string; text: string; value: string }[];
  statusFilter: string;
  currentPage: number;
  totalPages: number;
  characters: Character[];
  loading: boolean;
  error: string | null;
  onFilterChange: (e: React.SyntheticEvent<HTMLElement>, data: any) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const CharacterList: React.FC<HomePageViewProps> = ({
  statusOptions,
  statusFilter,
  currentPage,
  totalPages,
  characters,
  loading,
  error,
  onFilterChange,
  onPrevPage,
  onNextPage,
}) => {
  return (
    <Grid padded container>
      <Grid.Row>
        <Grid.Column>
          <Dropdown
            placeholder="Filter by status"
            selection
            options={statusOptions}
            value={statusFilter}
            onChange={onFilterChange}
            fluid
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        {loading ? (
          <Loader active inline="centered" />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <Card.Group  itemsPerRow={4} stackable doubling style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
            {characters.map((character: Character) => (
              <CharacterCard key={character.id} character={character}  />
            ))}
          </Card.Group>
        )}
      </Grid.Row>
      <Grid.Row centered style={{ 
            position: 'sticky', 
            bottom: 0, 
            left: 0, 
            width: '100%', 
            padding: '1em',
            background: 'white',
            boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'

        }}>
        <Button.Group>
            <Button icon="angle left" onClick={onPrevPage} disabled={currentPage === 1} />
            <Button content={`Page ${currentPage} of ${totalPages}`}   style={{ opacity: 1, pointerEvents: 'none' }}    />
            <Button icon="angle right" onClick={onNextPage} disabled={currentPage === totalPages} />
        </Button.Group>
      </Grid.Row>


    </Grid>
  );
};

export default CharacterList;
