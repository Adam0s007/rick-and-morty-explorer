import React from "react";
import { render, screen } from "@testing-library/react";
import GeneralInfoCard from "./GeneralInfoCard";
import { Character } from "../../models/Character";

const mockCharacter: Character = {
  id: 1,
  name: "Morty Smith",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth", url: "/location/1" },
  location: { name: "Citadel of Ricks", url: "/location/3" },
  image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  episode: ["https://rickandmortyapi.com/api/episode/1"],
  url: "https://rickandmortyapi.com/api/character/2",
  created: "2017-11-04T18:50:21.651Z",
};

describe("GeneralInfoCard", () => {
  it("displays the character information correctly", () => {
    render(
      <GeneralInfoCard title="General Information" character={mockCharacter} />,
    );

    expect(screen.getByText(/Species/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile URL/i)).toBeInTheDocument();
  });
});
