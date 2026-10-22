import { describe, expect, it } from "vitest";
import { getOptionLabel, getQuestionText } from "./quiz-question-translations";
import { questionBankExtension } from "../../apps/api/src/modules/questions/question-bank-extension";

describe("concrete quiz choices", () => {
  it("provides English wording for every expanded scenario", () => {
    for (const scenario of questionBankExtension) {
      const text = getQuestionText({ slug: scenario.slug, title: scenario.title, description: "中文说明" } as never, "en");
      expect(text.title).toBe(scenario.englishTitle);
      expect(text.description).not.toMatch(/[\u4e00-\u9fff]/);
    }
  });
  it("renders actual Chinese budget labels including a sixth option", () => {
    expect(getOptionLabel(3, "zh", "budget-range", "16–22 万元")).toBe("16–22 万元");
    expect(getOptionLabel(6, "zh", "budget-range", "50 万元以上")).toBe("50 万元以上");
  });

  it("translates factual choices and their instructions", () => {
    expect(getOptionLabel(4, "en", "charging-availability", "目前没有方便的充电条件"))
      .toBe("No convenient charging available");
    expect(getOptionLabel(1, "en", "energy-preference", "只考虑燃油或不插电混动"))
      .toBe("Gasoline or non-plug-in hybrid only");
    expect(getQuestionText({ slug: "budget-range", title: "预算", description: "中文说明" } as never, "en").description)
      .not.toBe("中文说明");
  });

  it("keeps agreement translations and unknown server choices usable", () => {
    expect(getOptionLabel(2, "zh", "driving-style", "不太认同")).toBe("比较不认同");
    expect(getOptionLabel(2, "zh", "driving-style", "比较不认同")).toBe("比较不认同");
    expect(getOptionLabel(4, "zh", "driving-style", "比较认同")).toBe("比较认同");
    expect(getOptionLabel(2, "en", "driving-style", "不太认同")).toBe("Somewhat Disagree");
    expect(getOptionLabel(4, "en", "driving-style", "比较认同")).toBe("Somewhat Agree");
    expect(getOptionLabel(6, "en", "future-question", "Custom choice")).toBe("Custom choice");
  });
});
