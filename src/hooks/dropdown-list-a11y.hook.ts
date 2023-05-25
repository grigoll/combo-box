import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { KeyCode } from '../types';
import { debounce } from '../utils';

type Arg<T> = {
  options: T[];
  onSelect: (value: T) => void;
  onShowDropdown: () => void;
};

export function useDropdownListA11y<T, TRef extends HTMLElement = HTMLElement>({
  options,
  onSelect,
  onShowDropdown,
}: Arg<T>) {
  const [focusedOptionIndex, setFocusedIndex] = useState<number>();
  const focusedOptionRef = useRef<TRef>(null);

  const focusNext = useCallback(() => {
    if (focusedOptionIndex === undefined || focusedOptionIndex < options.length - 1) {
      setFocusedIndex((index) => (index === undefined ? 0 : index + 1));
    }
  }, [focusedOptionIndex, options.length]);

  const focusPrev = useCallback(() => {
    if (focusedOptionIndex === undefined || focusedOptionIndex > 0) {
      setFocusedIndex((index) => (index === undefined ? 0 : index - 1));
    }
  }, [focusedOptionIndex]);

  const resetFocusedOptionIndex = useCallback(() => setFocusedIndex(undefined), []);

  const handleUpDownKeyPress = useCallback(
    (code: string) => {
      onShowDropdown();

      if (code === KeyCode.Up) {
        focusPrev();
      } else {
        focusNext();
      }
    },
    [focusNext, focusPrev, onShowDropdown]
  );

  const handleEnterKeyPress = useCallback(() => {
    if (focusedOptionIndex !== undefined) {
      onSelect(options[focusedOptionIndex]);
      resetFocusedOptionIndex();
    }
  }, [focusedOptionIndex, onSelect, options, resetFocusedOptionIndex]);

  const keyboardNavigationListener = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.code === KeyCode.Down || event.code === KeyCode.Up) {
        event.preventDefault();
        handleUpDownKeyPress(event.code);
      } else if (event.code === KeyCode.Enter) {
        event.preventDefault();
        handleEnterKeyPress();
      }
    },
    [handleEnterKeyPress, handleUpDownKeyPress]
  );

  const onMouseMoveInsideDropdown = useMemo(
    () => debounce(resetFocusedOptionIndex, 5),
    [resetFocusedOptionIndex]
  );

  useEffect(() => {
    focusedOptionRef.current?.scrollIntoView({ block: 'center' });
  }, [focusedOptionIndex]);

  return {
    focusedOptionRef,
    focusedOptionIndex,
    keyboardNavigationListener,
    resetFocusedOptionIndex,
    onMouseMoveInsideDropdown,
  };
}
