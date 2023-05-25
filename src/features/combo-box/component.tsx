import { ChangeEvent, useCallback, useMemo } from 'react';
import { styled } from 'styled-components';
import { ArrowDown, ArrowUp } from '../../components/icon';
import { Input } from '../../components/input';
import { useDropdownListA11y } from '../../hooks/dropdown-list-a11y.hook';
import { useComboBox } from './hook';
import { ComboBoxOptions, ComboBoxOptionsProps } from './options.component';

export type ComboBoxProps<T> = Pick<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> & {
  options: T[];
  renderItem: (item: T, selected: boolean) => React.ReactNode;
  onSearch: (term: string) => void;
  onSelect?: (item: T) => void;
};

export const ComboBox = <T extends { label: string }>(props: ComboBoxProps<T>) => {
  const { options, onSelect, onSearch, placeholder, renderItem } = props;

  const {
    selectOption,
    isOptionSelected,
    inputRef,
    inputValue,
    updateInputValue,
    isDropdownVisible,
    showDropdown,
    hideDropdown,
  } = useComboBox<T>({ onSelect, onSearch });

  const {
    focusedOptionRef,
    focusedOptionIndex,
    resetFocusedOptionIndex,
    keyboardNavigationListener,
    onMouseMoveInsideDropdown,
  } = useDropdownListA11y<T, HTMLLIElement>({
    options,
    onSelect: selectOption,
    onShowDropdown: showDropdown,
  });

  const a11y = useMemo(
    () => ({
      focusedOptionRef,
      focusedOptionIndex,
    }),
    [focusedOptionIndex, focusedOptionRef]
  );

  const keyExtractor = useCallback<ComboBoxOptionsProps<T>['keyExtractor']>(
    (item, index) => `${item.label}-${index}`,
    []
  );

  const renderOption = useCallback<ComboBoxOptionsProps<T>['renderOption']>(
    (item) => renderItem(item, isOptionSelected(item)),
    [renderItem, isOptionSelected]
  );

  const updateInput = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      updateInputValue(target.value);
      showDropdown();
      resetFocusedOptionIndex();
    },
    [showDropdown, resetFocusedOptionIndex, updateInputValue]
  );

  const handleSelect = useCallback<ComboBoxOptionsProps<T>['onSelect']>(
    (item) => {
      selectOption(item);
      resetFocusedOptionIndex();
    },
    [resetFocusedOptionIndex, selectOption]
  );

  return (
    <Root onKeyDown={keyboardNavigationListener}>
      <InputContainer dropdownVisible={isDropdownVisible}>
        <Input
          placeholder={placeholder}
          ref={inputRef}
          value={inputValue}
          onChange={updateInput}
          onFocus={showDropdown}
          onBlur={hideDropdown}
        />

        {isDropdownVisible ? <ArrowUp /> : <ArrowDown />}
      </InputContainer>

      {isDropdownVisible && (
        <DropdownContainer onMouseMove={onMouseMoveInsideDropdown}>
          {options.length === 0 ? (
            <EmptyOptionsMessage>No match</EmptyOptionsMessage>
          ) : (
            <ComboBoxOptions
              keyExtractor={keyExtractor}
              options={options}
              renderOption={renderOption}
              onSelect={handleSelect}
              a11y={a11y}
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
  shouldForwardProp: (prop) => !['dropdownVisible'].includes(prop),
})<{ dropdownVisible: boolean }>(({ theme, dropdownVisible }) => ({
  flex: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  border: `2px solid transparent`,
  borderTopLeftRadius: theme.sizing.radius,
  borderTopRightRadius: theme.sizing.radius,
  padding: theme.spacing(1.5),
  backgroundColor: dropdownVisible ? '#fff' : '#f5f5f5',
  '&:focus-within': { borderColor: '#5e93f5' },
  ...(dropdownVisible ? { borderBottom: 'none' } : { borderRadius: 8 }),
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
