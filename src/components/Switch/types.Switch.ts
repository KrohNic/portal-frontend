type BasicBtnProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type DefinedProps =
  | 'children'
  | 'onClick'
  | 'type'
  | 'role'
  | 'aria-checked'
  | 'value'
  | 'onChange';
type NotDefinedBasicBtnProps = Omit<BasicBtnProps, DefinedProps>;

export interface SwitchProps extends NotDefinedBasicBtnProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
}
