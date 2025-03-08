CREATE OR REPLACE FUNCTION generate_project_prefix(project_name TEXT)
RETURNS TEXT AS $$
DECLARE
  prefix TEXT;
  unique_suffix TEXT;
  new_prefix TEXT;
BEGIN
  -- Trim spaces from the project name and take the first 3-5 uppercase letters
  prefix := UPPER(LEFT(regexp_replace(REPLACE(project_name, ' ', ''), '[^A-Za-z]', '', 'g'), 3));

  -- Add a unique suffix (random 2 digits) to ensure uniqueness
  unique_suffix := LPAD(FLOOR(RANDOM() * 100)::TEXT, 2, '0');
  
  -- Combine prefix + unique suffix
  new_prefix := prefix || unique_suffix;

  -- Ensure uniqueness by checking the projects table
  WHILE EXISTS (SELECT 1 FROM project WHERE project_prefix = new_prefix) LOOP
    unique_suffix := LPAD(FLOOR(RANDOM() * 100)::TEXT, 2, '0');
    new_prefix := prefix || unique_suffix;
  END LOOP;

  RETURN new_prefix;
END;
$$ LANGUAGE plpgsql;



