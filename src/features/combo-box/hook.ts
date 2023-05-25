import { useCallback, useEffect, useRef, useState } from 'react';

type Args<T> = {
  onSelect?: (value: T) => void;
};

export function useComboBox<T extends { label: string }>(args: Args<T>) {
  const { onSelect } = args;

  const [selected, setSelected] = useState<T | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isOptionSelected = useCallback(
    (item: T, comparator?: (a: T | null, b: T | null) => boolean) =>
      typeof comparator === 'function' ? comparator(item, selected) : item === selected,
    [selected]
  );

  const selectOption = useCallback(
    (item: T) => {
      setSelected(item);
      onSelect?.(item);
    },
    [onSelect]
  );

  const onBlur = useCallback(() => {
    setInputValue(selected?.label ?? '');
    setDropdownVisibility(false);
  }, [selected]);

  const onFocus = useCallback(() => {
    setDropdownVisibility(true);
  }, []);

  useEffect(() => {
    setInputValue(selected?.label ?? '');
  }, [selected]);

  return {
    inputRef,
    inputValue,
    setInputValue,

    selectOption,
    isOptionSelected,

    isDropdownVisible,
    onBlur,
    onFocus,
  };
}
