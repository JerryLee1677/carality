import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the personality-first hero and feature sections", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: /Personality\. Meets Performance\./i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Take the Test/i })).toHaveAttribute("href", "/quiz");
    expect(screen.getByRole("link", { name: /Learn more/i })).toHaveAttribute("href", "/guides");
    expect(screen.getByRole("heading", { name: /Your data stays yours\./i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Powered by real data\./i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /One dashboard for every decision\./i })).toBeInTheDocument();
  });
});
