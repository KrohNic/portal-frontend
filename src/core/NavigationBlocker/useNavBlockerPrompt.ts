import { useCallback, useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

type ITx = { retry: () => void };

type NavigatorType = {
  block: (cb: (tx: ITx) => void) => () => void;
};

export const useNavBlockerPrompt = (
  message: string,
  when = true,
  onOk?: () => void,
) => {
  const { navigator } = useContext(NavigationContext);

  const blocker = useCallback(
    (tx: ITx) => {
      // eslint-disable-next-line no-alert
      const isConfirmed = window.confirm(message);

      if (!isConfirmed) return;

      if (onOk) onOk();

      tx.retry();
    },
    [message, onOk],
  );

  useEffect(() => {
    if (!when) return undefined;

    const unblock = (navigator as unknown as NavigatorType).block((tx: ITx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [when, blocker, navigator]);
};
