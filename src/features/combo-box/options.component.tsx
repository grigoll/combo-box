import React from 'react';
import { styled } from 'styled-components';

export type ComboBoxOptionsProps<T> = {
  options: T[];
  onSelect: (item: T) => void;
  renderOption: (item: T) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
};

export const ComboBoxOptions = <T,>(props: ComboBoxOptionsProps<T>) => {
  const { options, renderOption, keyExtractor, onSelect } = props;

  return (
    <OptionList>
      {options.map((item, index) => (
        <OptionWrapper key={keyExtractor(item, index)} onMouseDown={() => onSelect(item)}>
          {renderOption(item)}
        </OptionWrapper>
      ))}
    </OptionList>
  );
};

const OptionList = styled.ul`
  list-style-type: none;
`;

const OptionWrapper = styled.li(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#e8ecef',
  },
}));
