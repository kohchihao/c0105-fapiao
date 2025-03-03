import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

type Props = {
  onClick?: () => void;
  title?: string;
};

const BackButton = ({ onClick, title = 'Back' }: Props) => {
  return (
    <Button
      variant="subtle"
      leftSection={<IconArrowLeft size={16} />}
      color="black"
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default BackButton;
