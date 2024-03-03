import React, { createContext, useContext, useState, useEffect } from "react";

interface HistoryContextType {
  savedWords: string[];
  setSavedWords: React.Dispatch<React.SetStateAction<string[]>>;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryContextProvider: React.FC<any> = ({ children }) => {
  const [savedWords, setSavedWords] = useState<string[]>([]);

  useEffect(() => {
    const storedWords = localStorage.getItem("words");
    if (storedWords) {
      setSavedWords(JSON.parse(storedWords));
    }
  }, []);

  return (
    <HistoryContext.Provider value={{ savedWords, setSavedWords }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryContext = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error(
      "useHistoryContext must be used within an HistoryContextProvider"
    );
  }
  return context;
};
