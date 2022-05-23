import { createContext, useContext, useState } from 'react';

interface IFilledArea {
  left: number;
  bottom: number;
  width: number;
  height: number;
}

interface IBoardContext {
  width: number;
  height: number;
  filledAreas: IFilledArea[];
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  addFilledArea: (area: IFilledArea) => void;
  removeAllFilledAreas: () => void;
}

interface BoardContextProviderProps {
  children: React.ReactNode;
}

const initialContext: IBoardContext = {
  width: 0,
  height: 0,
  filledAreas: [],
  setWidth: () => {},
  setHeight: () => {},
  addFilledArea: () => {},
  removeAllFilledAreas: () => {},
};

const BoardContext = createContext<IBoardContext>(initialContext);

export const useBoardContext = () => useContext(BoardContext);

export const BoardContextProvider = ({
  children,
}: BoardContextProviderProps) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [filledAreas, setFilledAreas] = useState<IFilledArea[]>([]);

  const addFilledArea = (area: IFilledArea) => {
    setFilledAreas((prevFilledAreas) => [...prevFilledAreas, area]);
  };

  const removeAllFilledAreas = () => {
    setFilledAreas([]);
  };

  return (
    <BoardContext.Provider
      value={{
        width,
        height,
        filledAreas,
        setWidth,
        setHeight,
        addFilledArea,
        removeAllFilledAreas,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
