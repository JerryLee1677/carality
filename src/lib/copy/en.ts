import type { PartialCopy } from "./zh";

/** 英文后备文案。尚未覆盖的命名空间会在 `index.ts` 里整体回落中文。 */
export const en: PartialCopy = {
  site: {
    subtitle: "Auto Personality Match",
    quiz: "Personality Test",
    guides: "Guides",
    contact: "Contact Us",
    login: "Log In",
    register: "Sign Up",
    history: "History",
    logout: "Log Out",
    footerDescription:
      "Carality helps you narrow down vehicle choices by personality first, then specifications.",
  },
  home: {
    title: "Personality. Meets Performance.",
    body: "Discover your driving DNA with our personality test. Match your traits to the vehicles that fit you best.",
    primaryCta: "Take the Test",
    secondaryCta: "Learn more",
    matchScore: "Match score",
    comfort: "Comfort",
    performance: "Performance",
    efficiency: "Efficiency",
    privacyTitle: "Your data stays yours.",
    privacyBody:
      "We never sell or share your results. Take the test anonymously, with no sign-up and no link to your identity.",
    dataTitle: "Powered by real data.",
    dataBody:
      "Your answers map onto a vehicle trait model, filtering the mainstream pool down to the series that actually fit.",
    previewTitle: "One dashboard for every decision.",
    previewBody:
      "See your personality profile, top matches, and the reasons behind each recommendation in a single view.",
    personality: "Personality",
    adventurer: "Adventurer",
    topMatch: "Top match",
    sportSuv: "Sport SUV",
  },
  quiz: {
    title: "Choose your mode.",
    subtitle: "Select the testing experience that fits your schedule. Both are equally anonymous.",
    recommended: "Recommended",
    standard: "Standard",
    standardDescription:
      "56 questions. Our full deep-dive algorithm for high-precision vehicle matching.",
    selectStandard: "Select Standard",
    speedMode: "Speed Mode",
    speedDescription: "24 questions. A quick overview of your core driving personality in under 2 minutes.",
    selectSpeed: "Select Speed",
    sessionTitle: "Session Missing",
    sessionBody:
      "This usually happens after a refresh or when the session cache has been lost. Start a new assessment to continue.",
    restart: "Start Again",
    standardQuiz: "Standard Quiz",
    quickQuiz: "Quick Quiz",
    questionOf: "Question {current} of {total}",
    submitting: "Submitting your answer...",
    submitError: "Answer submission failed: {message}",
    submitErrorFallback: "We couldn't submit this answer. Please refresh and try again.",
    privacy:
      "Start an anonymous session without signing up. Your answers only feed your personality profile and vehicle recommendations.",
  },
};
