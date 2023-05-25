import { useCallback, useRef, useState } from 'react';

type Args<T> = {
  onSelect?: (value: T) => void;
  onSearch: (term: string) => void;
};

export function useComboBox<T extends { label: string }>({ onSelect, onSearch }: Args<T>) {
  const [selected, setSelected] = useState<T | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isOptionSelected = useCallback(
    (item: T, comparator?: (a: T | null, b: T | null) => boolean) =>
      typeof comparator === 'function' ? comparator(item, selected) : item === selected,
    [selected]
  );

  const updateInputValue = useCallback(
    (value: string) => {
      setInputValue(value);
      onSearch(value);
    },
    [onSearch]
  );

  const hideDropdown = useCallback(() => {
    updateInputValue(selected?.label ?? ''); // reset input to prev selected value
    setDropdownVisibility(false);
  }, [selected?.label, updateInputValue]);

  const showDropdown = useCallback(() => {
    setDropdownVisibility(true);
  }, []);

  const selectOption = useCallback(
    (item: T) => {
      hideDropdown();
      setSelected(item);
      updateInputValue(item.label);
      onSelect?.(item);
    },
    [hideDropdown, onSelect, updateInputValue]
  );

  return {
    inputRef,
    inputValue,
    updateInputValue,

    selectOption,
    isOptionSelected,

    isDropdownVisible,
    hideDropdown: hideDropdown,
    showDropdown: showDropdown,
  };
}
