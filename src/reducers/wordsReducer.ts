export interface IWord {
  good: boolean;
  selected: boolean;
  checked: boolean;
  left: number;
  bottom: number;
}

export enum WordsActionKind {
  ADD = 'ADD',
  SET_GOOD = 'SET_GOOD',
  TOGGLE_SELECT = 'TOGGLE_SELECT',
  SET_CHECKED = 'SET_CHECKED',
  REMOVE_ALL = 'REMOVE_ALL',
  CHANGE_POSITION = 'CHANGE_POSITION',
}

export interface WordsAction {
  type: WordsActionKind;
  name?: string;
  left?: number;
  bottom?: number;
  width?: number;
  height?: number;
}

export interface IWordsState {
  [key: string]: IWord;
}

export const wordsReducer = (
  state: IWordsState,
  action: WordsAction,
): IWordsState => {
  const { type, name, left, bottom } = action;

  switch (type) {
    case WordsActionKind.ADD:
      if (!name) {
        return state;
      }
      return {
        ...state,
        [name]: {
          good: false,
          selected: false,
          checked: false,
          left: 0,
          bottom: 0,
        },
      };

    case WordsActionKind.SET_GOOD:
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

    case WordsActionKind.TOGGLE_SELECT:
      if (!name) {
        return state;
      }
      return {
        ...state,
        [name]: {
          ...state[name],
          selected: !state[name].selected,
        },
      };

    case WordsActionKind.SET_CHECKED:
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

    case WordsActionKind.REMOVE_ALL:
      return {};

    case WordsActionKind.CHANGE_POSITION:
      if (!name || !left || !bottom) {
        return state;
      }
      return {
        ...state,
        [name]: {
          ...state[name],
          left,
          bottom,
        },
      };

    default:
      return state;
  }
};
