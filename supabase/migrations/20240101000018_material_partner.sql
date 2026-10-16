-- ============================================================================
-- Refa Learn — Partner shown on a store material
--
-- A material can be offered in partnership with one of the partners the
-- admin manages (Admin → Partners; also listed on /about). The catalog card
-- and the detail page show the partner's logo and name. Removing a partner
-- only clears the link.
-- ============================================================================

alter table public.materials
  add column if not exists partner_id uuid references public.partners(id) on delete set null;

create index if not exists materials_partner_idx on public.materials (partner_id);
