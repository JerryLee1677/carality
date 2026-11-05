import React from "react";
import { render, screen } from "@testing-library/react";
import GuidesPage from "./page";

describe("GuidesPage", () => {
  it("renders the buying guide heading", async () => {
    render(await GuidesPage());

    expect(
      screen.getByRole("heading", { name: /购车指南/i }),
    ).toBeInTheDocument();
  });
});
