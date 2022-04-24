export type BasicButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type DefinedIconButtonProps = 'children';
export type IconButtonType = Omit<BasicButtonType, DefinedIconButtonProps>;
