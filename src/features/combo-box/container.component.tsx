import { styled } from 'styled-components';
import { ComboBox, ComboBoxProps } from './component';
import { useCallback, useMemo } from 'react';

export const ComboBoxContainer = () => {
  const renderItem = useCallback<ComboBoxProps<{ icon: string; label: string }>['renderItem']>(
    ({ icon, label }, isSelected) => (
      <OptionRoot>
        <div>
          <span>{icon}</span>
          <OptionLabel>{label}</OptionLabel>
        </div>

        <p>{isSelected ? '✓' : ''}</p>
      </OptionRoot>
    ),
    []
  );

  const options = useMemo(
    () => [
      { icon: '🍎', label: 'Apple' },
      { icon: '🍌', label: 'Banana' },
      { icon: '🫐', label: 'Blueberry' },
      { icon: '🥭', label: 'Mango' },
      { icon: '🍇', label: 'Grape' },
      { icon: '🍊', label: 'Orange' },
      { icon: '🍓', label: 'Strawberry' },
      { icon: '🍑', label: 'Peach' },
      { icon: '🍍', label: 'Pineapple' },
      { icon: '🥝', label: 'Kiwi' },
      { icon: '🍒', label: 'Cherry' },
      { icon: '🍅', label: 'Tomato' },
      { icon: '🍈', label: 'Melon' },
      { icon: '🍋', label: 'Lemon' },
      { icon: '🍐', label: 'Pear' },
      { icon: '🥥', label: 'Coconut' },
      { icon: '🍏', label: 'Green Apple' },
      { icon: '🍋', label: 'Lime' },
    ],
    []
  );

  return (
    <Root>
      <ComboBox
        placeholder="Choose a Fruit:"
        options={options}
        renderItem={renderItem}
        // onSelect={(item) => alert(`You selected: ${item.label}`)}
      />
    </Root>
  );
};

const Root = styled.div`
  /* max-height: 100vh;
  max-width: 100vw; */
  height: 100vh;
  width: 100vw;
  overflow: auto;
  display: flex;
  padding: 50px;
  align-items: flex-start;
  justify-content: center;
  /* background-color: red; */
`;

const OptionRoot = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OptionLabel = styled.span(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));
