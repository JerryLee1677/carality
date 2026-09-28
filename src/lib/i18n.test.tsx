import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { LanguageProvider, useLanguage } from "./i18n";

function LanguageProbe() {
  const { translations } = useLanguage();

  return <p>{translations.quiz.title}</p>;
}

describe("i18n", () => {
  it("switches the interface between English and Chinese", () => {
    render(
      <LanguageProvider>
        <LanguageSwitch />
        <LanguageProbe />
      </LanguageProvider>,
    );

    expect(screen.getByText("Choose your mode.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "中文" }));

    expect(screen.getByText("选择你的模式。")).toBeInTheDocument();
  });
});
