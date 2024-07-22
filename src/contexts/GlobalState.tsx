import React, { useEffect, useState } from 'react';
import {
  Appearance,
  ColorSchemeName,
  Dimensions,
  ScaledSize,
} from 'react-native';

interface GlobalStateProps {
  children: React.ReactNode;
}
interface PrepContextProps {
  colorScheme?: ColorSchemeName;
  isFirstLaunch?: boolean;
  setUser?: (value: any) => void;
  user?: any;
  setIsFirstLaunch?: (value: boolean) => void;
  orientation?: 'PORTRAIT' | 'LANDSCAPE';
  setOrientation?: (value: 'PORTRAIT' | 'LANDSCAPE') => void;
  getCredits?: any;
  setGetCredits?: (value: any) => void;
  deviceWidth?: number;
  setUserPerformance?: (value: any) => void;
  userPerformance?: any;
  setPlanType?: (value: any) => void;
  planType?: any;
}
const PrepContext = React.createContext<PrepContextProps>({});

export const usePrepContext = () => React.useContext(PrepContext);
interface PrepContextProps {
  deviceWidth?: number;
  setUserPerformance?: (value: any) => void;
  userPerformance?: any;
}

const GlobalState: React.FC<GlobalStateProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // STATES DEFINE HERE
  const colorScheme = Appearance.getColorScheme();
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [user, setUser] = useState({});
  const [userPerformance, setUserPerformance] = useState<any>(null);
  const deviceWidth = Dimensions.get('window').width;
  const [getCredits, setGetCredits] = useState<any>(0);
  const [planType, setPlanType] = useState<any>('');
  const [orientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE'>(
    'PORTRAIT'
  );

  useEffect(() => {
    const detectOrientation = ({
      window: { width, height },
    }: {
      window: ScaledSize;
    }) => {
      setOrientation(width > height ? 'LANDSCAPE' : 'PORTRAIT');
    };

    const subscription = Dimensions.addEventListener(
      'change',
      detectOrientation
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <PrepContext.Provider
      value={{
        colorScheme,
        orientation,
        deviceWidth,
        isFirstLaunch,
        setIsFirstLaunch,
        setUser,
        user,
        userPerformance,
        setUserPerformance,
        getCredits,
        setGetCredits,
        planType,
        setPlanType,
      }}
    >
      {children}
    </PrepContext.Provider>
  );
};
export default GlobalState;
