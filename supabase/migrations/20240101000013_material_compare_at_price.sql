-- ============================================================================
-- "Harga coret" per material
--
-- The admin can show a struck-through "before" price next to a material's
-- real price (tick "Pakai harga coret" on the material form). Display only:
-- orders always charge `price`. A free material (price 0) with a "before"
-- price shows as "Gratis" with -100%.
-- ============================================================================

alter table public.materials
  add column if not exists compare_at_price integer;

alter table public.materials drop constraint if exists materials_compare_at_price_above_price;
alter table public.materials add constraint materials_compare_at_price_above_price
  check (compare_at_price is null or (compare_at_price > price and compare_at_price <= 100000000));

-- Keep what the catalog showed before this column existed.
update public.materials m
set compare_at_price = v.before
from (values (49000, 100000), (99000, 150000), (199000, 300000), (249000, 400000)) as v(price, before)
where m.price = v.price and m.compare_at_price is null;
