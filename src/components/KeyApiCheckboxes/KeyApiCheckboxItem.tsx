import React from 'react';

import Checkbox from 'components/Checkbox/Checkbox';

interface Props {
  keyApiName: string;
  label: string;
  value: boolean;
  onKeyApiChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => void;
}

const KeyApiCheckboxItem = ({
  keyApiName,
  label,
  value,
  onKeyApiChange,
}: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onKeyApiChange(event, keyApiName);

  return (
    <label className='labeled_checkbox label_text' htmlFor={keyApiName}>
      <Checkbox
        id={keyApiName}
        name={keyApiName}
        value={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default React.memo(KeyApiCheckboxItem);
