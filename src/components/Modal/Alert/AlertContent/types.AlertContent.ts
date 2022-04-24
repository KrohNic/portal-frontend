import { ReactNode } from 'react';

export interface AlertContentProps {
  title?: string;
  onOk?: () => void;
  okButton?: ReactNode;
  children?: ReactNode;
}
