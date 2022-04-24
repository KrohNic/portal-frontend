import { ReactNode } from 'react';

export interface ConfirmContentProps {
  title: string;
  onOk?: () => void;
  okButton?: ReactNode;
  onCancel?: () => void;
  cancelButton?: ReactNode;
  children?: ReactNode;
}
