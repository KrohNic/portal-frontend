export type SelectOption<SelectOptionValue> = {
  label: string;
  value: SelectOptionValue;
};

export interface SelectProps<SelectOptionValue> {
  options: SelectOption<SelectOptionValue>[];
  onChange: (value: SelectOptionValue) => void;
  className?: string;
  initialValue?: SelectOption<SelectOptionValue>;
  value?: SelectOptionValue | null;
  id?: string;
}
