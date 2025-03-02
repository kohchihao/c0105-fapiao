CREATE OR REPLACE FUNCTION assign_project_prefix()
RETURNS TRIGGER AS $$
BEGIN
    NEW.project_prefix := generate_project_prefix(NEW.name);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_project_prefix
BEFORE INSERT ON project
FOR EACH ROW
EXECUTE FUNCTION assign_project_prefix();
