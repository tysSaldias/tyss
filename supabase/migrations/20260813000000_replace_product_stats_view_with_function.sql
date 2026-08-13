-- 1. Eliminar el view SECURITY DEFINER existente
DROP VIEW IF EXISTS public.product_stats;

-- 2. Crear función RPC con SECURITY INVOKER (default, no necesita declararlo)
CREATE OR REPLACE FUNCTION public.get_product_stats(p_product_id text)
RETURNS TABLE (
    product_id text,
    average_rating numeric,
    review_count bigint
)
LANGUAGE sql
STABLE
AS $$
    SELECT
        r.product_id,
        COALESCE(AVG(r.rating)::numeric(3,2), 0) AS average_rating,
        COUNT(r.id) AS review_count
    FROM public.reviews r
    WHERE r.product_id = p_product_id
    GROUP BY r.product_id;
$$;

-- 3. Habilitar RLS en la función (no necesario pero explícito)
ALTER FUNCTION public.get_product_stats(text) SECURITY INVOKER;

-- 4. Otorgar permisos a anon y authenticated
GRANT EXECUTE ON FUNCTION public.get_product_stats(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_product_stats(text) TO authenticated;
