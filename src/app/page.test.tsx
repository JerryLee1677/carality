import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders a minimal personality-first hero without legacy cards", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: /识别你的汽车人格/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /开始测试/i }),
    ).toHaveAttribute("href", "/quiz");
    expect(screen.queryByText(/比亚迪/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/12 Questions/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/移动端/i)).not.toBeInTheDocument();
  });
});
