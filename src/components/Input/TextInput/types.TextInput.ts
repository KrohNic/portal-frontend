import BasicInput from 'components/Input/BasicInput';

export interface TextInputProps
  extends React.ComponentProps<typeof BasicInput> {
  clearable?: boolean;
}
