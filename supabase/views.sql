-- Vistas para que los novios consulten y exporten los datos (SQL Editor → Run → Export → CSV).
-- Una vista es una "consulta guardada" que se usa como si fuera una tabla.
--
-- ⚠️ Seguridad: por defecto, una vista lee las tablas con los permisos de quien la creó (el administrador)
-- y se saltaría las reglas RLS. Por eso:
--   1. security_invoker = true → la vista usa los permisos de quien la consulta (la web no puede leer nada);
--   2. revoke … from anon, authenticated → además, la clave pública ni siquiera puede abrirla.

-- 1. Lista para el catering: una fila por persona que viene
create view public.catering_guests with (security_invoker = true) as
select
  g.name as nombre,
  case g.age_group when 'child' then 'Niño/a' else 'Adulto' end as edad,
  case g.diet
    when 'vegan' then 'Vegano'
    when 'vegetarian' then 'Vegetariano'
    else 'Sin restricciones'
  end as menu,
  case when g.has_allergies then g.allergies else '' end as alergias,
  r.created_at as confirmado_el
from public.rsvp_guests g
join public.rsvp_groups r on r.id = g.group_id
order by r.created_at, g.created_at;

-- 2. Resumen en una sola fila: los números que pide el catering
create view public.catering_summary with (security_invoker = true) as
select
  count(*) as total_personas,
  count(*) filter (where age_group = 'adult') as adultos,
  count(*) filter (where age_group = 'child') as menus_infantiles,
  count(*) filter (where diet = 'vegetarian') as vegetarianos,
  count(*) filter (where diet = 'vegan') as veganos,
  count(*) filter (where has_allergies) as con_alergias
from public.rsvp_guests;

-- 3. Quién ha dicho que no viene
create view public.rsvp_declined with (security_invoker = true) as
select declined_names as no_vienen, message as mensaje, created_at as respondido_el
from public.rsvp_groups
where attendance = 'no'
order by created_at;

-- 4. Mensajes para los novios (de los que vienen y de los que no)
create view public.rsvp_messages with (security_invoker = true) as
select
  r.message as mensaje,
  coalesce(r.declined_names, (select string_agg(g.name, ', ') from public.rsvp_guests g where g.group_id = r.id)) as de,
  case r.attendance when 'yes' then 'Viene' else 'No viene' end as asistencia,
  r.created_at as enviado_el
from public.rsvp_groups r
where coalesce(trim(r.message), '') <> ''
order by r.created_at;

revoke all on public.catering_guests, public.catering_summary, public.rsvp_declined, public.rsvp_messages
from anon, authenticated;
