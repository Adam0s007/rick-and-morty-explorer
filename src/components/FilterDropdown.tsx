import React from "react";
import { Dropdown } from "semantic-ui-react";

interface FilterDropdownProps {
  statusFilter: string;
  onFilterChange: (e: React.SyntheticEvent<HTMLElement>, data: any) => void;
}

const statusOptions = [
  { key: "all", text: "All", value: "" },
  { key: "alive", text: "Alive", value: "alive" },
  { key: "dead", text: "Dead", value: "dead" },
  { key: "unknown", text: "Unknown", value: "unknown" },
];

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  statusFilter,
  onFilterChange,
}) => (
  <Dropdown
    data-testid="status-dropdown"
    placeholder="Filter by status"
    selection
    options={statusOptions}
    value={statusFilter}
    onChange={onFilterChange}
    fluid
  />
);

export default FilterDropdown;
