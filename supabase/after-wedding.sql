-- Borrado de datos DESPUÉS de la boda (lo prometido en el texto de consentimiento).
-- ⚠️ No se puede deshacer. Antes: exportar a CSV todo lo que se quiera conservar
-- (canciones, mensajes) y descargar las fotos de Cloudinary.

-- 1. Borrar todas las confirmaciones (las personas se borran con su grupo por el "on delete cascade")
delete from public.rsvp_groups;

-- 2. Borrar las canciones sugeridas
delete from public.song_suggestions;

-- 3. Cerrar la puerta: que la web ya no pueda añadir nada nuevo
drop policy "Invitados pueden sugerir canciones" on public.song_suggestions;
drop policy "Invitados pueden confirmar asistencia" on public.rsvp_groups;
drop policy "Invitados pueden añadir personas a su confirmación" on public.rsvp_guests;

-- En Cloudinary (a mano): descargar la carpeta "boda", borrar el upload preset "boda_invitados"
-- (así nadie puede seguir subiendo) y, si se quiere, borrar también las fotos.
