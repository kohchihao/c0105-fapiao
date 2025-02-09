import { Badge } from '@mantine/core';

type Props = {
  status: 'draft' | 'dirty' | 'saved';
};

const FormStatus = ({ status }: Props) => {
  const statusMap = {
    draft: {
      color: 'gray',
      text: 'Draft',
    },
    saved: {
      color: 'teal',
      text: 'Saved',
    },
    dirty: { color: 'red', text: 'Not Saved' },
  };

  return (
    <Badge color={statusMap[status].color}>{statusMap[status].text}</Badge>
  );
};

export default FormStatus;
