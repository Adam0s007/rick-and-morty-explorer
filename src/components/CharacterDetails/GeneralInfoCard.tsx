import React from "react";
import { Card, Icon, List, SemanticICONS } from "semantic-ui-react";
import { Character } from "../../models/Character";

export interface InfoItem {
  label: string;
  value: string | React.ReactNode;
}

const genderIcons: Record<string, SemanticICONS> = {
  Male: "mars",
  Female: "venus",
  Genderless: "genderless",
  unknown: "question",
};

const GeneralInfoCard: React.FC<{ title: string; character: Character }> = ({
  title,
  character,
}) => {
  const items: InfoItem[] = [
    { label: "Species", value: character.species },
    { label: "Type", value: character.type || "Unknown" },
    {
      label: "Gender",
      value: (
        <>
          <Icon name={genderIcons[character.gender] || "question"} />{" "}
          {character.gender}
        </>
      ),
    },
    {
      label: "Created",
      value: new Date(character.created).toLocaleDateString(),
    },
    {
      label: "Profile URL",
      value: (
        <a href={character.url} target="_blank" rel="noopener noreferrer">
          {character.url}
        </a>
      ),
    },
  ];

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
      </Card.Content>
      <Card.Content style={{ overflowX: "auto" }}>
        <List>
          {items.map((item, index) => (
            <List.Item key={index}>
              <List.Content>
                <List.Header>{item.label}</List.Header>
                <List.Description>{item.value}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Card.Content>
    </Card>
  );
};

export default GeneralInfoCard;
