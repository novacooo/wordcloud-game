export interface IWord {
  good: boolean;
  selected: boolean;
  checked: boolean;
}

export enum WordsActionKind {
  ADD_WORD = 'ADD_WORD',
  SET_GOOD_WORD = 'SET_GOOD_WORD',
  SELECT_WORD = 'SELECT_WORD',
  CHECK_WORD = 'CHECK_WORD',
  REMOVE_ALL_WORDS = 'REMOVE_ALL_WORDS',
}

export interface WordsAction {
  type: WordsActionKind;
  name?: string;
}

export interface IWordsState {
  [key: string]: IWord;
}

export const wordsReducer = (
  state: IWordsState,
  action: WordsAction,
): IWordsState => {
  const { type, name } = action;

  switch (type) {
    case WordsActionKind.ADD_WORD:
      if (!name) {
        return state;
      }
      return {
        ...state,
        [name]: {
          good: false,
          selected: false,
          checked: false,
        },
      };

    case WordsActionKind.SET_GOOD_WORD:
      if (!name) {
        return state;
      }
      return {
        ...state,
        [name]: {
          ...state[name],
          good: true,
        },
      };

    case WordsActionKind.SELECT_WORD:
      if (!name) {
        return state;
      }
      return {
        ...state,
        [name]: {
          ...state[name],
          selected: true,
        },
      };

    case WordsActionKind.CHECK_WORD:
      if (!name) {
        return state;
      }
      return {
        ...state,
        [name]: {
          ...state[name],
          checked: true,
        },
      };

    case WordsActionKind.REMOVE_ALL_WORDS:
      return {};

    default:
      return state;
  }
};
