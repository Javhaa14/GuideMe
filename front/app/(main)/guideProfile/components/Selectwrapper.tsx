// Selectwrapper.tsx
import Select, { Props as SelectProps } from "react-select";

export type OptionType = {
  label: string;
  value: string;
};

export const MultiSelect = <IsMulti extends boolean = false>(
  props: SelectProps<OptionType, IsMulti>
) => {
  return <Select {...props} />;
};
