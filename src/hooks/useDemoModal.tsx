
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface DemoModalContextType {
  isOpen: boolean;
  openDemo: () => void;
  closeDemo: () => void;
}

const DemoModalContext = createContext<DemoModalContextType>({
  isOpen: false,
  openDemo: () => {},
  closeDemo: () => {},
});

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDemo = useCallback(() => setIsOpen(true), []);
  const closeDemo = useCallback(() => setIsOpen(false), []);

  return (
    <DemoModalContext.Provider value={{ isOpen, openDemo, closeDemo }}>
      {children}
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  return useContext(DemoModalContext);
}
