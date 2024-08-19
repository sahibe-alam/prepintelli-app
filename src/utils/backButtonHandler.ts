// utils/backButtonHandler.ts

import { BackHandler } from 'react-native';

type ShowMessageFunction = (message: string) => void;

export const createDoubleBackHandler = (
  showMessage: ShowMessageFunction,
  exitApp: () => void = BackHandler.exitApp,
  timeFrame: number = 2000
) => {
  let backPressedOnce = false;
  let timeoutId: NodeJS.Timeout | null = null;

  const handleBackPress = () => {
    if (backPressedOnce) {
      // Second press within the time frame, exit the app
      exitApp();
      return true;
    }

    // First press
    backPressedOnce = true;
    showMessage('Press back again to exit');

    // Reset the flag after the specified timeFrame
    timeoutId = setTimeout(() => {
      backPressedOnce = false;
    }, timeFrame);

    return true;
  };

  const cleanup = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return { handleBackPress, cleanup };
};
