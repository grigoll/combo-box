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
  height: 100%;
  display: flex;
  align-items: center;
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
