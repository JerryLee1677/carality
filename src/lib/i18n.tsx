"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const languages = ["en", "zh"] as const;
export type Language = (typeof languages)[number];

const translations = {
  en: {
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
      body: "Discover your driving DNA with our AI-powered personality test. Match your unique traits to the perfect vehicle.",
      primaryCta: "Take the Test",
      secondaryCta: "Learn more",
      matchScore: "Match score",
      comfort: "Comfort",
      performance: "Performance",
      efficiency: "Efficiency",
      privacyTitle: "Your data stays yours.",
      privacyBody:
        "We never sell your results. Every response is processed locally and anonymized before it ever leaves your device.",
      dataTitle: "Powered by real data.",
      dataBody:
        "Our engine maps your answers against millions of owner profiles to surface vehicles you'll actually love.",
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
      privacy: "Your data is encrypted and anonymized. Privacy is built in.",
    },
  },
  zh: {
    site: {
      subtitle: "汽车人格匹配",
      quiz: "汽车人格测试",
      guides: "购车指南",
      contact: "联系我们",
      login: "登录",
      register: "注册",
      history: "历史记录",
      logout: "退出",
      footerDescription: "用汽车人格帮你更快缩小车型选择范围，先有判断，再去看参数。",
    },
    home: {
      title: "人格，遇见性能。",
      body: "通过 AI 驱动的人格测试发现你的驾驶 DNA，把你的独特特质匹配到最合适的车辆。",
      primaryCta: "开始测试",
      secondaryCta: "了解更多",
      matchScore: "匹配分数",
      comfort: "舒适",
      performance: "性能",
      efficiency: "能效",
      privacyTitle: "你的数据始终属于你。",
      privacyBody: "我们从不出售你的结果。每一条回答都会在离开设备前本地处理并匿名化。",
      dataTitle: "由真实数据驱动。",
      dataBody: "我们的引擎会基于数百万车主画像分析你的答案，找出你真正会喜欢的车。",
      previewTitle: "一个仪表盘，搞定每个决策。",
      previewBody: "人格画像、高分车型和推荐理由，全部集中在一个页面里查看。",
      personality: "人格画像",
      adventurer: "冒险家",
      topMatch: "最佳匹配",
      sportSuv: "运动 SUV",
    },
    quiz: {
      title: "选择你的模式。",
      subtitle: "选择适合当前日程的测试体验，两种模式同样匿名。",
      recommended: "推荐",
      standard: "标准版",
      standardDescription: "56 题。完整深挖算法，用于高精度车型匹配。",
      selectStandard: "选择标准版",
      speedMode: "极速版",
      speedDescription: "24 题。不到 2 分钟快速了解你的核心驾驶人格。",
      selectSpeed: "选择极速版",
      sessionTitle: "当前答题会话没有可恢复的题目",
      sessionBody: "这通常是因为页面被刷新，或者会话缓存已丢失。先重新开始一次测评，后面再继续完善会话恢复。",
      restart: "重新开始",
      standardQuiz: "标准测试",
      quickQuiz: "极速测试",
      questionOf: "第 {current} / {total} 题",
      submitting: "正在提交答案...",
      submitError: "答案提交失败：{message}",
      submitErrorFallback: "当前答案提交失败，请刷新页面后重试。",
      privacy: "你的数据已加密并匿名化，隐私保护内建于产品。",
    },
  },
} as const;

export type Translations = (typeof translations)[Language];

type LanguageContextValue = {
  language: Language;
  translations: Translations;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  translations: translations.en,
  setLanguage: () => undefined,
});

const storageKey = "carality:language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(storageKey);
    if (savedLanguage === "en" || savedLanguage === "zh") {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(storageKey, nextLanguage);
  }, []);

  const value = useMemo(
    () => ({
      language,
      translations: translations[language],
      setLanguage,
    }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
