-- ══ PROFILES ══════════════════════════════════════════
-- Extiende la tabla auth.users de Supabase
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- ══ PROJECTS ══════════════════════════════════════════
create table projects (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  color text default '#3B82F6',
  user_id uuid references auth.users on delete cascade not null,
  created_at timestamptz default now()
);

-- ══ TASKS ═════════════════════════════════════════════
create table tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  status text not null default 'todo',
  priority text not null default 'medium',
  project_id uuid references projects on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  due_date date,
  position integer default 0,
  created_at timestamptz default now()
);

-- ══ TRIGGER — crea el profile al registrarse ══════════
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ══ ROW LEVEL SECURITY ════════════════════════════════
alter table profiles enable row level security;
alter table projects enable row level security;
alter table tasks enable row level security;

-- Policies — profiles
create policy "users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Policies — projects
create policy "users can view own projects"
  on projects for select
  using (auth.uid() = user_id);

create policy "users can create projects"
  on projects for insert
  with check (auth.uid() = user_id);

create policy "users can update own projects"
  on projects for update
  using (auth.uid() = user_id);

create policy "users can delete own projects"
  on projects for delete
  using (auth.uid() = user_id);

-- Policies — tasks
create policy "users can view own tasks"
  on tasks for select
  using (auth.uid() = user_id);

create policy "users can create tasks"
  on tasks for insert
  with check (auth.uid() = user_id);

create policy "users can update own tasks"
  on tasks for update
  using (auth.uid() = user_id);

create policy "users can delete own tasks"
  on tasks for delete
  using (auth.uid() = user_id);