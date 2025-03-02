CREATE OR REPLACE FUNCTION get_next_invoice_id(project_id int8)
RETURNS TEXT AS $$
DECLARE
  project_prefix TEXT;
  invoice_count INTEGER;
  next_invoice_id TEXT;
BEGIN
  -- Get project prefix
  SELECT p.project_prefix INTO project_prefix
  FROM project p
  WHERE p.id = get_next_invoice_id.project_id;

  -- Count existing invoices for the project
  SELECT COUNT(*) INTO invoice_count
  FROM invoice i
  WHERE i.project_id = get_next_invoice_id.project_id;

  -- Generate the next invoice ID
  next_invoice_id := project_prefix || '-' || LPAD((invoice_count + 1)::TEXT, 3, '0');

  RETURN next_invoice_id;
END;
$$ LANGUAGE plpgsql;