import React from 'react';
import { Dropdown } from 'semantic-ui-react';

interface FilterDropdownProps {
  statusOptions: { key: string; text: string; value: string }[];
  statusFilter: string;
  onFilterChange: (e: React.SyntheticEvent<HTMLElement>, data: any) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  statusOptions,
  statusFilter,
  onFilterChange,
}) => (
  <Dropdown
    placeholder="Filter by status"
    selection
    options={statusOptions}
    value={statusFilter}
    onChange={onFilterChange}
    fluid
  />
);

export default FilterDropdown;
