/* eslint-disable import/prefer-default-export */
import database from './database';

export const getSets = () => Object.values(database);
