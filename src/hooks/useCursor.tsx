import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type CursorVariant = 'default' | 'pointer' | 'text' | 'project' | 'hidden';

export interface CursorContextType {
  variant: CursorVariant;
  cursorText: string;
  setCursorVariant: (variant: CursorVariant, text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  variant: 'default',
  cursorText: '',
  setCursorVariant: () => {},
  resetCursor: () => {},
});

export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState<string>('');

  const setCursorVariant = (newVariant: CursorVariant, text: string = '') => {
    setVariant(newVariant);
    setCursorText(text);
  };

  const resetCursor = () => {
    setVariant('default');
    setCursorText('');
  };

  return (
    <CursorContext.Provider value={{ variant, cursorText, setCursorVariant, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = (): CursorContextType => useContext(CursorContext);
