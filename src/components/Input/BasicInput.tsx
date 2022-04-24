import React, { useMemo } from 'react';

import type { ForwardedRef } from 'react';
import type { InputProps } from 'components/Input/types.Input';

const BasicInput = React.forwardRef(
  (
    { value, title, ...restProps }: InputProps,
    ref?: ForwardedRef<HTMLInputElement>,
  ) => {
    const inputTitle = useMemo(() => {
      if (title !== undefined) return title;

      if (value !== undefined) return String(value);

      return undefined;
    }, [value, title]);

    return (
      <input
        ref={ref}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
        value={value}
        title={inputTitle}
        type='text'
      />
    );
  },
);

export default BasicInput;
