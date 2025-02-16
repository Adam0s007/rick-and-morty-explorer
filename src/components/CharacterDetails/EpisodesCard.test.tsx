import React from "react";
import { render, screen } from "@testing-library/react";
import EpisodesCard from "./EpisodesCard";

describe("EpisodesCard", () => {
  it("renders the correct number of episodes and links", () => {
    const episodes = [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
    ];
    render(<EpisodesCard episodes={episodes} />);

    expect(screen.getByText(/Episodes \(2\)/i)).toBeInTheDocument();
    episodes.forEach((episodeUrl) => {
      const episodeNumber = episodeUrl.split("/").pop();
      expect(
        screen.getByText(new RegExp(`Episode ${episodeNumber}`, "i")),
      ).toBeInTheDocument();
    });
  });
});
