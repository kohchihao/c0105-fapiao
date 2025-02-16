
CREATE OR REPLACE FUNCTION public.delete_and_insert_invoice_items(
    p_invoice_id bigint,
    new_items jsonb,
    p_user_id uuid
) RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
    inserted_items jsonb;
BEGIN
    -- Delete all items for the specified invoice
    DELETE FROM public.invoice_item
    WHERE invoice_id = p_invoice_id
    AND user_id = p_user_id;


    -- Insert new items into the invoice_item table
   WITH inserted AS (
        INSERT INTO public.invoice_item (invoice_id, user_id, description, unit_price, amount, quantity)
        SELECT p_invoice_id, 
                (item->>'user_id')::uuid, 
                (item->>'description')::text, 
                (item->>'unit_price')::numeric,
                (item->>'amount')::numeric,
                (item->>'quantity')::numeric
        FROM jsonb_array_elements(new_items) AS item
        RETURNING *
    )
    SELECT row_to_json(inserted) INTO inserted_items
    FROM inserted
    LIMIT 1;

    -- Return the inserted items
    RETURN inserted_items;
END;
$$;


DROP FUNCTION IF EXISTS public.delete_and_insert_invoice_items(bigint, jsonb, uuid);