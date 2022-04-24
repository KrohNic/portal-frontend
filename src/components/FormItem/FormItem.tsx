import React, { JSXElementConstructor, ReactNode } from 'react';

import Label from 'components/Label/Label';
import ValidationMsg from 'components/ValidationMsg/ValidationMsg';

interface ComponentProps<T> {
  id: string;
  name: string;
  hasError: boolean;
  value: T;
  onChange?: (event: { target: { value: T } }) => void;
  disabled?: boolean;
  onCopy?: () => void;
  placeholder?: string;
}

interface FormItemProps<T> {
  name: string;
  label?: ReactNode;
  InputComponent: JSXElementConstructor<ComponentProps<T>>;
  value: T;
  onChange?: (value: T, name: string) => void;
  errorMsg?: string;
  className?: string;
  disabled?: boolean;
  onCopy?: () => void;
  placeholder?: string;
  labelClassName?: string;
}

const FormItem = <T extends unknown>({
  name,
  label,
  InputComponent,
  value,
  onChange,
  errorMsg,
  className,
  disabled,
  onCopy,
  placeholder,
  labelClassName,
}: FormItemProps<T>) => (
  <div className={className}>
    <Label className={labelClassName} htmlFor={name}>
      {label}

      <InputComponent
        id={name}
        name={name}
        hasError={Boolean(errorMsg)}
        value={value}
        disabled={disabled}
        onChange={onChange && ((event) => onChange(event.target.value, name))}
        onCopy={onCopy}
        placeholder={placeholder}
      />
    </Label>

    <ValidationMsg message={errorMsg} />
  </div>
);

export default FormItem;
