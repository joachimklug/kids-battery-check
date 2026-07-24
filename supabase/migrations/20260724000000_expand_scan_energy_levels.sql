alter table public.scan_events
drop constraint if exists scan_events_outcome_check;

alter table public.scan_events
add constraint scan_events_outcome_check
check (outcome in ('sleepy', 'cozy', 'steady', 'playful', 'bright'));

drop policy if exists "anonymous scan event insert"
on public.scan_events;

create policy "anonymous scan event insert"
on public.scan_events
for insert
to anon
with check (outcome in ('sleepy', 'cozy', 'steady', 'playful', 'bright'));
