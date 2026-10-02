-- reemplaza el UUID con el del usuario que creaste
insert into projects (name, description, color, user_id) values
  ('Sitio Web', 'Rediseño del sitio principal', '#3B82F6', '70444b3b-2a94-4473-b0b7-22f9cb2ce49a'),
  ('App Mobile', 'Versión móvil de TaskFlow', '#10B981', '70444b3b-2a94-4473-b0b7-22f9cb2ce49a');

insert into tasks (title, status, priority, project_id, user_id) values
  ('Diseñar wireframes', 'todo', 'high',
   (select id from projects where name = 'Sitio Web' limit 1),
   '70444b3b-2a94-4473-b0b7-22f9cb2ce49a'),
  ('Configurar Vite', 'in_progress', 'urgent',
   (select id from projects where name = 'Sitio Web' limit 1),
   '70444b3b-2a94-4473-b0b7-22f9cb2ce49a'),
  ('Setup de Supabase', 'done', 'medium',
   (select id from projects where name = 'App Mobile' limit 1),
   '70444b3b-2a94-4473-b0b7-22f9cb2ce49a');


  --  Authentication → Users → Add user → Create new user
--   Email:    test@taskflow.com
-- Password: 12345678
-- 70444b3b-2a94-4473-b0b7-22f9cb2ce49a