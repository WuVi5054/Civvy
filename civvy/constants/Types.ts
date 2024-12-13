export interface Module {
    id: string;
    title: string;
    topic: string;
  }
  
  export interface Article {
    id: string;
    title: string;
    content: string;
    quiz: Quiz;
  }
  
  export interface Quiz {
    question: string;
    options: string[];
    correctAnswer: number;
  }
  
  