import React from 'react';
import cn from 'classnames';

import styles from './Label.module.scss';

type BasicLabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;
interface Props extends BasicLabelProps {
  className?: string;
}

const Label = ({ className, ...restProps }: Props) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...restProps}
    className={cn(styles.label, 'form_label', className)}
  />
);

export default Label;
