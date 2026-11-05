import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { LANGUAGE_COOKIE_NAME } from "@/lib/language";
import { LanguageProvider, useLanguage } from "./i18n";

function LanguageProbe() {
  const { translations } = useLanguage();

  return <p>{translations.quiz.title}</p>;
}

describe("i18n", () => {
  it("renders Chinese by default and switches to the English fallback", () => {
    render(
      <LanguageProvider initialLanguage="zh">
        <LanguageSwitch />
        <LanguageProbe />
      </LanguageProvider>,
    );

    expect(screen.getByText("选择你的模式。")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "EN" }));

    expect(screen.getByText("Choose your mode.")).toBeInTheDocument();
    expect(document.cookie).toContain(`${LANGUAGE_COOKIE_NAME}=en`);
  });

  it("falls back to Chinese when no provider is mounted", () => {
    render(<LanguageProbe />);

    expect(screen.getByText("选择你的模式。")).toBeInTheDocument();
  });
});
