import { Module, Article } from './Types';

// export const modules: Module[] = [
//   { id: '1', title: 'Introduction to React', topic: 'React' },
//   { id: '2', title: 'State and Props', topic: 'React' },
//   { id: '3', title: 'Hooks Overview', topic: 'React' },
//   { id: '4', title: 'Async JavaScript', topic: 'JavaScript' },
//   { id: '5', title: 'Promises and Async/Await', topic: 'JavaScript' },
// ];

export const articles: { [key: string]: Article } = {
  '1': {
    id: '1',
    title: 'Introduction to React',
    content: `
    React is a JavaScript library for building user interfaces...
    it has tons of features and is widely used in the industry.
    
    it helps you to create reusable UI components...

    It is maintained by Facebook and a community of individual developers and companies.
    `,
    quiz: {
      question: 'What is React primarily used for?',
      options: ['Server-side rendering', 'Building user interfaces', 'Database management', 'Network requests'],
      correctAnswer: 1,
    },
  },
  '2': {
    id: '2',
    title: 'State and Props',
    content: 'State and props are the two types of data that control a component.',
    quiz: {
      question: 'What is a prop?',
      options: ['A part of the state', 'A method', 'A component attribute', 'A lifecycle event'],
      correctAnswer: 2,
    },
  },
  '3': {
    id: '3',
    title: 'Hooks Overview',
    content: 'Hooks are functions that let you use state and other React features.',
    quiz: {
      question: 'Which hook is used for managing state in a functional component?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswer: 0,
    },
  },
  '4': {
    id: '4',
    title: 'Async JavaScript',
    content: 'Async JavaScript allows you to execute code asynchronously.',
    quiz: {
      question: 'Which of the following is used to handle async operations?',
      options: ['Callbacks', 'Promises', 'Async/Await', 'All of the above'],
      correctAnswer: 3,
    },
  },
  '5': {
    id: '5',
    title: 'Promises and Async/Await',
    content: 'Promises and async/await are used to handle asynchronous tasks.',
    quiz: {
      question: 'What does async/await help you to avoid?',
      options: ['Nested callbacks', 'Synchronous code', 'Memory leaks', 'Network requests'],
      correctAnswer: 0,
    },
  },
};

