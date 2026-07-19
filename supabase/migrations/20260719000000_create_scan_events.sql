create table if not exists public.scan_events (
  id bigint generated always as identity primary key,
  outcome text not null check (outcome in ('sleepy', 'steady', 'bright', 'no_face')),
  face_check_used boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.scan_events enable row level security;

-- Anonymous clients may add non-identifying product analytics only.
create policy "anonymous scan event insert"
on public.scan_events
for insert
to anon
with check (outcome in ('sleepy', 'steady', 'bright', 'no_face'));

revoke select, update, delete on public.scan_events from anon, authenticated;
grant insert on public.scan_events to anon;
grant usage, select on sequence public.scan_events_id_seq to anon;
