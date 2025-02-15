import React from 'react';
import { Button, Grid } from 'semantic-ui-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}) => (
  <Grid.Row
    centered
    style={{
      position: 'sticky',
      bottom: 0,
      left: 0,
      width: '100%',
      padding: '1em',
      background: 'white',
      boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
    }}
  >
    <Button.Group>
      <Button icon="angle left" onClick={onPrevPage} disabled={currentPage === 1} />
      <Button content={`Page ${currentPage} of ${totalPages}`} style={{ opacity: 1, pointerEvents: 'none' }} />
      <Button icon="angle right" onClick={onNextPage} disabled={currentPage === totalPages} />
    </Button.Group>
  </Grid.Row>
);

export default PaginationControls;
