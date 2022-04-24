import { useContext } from 'react';

import { NotificationContext } from './notificationProvider';

export const useNotify = () => useContext(NotificationContext);
