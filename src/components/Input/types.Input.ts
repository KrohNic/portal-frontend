type BasicInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type DefinedProps = 'type';
export type NotDefinedBasicInputProps = Omit<BasicInputProps, DefinedProps>;

export interface InputProps extends NotDefinedBasicInputProps {
  hasError?: boolean;
}
