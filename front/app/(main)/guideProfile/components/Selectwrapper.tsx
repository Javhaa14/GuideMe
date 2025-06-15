import React, { useEffect, useRef } from "react";
import Select, { Props as SelectProps } from "react-select";

export type OptionType = {
  label: string;
  value: string;
};

export type SelectWrapperProps<IsMulti extends boolean = false> = {
  styles?: object;
  className?: string;
} & SelectProps<OptionType, IsMulti>;

export const MultiSelect = <IsMulti extends boolean = false>(
  props: SelectWrapperProps<IsMulti>
) => {
  const valueContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (valueContainerRef.current) {
      // Scroll to the far right whenever value changes
      valueContainerRef.current.scrollLeft =
        valueContainerRef.current.scrollWidth;
    }
  }, [props.value]);

  // Custom ValueContainer component to attach ref & styles for scroll
  const ValueContainer = (containerProps: any) => {
    return (
      <div
        ref={valueContainerRef}
        style={{
          width: 200,
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto", // Enables horizontal scroll
          overflowY: "hidden", // Hide vertical overflow
          gap: "4px",
          padding: "2px 8px",
          whiteSpace: "nowrap",
          height: "40px", // Fix the height to prevent vertical expansion
          alignItems: "center", // Vertically align tags
          ...props.styles?.valueContainer, // Allow user styles to merge here
        }}
      >
        {containerProps.children}
      </div>
    );
  };

  return (
    <Select
      {...props}
      styles={{
        ...props.styles,
        valueContainer: () => ({}), // Override react-select's default ValueContainer styles so our div styles are used
      }}
      components={{ ...props.components, ValueContainer }}
    />
  );
};

export const SingleSelect = (props: SelectWrapperProps<false>) => {
  return <Select {...props} />;
};
