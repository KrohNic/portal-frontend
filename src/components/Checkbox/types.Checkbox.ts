import { ChangeEvent } from 'react';

type BasicCheckboxProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type DefinedProps = 'value' | 'children' | 'onChange';
type NotDefinedBasicCheckboxProps = Omit<BasicCheckboxProps, DefinedProps>;

export interface CheckboxProps extends NotDefinedBasicCheckboxProps {
  value?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
