export interface FAQQuestionAnswer {
  question: string;
  answer: string;
}

export interface TourStep {
  title: string;
  text?: string;
  element: null | string;
  position: string;
  highlight: boolean;
  progressBar?: boolean;
  selector?: string;
  input?: boolean;
  input_placeholder?: string;
}
