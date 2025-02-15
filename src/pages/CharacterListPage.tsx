import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useCharacters } from '../hooks/useCharacters';
import CharacterList from '../components/CharacterList';

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
    <CharacterList
      statusOptions={statusOptions}
      statusFilter={statusFilter}
      currentPage={currentPage}
      totalPages={totalPages}
      characters={characters}
      loading={loading}
      error={error}
      onFilterChange={handleFilterChange}
      onPrevPage={handlePrevPage}
      onNextPage={handleNextPage}
    />
  );
};

export default CharacterListPage;
