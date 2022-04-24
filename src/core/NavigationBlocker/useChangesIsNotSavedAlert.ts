import { changesIsNotSavedLabel } from 'constants/labels';
import { useNavBlockerPrompt } from './useNavBlockerPrompt';

export const useChangesIsNotSavedAlert = (when = true, onOk?: () => void) =>
  useNavBlockerPrompt(changesIsNotSavedLabel, when, onOk);
