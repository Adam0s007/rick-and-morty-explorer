import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useCharacters } from '../hooks/useCharacters';
import { Grid } from 'semantic-ui-react';
import PaginationControls from '../components/PaginationControls';
import CharacterList from '../components/CharacterList';
import FilterDropdown from '../components/FilterDropdown';

const statusOptions = [
  { key: 'all', text: 'All', value: '' },
  { key: 'alive', text: 'Alive', value: 'alive' },
  { key: 'dead', text: 'Dead', value: 'dead' },
  { key: 'unknown', text: 'Unknown', value: 'unknown' },
];

const CharacterListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialStatus = searchParams.get('status') || '';
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [statusFilter, setStatusFilter] = useState<string>(initialStatus);

  useEffect(() => {
    setSearchParams({ page: currentPage.toString(), status: statusFilter });
  }, [currentPage, statusFilter, setSearchParams]);

  const { characters, totalPages, loading, error } = useCharacters({
    page: currentPage,
    status: statusFilter,
  });

  const handleFilterChange = (
    e: React.SyntheticEvent<HTMLElement>,
    { value }: any
  ) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

  return (
    <Grid padded container>
    <Grid.Row>
      <Grid.Column width={16}>
        <FilterDropdown
          statusOptions={statusOptions}
          statusFilter={statusFilter}
          onFilterChange={handleFilterChange}
        />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={16}>
        <CharacterList characters={characters} loading={loading} error={error} />
      </Grid.Column>
    </Grid.Row>
    <PaginationControls
      currentPage={currentPage}
      totalPages={totalPages}
      onPrevPage={handlePrevPage}
      onNextPage={handleNextPage}
    />
  </Grid>
  );
};

export default CharacterListPage;
