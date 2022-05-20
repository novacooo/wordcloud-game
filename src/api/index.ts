/* eslint-disable import/prefer-default-export */
import database from './database';

const { questions } = database;

export const getQuestions = () => {
  return new Promise((resolve, reject) => {
    if (!questions) {
      setTimeout(() => reject(new Error('Questions not found')), 250);
    }

    setTimeout(() => resolve(Object.values(questions)), 250);
  });
};

export const getQuestion = (id: string) => {
  return new Promise((resolve, reject) => {
    const question = questions[id];

    if (!question) {
      setTimeout(() => reject(new Error('Question not found')), 250);
    }

    setTimeout(() => resolve(question), 250);
  });
};
