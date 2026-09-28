import type { AssessmentQuestion } from "@/lib/assessment-session";
import type { Language } from "@/lib/i18n";

type QuestionTranslation = {
  title: string;
  description?: string;
};

const questionTranslations: Record<string, QuestionTranslation> = {
  "income-range": {
    title: "My household's annual disposable income can support a higher car purchase budget.",
    description: "This directly affects budget and monthly payment capacity.",
  },
  "family-size": { title: "My daily travel often carries three to five people." },
  "charging-access": { title: "I usually have stable and convenient access to charging." },
  "ownership-horizon": { title: "I prefer this car to stay with me over the long term." },
  "loan-pressure": { title: "If I buy with a loan, the monthly payment would weigh heavily on me." },
  "resale-focus": { title: "I care a lot about resale value and how easily the car can be sold later." },
  "child-seat-demand": { title: "Family trips often involve child seats or children riding in the car." },
  "elder-passenger-frequency": { title: "My daily travel often involves accompanying elderly passengers." },
  "cargo-space-demand": { title: "My usage often requires a larger trunk and stronger cargo capacity." },
  "daily-commute-distance": { title: "My daily commute is generally long." },
  "urban-congestion": { title: "My daily driving environment often has heavy traffic." },
  "parking-environment": { title: "Parking is usually tight in the places where I drive." },
  "highway-frequency": { title: "I frequently drive on highways or expressways." },
  "cross-city-usage": { title: "I often travel across cities or make spontaneous long-distance trips." },
  "full-load-frequency": { title: "My car is often close to being fully loaded." },
  "recharge-patience": { title: "I can accept spending some waiting time when recharging." },
  "winter-range-anxiety": {
    title: "I noticeably worry about range and energy consumption fluctuations in winter or extreme weather.",
  },
  "fixed-parking": { title: "I have a fixed parking spot or stable parking habits." },
  "driving-style": { title: "My driving style leans toward steady, easy, and low-hassle." },
  "control-vs-ease": {
    title: "In complex traffic, I prefer the car to provide more assistance and reduce my workload.",
  },
  "driver-assist-attitude": { title: "I am willing to actively use driver assistance and smart features." },
  "speed-response": { title: "When starting and overtaking, I expect direct and noticeable power response." },
  "maintenance-attitude": {
    title: "Even if a car is more complicated to maintain, I will accept that for richer features.",
  },
  "brand-importance": { title: "Brand strongly influences my car purchase decision." },
  "design-pay-premium": {
    title: "If both cars meet my needs, I am willing to pay more for design and refinement.",
  },
  "new-force-brand": { title: "If the product is strong enough, I am open to emerging EV brands." },
  "niche-brand-acceptance": {
    title: "If the car fits me well, I can accept a relatively niche brand.",
  },
  "cabin-tech-attitude": {
    title: "A high-tech, seamlessly connected cabin easily impresses me.",
  },
  "social-first-contact": {
    title: "When first test-driving a new car I am interested in, I proactively talk with sales and quickly learn its character.",
    description: "Choose the answer closest to your real reaction during the test drive.",
  },
  "weekend-plan": {
    title: "When researching a candidate car, I prefer to sort out configuration, reputation, and total cost first.",
  },
  "purchase-decision-style": {
    title: "Choosing between two expensive cars, I first consider long-term reputation and long-term value.",
  },
  "road-trip-role": {
    title: "Before a long road trip, my first thought is whether the route itself is interesting and worth stopping for.",
  },
  "group-trip-role": {
    title: "If friends go car shopping or test-driving together, I usually organize the order and comparison points.",
  },
  "risk-change-attitude": {
    title: "For newly redesigned or new-platform models, I prefer to wait for reputation and stability.",
  },
  "new-tech-upgrade": {
    title: "When a new technology launches, I am willing to try it before judging its value.",
  },
  "travel-role": {
    title: "On long drives, I want the car to respond promptly when overtaking or changing lanes.",
  },
  "child-comfort-priority": {
    title: "If family members or children often ride in the car, I worry more about comfort and quietness.",
  },
  "commute-priority": {
    title: "For daily commuting, I prioritize long-term energy consumption and maintenance costs.",
  },
  "rear-seat-priority": {
    title: "If the rear seats are often used, I focus more on legroom and ride comfort.",
  },
  "city-parking-priority": {
    title: "When parking is difficult in a crowded city, I want the car to have comprehensive assistance features.",
  },
  "family-weekend-car": {
    title: "On weekend family trips, I want the car to provide ample space and ride comfort.",
  },
  "brand-vs-value": {
    title: "If two cars have similar features, brand character and design attract me more easily.",
  },
  "weekend-trip-frequency": { title: "I often use my car for weekend short trips." },
  "suburban-family-usage": {
    title: "My weekend family outings are usually nearby or suburban activities.",
  },
  "daily-reliability-priority": {
    title: "It is very important to me that the car rarely has minor faults.",
  },
  "social-confidence-scene": {
    title: "If the dealership adds a test-drive route, I will ask to try more scenarios.",
  },
  "planning-bias-scene": {
    title: "Before visiting a dealership or test-driving, I check inventory, route, parking, and the schedule.",
  },
  "expression-scene": {
    title: "If I test a car I really like, I am willing to share what impresses me about it.",
  },
  "comfort-vs-style-home": {
    title: "If two similarly priced cars require a choice, I prioritize the one that is easy, dependable, and comfortable for everyone.",
  },
  "long-term-cost-view": {
    title: "When considering a car's long-term cost, I keep calculating the total and controlling future spending.",
  },
};

const optionTranslations = {
  en: {
    1: "Strongly Disagree",
    2: "Somewhat Disagree",
    3: "Neutral",
    4: "Somewhat Agree",
    5: "Strongly Agree",
  },
  zh: {
    1: "强烈不认同",
    2: "不太认同",
    3: "中立",
    4: "比较认同",
    5: "强烈认同",
  },
} as const;

export function getQuestionText(question: AssessmentQuestion, language: Language) {
  if (language === "zh") {
    return {
      title: question.title,
      description: question.description,
    };
  }

  const translation = questionTranslations[question.slug];

  return {
    title: translation?.title ?? question.title,
    description: translation?.description ?? question.description,
  };
}

export function getOptionLabel(order: 1 | 2 | 3 | 4 | 5, language: Language) {
  return optionTranslations[language][order];
}
