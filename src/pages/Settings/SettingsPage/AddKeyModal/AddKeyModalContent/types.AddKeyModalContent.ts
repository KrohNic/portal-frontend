import type {
  DetailedKeyKeys,
  IDetailedKey,
} from 'pages/DetailedKey/types.DetailedKey';

export type INewKey = Omit<
  IDetailedKey,
  DetailedKeyKeys.value | DetailedKeyKeys.isActive | 'id'
>;

export interface IAddKeyModalContentProps {
  onClose: () => void;
}
