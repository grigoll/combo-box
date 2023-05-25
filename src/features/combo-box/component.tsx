import { ChangeEvent, useCallback, useMemo } from 'react';
import { styled } from 'styled-components';
import { Input } from '../../components/input';
import { useComboBox } from './hook';
import { ComboBoxOptions, ComboBoxOptionsProps } from './options.component';
import { ArrowDown, ArrowUp } from '../../components/icon';

export type ComboBoxProps<T> = Pick<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> & {
  options: T[];
  renderItem: (item: T, selected: boolean) => React.ReactNode;
  onSelect?: (item: T) => void;
};

export const ComboBox = <T extends { label: string }>(props: ComboBoxProps<T>) => {
  const { options, onSelect, placeholder, renderItem } = props;

  const {
    selectOption,
    isOptionSelected,

    inputRef,
    inputValue,
    setInputValue,

    isDropdownVisible,
    onFocus,
    onBlur,
  } = useComboBox<T>({ onSelect });

  const filteredOptions = useMemo(
    () =>
      inputValue
        ? options.filter((item) =>
            item.label.trim().toLocaleLowerCase().includes(inputValue.trim().toLocaleLowerCase())
          )
        : options,
    [inputValue, options]
  );

  const keyExtractor = useCallback<ComboBoxOptionsProps<T>['keyExtractor']>(
    (item, index) => `${item.label}-${index}`,
    []
  );

  const renderOption = useCallback<ComboBoxOptionsProps<T>['renderOption']>(
    (item) => renderItem(item, isOptionSelected(item)),
    [renderItem, isOptionSelected]
  );

  const onChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => setInputValue(target.value),
    [setInputValue]
  );

  return (
    <Root>
      <InputContainer focused={isDropdownVisible}>
        <Input
          placeholder={placeholder}
          ref={inputRef}
          value={inputValue}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          // onClick={showDropdown}
        />

        {isDropdownVisible ? <ArrowUp /> : <ArrowDown />}
      </InputContainer>

      {isDropdownVisible && (
        <DropdownContainer>
          {filteredOptions.length === 0 ? (
            <EmptyOptionsMessage>No match</EmptyOptionsMessage>
          ) : (
            <ComboBoxOptions
              keyExtractor={keyExtractor}
              options={filteredOptions}
              renderOption={renderOption}
              onSelect={selectOption}
            />
          )}
        </DropdownContainer>
      )}
    </Root>
  );
};

const Root = styled.div({
  display: 'flex',
  position: 'relative',
  minWidth: 300,
  backgroundColor: '#fff',
});

const InputContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['focused'].includes(prop),
})<{ focused: boolean }>(({ theme, focused }) => ({
  flex: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  border: `2px solid transparent`,
  borderBottom: 'none',
  borderTopLeftRadius: theme.sizing.radius,
  borderTopRightRadius: theme.sizing.radius,
  padding: theme.spacing(1.5),
  backgroundColor: focused ? '#fff' : '#f5f5f5',
  '&:focus-within': { borderColor: '#5e93f5' },
  ...(focused ? null : { borderRadius: 8 }),
}));

const DropdownContainer = styled.div(({ theme }) => ({
  position: 'absolute',
  inset: 'auto 0 0 0',
  transform: 'translateY(100%)',
  maxHeight: 300,
  overflow: 'auto',
  border: `2px solid #5e93f5`,
  borderTop: 'none',
  borderBottomLeftRadius: theme.sizing.radius,
  borderBottomRightRadius: theme.sizing.radius,
}));

const EmptyOptionsMessage = styled.p`
  padding: ${({ theme }) => `${theme.spacing(1.5)}px ${theme.spacing(2)}px`};
  text-align: center;
  opacity: 0.5;
  font-style: italic;
`;
