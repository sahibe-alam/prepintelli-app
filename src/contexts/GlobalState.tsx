import React from 'react';
import {Appearance, ColorSchemeName} from 'react-native';

interface GlobalStateProps {
  hello?: string;
  setHello?: (value: string) => void;
  children: React.ReactNode;
}
interface PrepContextProps {
  hello?: string;
  setHello?: (value: string) => void;
  colorScheme?: ColorSchemeName;
}
export const PrepContext = React.createContext<PrepContextProps>({});

interface PrepContextProps {
  hello?: string;
  setHello?: (value: string) => void;
}

const GlobalState: React.FC<GlobalStateProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hello, setHello] = React.useState<string>('Hello, World!');
  const colorScheme = Appearance.getColorScheme();

  return (
    <PrepContext.Provider value={{hello, setHello, colorScheme}}>
      {children}
    </PrepContext.Provider>
  );
};
export default GlobalState;
