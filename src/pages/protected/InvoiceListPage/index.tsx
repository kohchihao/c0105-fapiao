import { useParams } from 'react-router-dom';

const InvoiceListPage = () => {
  const { projectId } = useParams();
  return (
    <div>
      <h1>Invoice List Page {projectId}</h1>
    </div>
  );
};

export default InvoiceListPage;
