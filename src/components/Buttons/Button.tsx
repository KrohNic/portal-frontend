import React, { FC } from 'react';

import type { BasicButtonType } from './types.Buttons';

const Button: FC<BasicButtonType> = ({ type = 'button', ...restProps }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading, react/button-has-type
  <button {...restProps} type={type} />
);

export default Button;
