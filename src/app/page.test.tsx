import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the personality-first hero and feature sections", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: /人格，遇见性能。/,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /开始测试/ })).toHaveAttribute("href", "/quiz");
    expect(screen.getByRole("link", { name: /了解更多/ })).toHaveAttribute("href", "/guides");
    expect(screen.getByRole("heading", { name: /你的数据始终属于你/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /由真实数据驱动/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /一个仪表盘，搞定每个决策/ })).toBeInTheDocument();
  });
});
