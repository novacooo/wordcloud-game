import { createContext, useContext, useState } from 'react';

interface IAppContext {
  isLoggedIn: boolean;
  nickname?: string;
  score?: number;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setNickname: (nickname: string | undefined) => void;
  setScore: (number: number | undefined) => void;
}

interface AppContextProviderProps {
  children: React.ReactNode;
}

const initialContext: IAppContext = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  setNickname: () => {},
  setScore: () => {},
};

const AppContext = createContext<IAppContext>(initialContext);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>();
  const [score, setScore] = useState<number>();

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        nickname,
        score,
        setIsLoggedIn,
        setNickname,
        setScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
