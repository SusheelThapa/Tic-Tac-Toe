export interface FAQQuestionAnswer {
  question: string;
  answer: string;
}

export interface HowToPlay {
  title: string;
  text: string;
  element: null | string;
  position: string;
  highlight: boolean;
}
