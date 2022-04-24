import React, {
  createContext,
  FC,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { nanoid } from 'nanoid';

import NotificationWrapper from './NotificationWrapper/NotificationWrapper';
import { NOTIFICATION_LIFETIME } from './constants.notification';

import type { INotification, INotificationContext } from './types.notification';

export const NotificationContext = createContext<INotificationContext>({
  notify: () => {},
  notifyTextCopy: () => {},
});

export const NotificationProvider: FC = ({ children }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addTaskRemoveNotification = useCallback(
    (notificationId: string) =>
      setTimeout(
        () =>
          setNotifications((currentNotifications) =>
            currentNotifications.filter(({ id }) => id !== notificationId),
          ),
        NOTIFICATION_LIFETIME,
      ),
    [],
  );

  const updateLifetime = useCallback(
    (last: INotification, currentNotifications: INotification[]) => {
      clearTimeout(last.timeoutId);
      const newTimeoutId = addTaskRemoveNotification(last.id);

      const notificationsCopy = currentNotifications.slice();
      const lastOfCopy = notificationsCopy[notificationsCopy.length - 1];

      lastOfCopy.timeoutId = newTimeoutId;

      return notificationsCopy;
    },
    [addTaskRemoveNotification],
  );

  const notify = useCallback(
    (msg: string) => {
      const notificationId = nanoid();

      setNotifications((currentNotifications) => {
        const last = currentNotifications[currentNotifications.length - 1];
        const timeoutId = addTaskRemoveNotification(notificationId);

        if (last === undefined || last.msg !== msg)
          return currentNotifications.concat({
            msg,
            timeoutId,
            id: notificationId,
          });

        return updateLifetime(last, currentNotifications);
      });
    },
    [addTaskRemoveNotification, updateLifetime],
  );

  const notifyTextCopy = useCallback(() => notify('Скопировано'), [notify]);

  const value = useMemo(
    () => ({ notify, notifyTextCopy }),
    [notify, notifyTextCopy],
  );

  return (
    <NotificationContext.Provider value={value}>
      <NotificationWrapper notifications={notifications} />
      {children}
    </NotificationContext.Provider>
  );
};
