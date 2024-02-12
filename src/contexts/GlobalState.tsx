import React, {useEffect, useState} from 'react';
import {
  Appearance,
  ColorSchemeName,
  Dimensions,
  ScaledSize,
} from 'react-native';

interface GlobalStateProps {
  hello?: string;
  setHello?: (value: string) => void;
  children: React.ReactNode;
}
interface PrepContextProps {
  colorScheme?: ColorSchemeName;
  orientation?: 'PORTRAIT' | 'LANDSCAPE';
}
const PrepContext = React.createContext<PrepContextProps>({});

export const usePrepContext = () => React.useContext(PrepContext);
interface PrepContextProps {
  hello?: string;
  setHello?: (value: string) => void;
}

const GlobalState: React.FC<GlobalStateProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // STATES DEFINE HERE
  const colorScheme = Appearance.getColorScheme();
  const [orientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE'>(
    'PORTRAIT',
  );

  useEffect(() => {
    const detectOrientation = ({
      window: {width, height},
    }: {
      window: ScaledSize;
    }) => {
      setOrientation(width > height ? 'LANDSCAPE' : 'PORTRAIT');
    };

    const subscription = Dimensions.addEventListener(
      'change',
      detectOrientation,
    );

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <PrepContext.Provider value={{colorScheme, orientation}}>
      {children}
    </PrepContext.Provider>
  );
};
export default GlobalState;
