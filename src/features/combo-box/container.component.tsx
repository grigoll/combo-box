import { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { ComboBox, ComboBoxProps } from './component';

const fruits = [
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
];

export const ComboBoxContainer = () => {
  const [options, setOptions] = useState(fruits);

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

  const handleSearch = useCallback((searchTerm: string) => {
    setOptions(
      fruits.filter((item) =>
        item.label.trim().toLocaleLowerCase().includes(searchTerm.trim().toLocaleLowerCase())
      )
    );
  }, []);

  return (
    <Root>
      <ComboBox
        placeholder="Choose a Fruit:"
        options={options}
        renderItem={renderItem}
        onSearch={handleSearch}
        onSelect={(item) => {
          // Now do something with selected item. Eg:
          // alert(`You selected: ${item.label}`)
        }}
      />
    </Root>
  );
};

const Root = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: auto;
  display: flex;
  padding: 50px;
  align-items: flex-start;
  justify-content: center;
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
