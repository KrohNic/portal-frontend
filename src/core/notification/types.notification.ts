export interface INotificationContext {
  notify: (msg: string) => void;
  notifyTextCopy: () => void;
}

export interface INotification {
  msg: string;
  id: string;
  timeoutId: NodeJS.Timeout;
}
