export type QuestionSummary = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  branchKey: string | null;
  type: string;
  options: Array<{
    id: string;
    label: string;
    order: number;
  }>;
};
