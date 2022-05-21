export interface IWord {
  name: string;
  selected: boolean;
  checked: boolean;
}

export enum WordsActionKind {
  ADD_WORD = 'ADD_WORD',
  SELECT_WORD = 'SELECT_WORD',
  CHECK_WORD = 'CHECK_WORD',
}

export interface WordsAction {
  type: WordsActionKind;
  name: string;
  selected: boolean;
  checked: boolean;
}

export const wordsReducer = (state: IWord[], action: WordsAction): IWord[] => {
  const { type, name, selected, checked } = action;

  switch (type) {
    case WordsActionKind.ADD_WORD:
      return [
        ...state,
        {
          name,
          selected,
          checked,
        },
      ];
    default:
      return state;
  }
};
