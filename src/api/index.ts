/* eslint-disable import/prefer-default-export */
import database from './database';

const { questions } = database;

export const getQuestions = () => {
  return new Promise((resolve, reject) => {
    if (!questions) {
      setTimeout(() => reject(new Error('Questions not found')), 500);
    }

    setTimeout(() => resolve(Object.values(questions)), 500);
  });
};
