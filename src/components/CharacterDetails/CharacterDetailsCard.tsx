import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import GeneralInfoCard from './GeneralInfoCard';
import LocationCard from './LocationCard';
import EpisodesCard from './EpisodesCard';
import { Character } from '../../models/Character';
import { ROUTES } from '../../config/routes';


const CharacterDetailsCard: React.FC<{ character: Character }> = ({ character }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button color="blue" onClick={() => navigate(ROUTES.CHARACTERS)} style={{ marginBottom: '1em' }}>
        Back to Character List
      </Button>
      <Grid>
        {/* Big screens (computer) */}
        <Grid.Row columns={3} only="computer">
          <Grid.Column computer={5}>
            <ProfileCard character={character} />
          </Grid.Column>
          <Grid.Column computer={5}>
            <GeneralInfoCard title="General Information" character={character} />
          </Grid.Column>
          <Grid.Column computer={6}>
            <LocationCard origin={character.origin} location={character.location} />
          </Grid.Column>
        </Grid.Row>

        {/* Medium screens (tablet) */}
        <Grid.Row columns={2} only="tablet">
          <Grid.Column tablet={8}>
            <ProfileCard character={character} />
          </Grid.Column>
          <Grid.Column tablet={8}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
              <div style={{ flex: 1, overflow: 'auto' }}>
                <GeneralInfoCard title="General Information" character={character} />
              </div>
              <div style={{ flex: 1, overflow: 'auto' }}>
                <LocationCard origin={character.origin} location={character.location} />
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

        {/* Small screens (mobile) */}
        <Grid.Row only="mobile">
          <Grid.Column mobile={16}>
            <ProfileCard character={character} />
            <GeneralInfoCard title="General Information" character={character} />
            <LocationCard origin={character.origin} location={character.location} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <EpisodesCard episodes={character.episode} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default CharacterDetailsCard;
