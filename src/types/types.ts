export interface FAQQuestionAnswer {
  question: string;
  answer: string;
}

export interface TourStep {
  title: string;
  text: string;
  element: null | string;
  position: string;
  highlight: boolean;
  selector?:string
}
