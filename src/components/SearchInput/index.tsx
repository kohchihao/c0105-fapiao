import { TextInput, TextInputProps } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';

type Props = TextInputProps & {
  onClear?: () => void;
};

const SearchInput = ({ onClear, ...rest }: Props) => {
  return (
    <TextInput
      size="md"
      placeholder="Search"
      rightSectionWidth={42}
      leftSection={<IconSearch size={18} stroke={1.5} />}
      rightSection={<IconX size={18} stroke={1.5} onClick={onClear} />}
      {...rest}
    />
  );
};

export default SearchInput;
