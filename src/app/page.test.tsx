import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the primary CTA and value proposition", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: /找到最适合你的汽车人格与选车方案/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /开始测试/i }),
    ).toHaveAttribute("href", "/quiz");
  });
});
