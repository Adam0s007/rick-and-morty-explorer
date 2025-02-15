import React from 'react';
import { Card, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface LocationProps {
  origin: { name: string; url: string };
  location: { name: string; url: string };
}

const LocationCard: React.FC<LocationProps> = ({ origin, location }) => (
  <Card fluid>
    <Card.Content>
      <Card.Header>Location Details</Card.Header>
    </Card.Content>
    <Card.Content>
      <List>
        <List.Item>
          <List.Content>
            <List.Header>Origin</List.Header>
            <List.Description>
              <Link to={origin.url} target="_blank">
                {origin.name}
              </Link>
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Location</List.Header>
            <List.Description>
              <Link to={location.url} target="_blank">
                {location.name}
              </Link>
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
);

export default LocationCard;
