import React from 'react';
import { styled } from 'styled-components';

export type ComboBoxOptionsProps<T> = {
  options: T[];
  onSelect: (item: T) => void;
  renderOption: (item: T) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  a11y?: {
    focusedOptionIndex?: number;
    focusedOptionRef: React.RefObject<HTMLLIElement>;
  };
};

export const ComboBoxOptions = <T,>(props: ComboBoxOptionsProps<T>) => {
  const { options, renderOption, keyExtractor, onSelect, a11y } = props;

  return (
    <OptionList>
      {options.map((item, index) => (
        <OptionWrapper
          key={keyExtractor(item, index)}
          onMouseDown={() => onSelect(item)}
          focused={a11y?.focusedOptionIndex === index}
          ref={a11y?.focusedOptionIndex === index ? a11y.focusedOptionRef : null}>
          {renderOption(item)}
        </OptionWrapper>
      ))}
    </OptionList>
  );
};

const OptionList = styled.ul`
  list-style-type: none;
`;

const OptionWrapper = styled.li.withConfig({
  shouldForwardProp: (prop) => !['focused'].includes(prop),
})<{ focused: boolean }>(({ theme, focused }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
  cursor: 'pointer',
  '&:hover': { backgroundColor: '#e8ecef' },
  ...(focused ? { backgroundColor: '#e8ecef' } : null),
}));
