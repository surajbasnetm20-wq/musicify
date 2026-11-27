-- Run once in Supabase SQL editor. Existing Jam tables/functions are untouched.
create table if not exists public.musicify_connect96 (
 id uuid primary key default gen_random_uuid(), host_secret text not null, guest_secret text not null,
 state jsonb not null default '{}', command jsonb, updated timestamptz not null default now(), expires timestamptz not null default now()+interval '24 hours');
alter table public.musicify_connect96 enable row level security;
revoke all on public.musicify_connect96 from anon, authenticated;
create or replace function public.m96_create(host_secret text, guest_secret text) returns uuid language plpgsql security definer set search_path=public,pg_temp as $$
declare rid uuid; begin
if host_secret !~ '^[0-9a-f]{48}$' or guest_secret !~ '^[0-9a-f]{48}$' or host_secret=guest_secret then raise exception 'Invalid secret'; end if;
delete from public.musicify_connect96 where expires<now();
insert into public.musicify_connect96(host_secret,guest_secret) values ($1,$2) returning id into rid; return rid; end; $$;
create or replace function public.m96_host(room uuid,secret text,state jsonb) returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare result jsonb; begin
if octet_length(state::text)>12000 then raise exception 'State too large'; end if;
update public.musicify_connect96 t set state=$3,updated=now() where t.id=$1 and t.host_secret=$2 and t.expires>now() returning jsonb_build_object('command',t.command) into result;
if not found then raise exception 'Invalid or expired host'; end if; return result; end; $$;
create or replace function public.m96_read(room uuid,secret text) returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare result jsonb; begin select jsonb_build_object('state',t.state,'updated',t.updated) into result from public.musicify_connect96 t where t.id=$1 and t.guest_secret=$2 and t.expires>now(); if not found then raise exception 'Invalid or expired pairing'; end if; return result; end; $$;
create or replace function public.m96_command(room uuid,secret text,cmd jsonb) returns void language plpgsql security definer set search_path=public,pg_temp as $$ begin
if octet_length(cmd::text)>1000 or coalesce(cmd->>'action','') not in ('play','pause','next','prev','seek') or coalesce(cmd->>'id','') !~ '^[0-9a-f]{48}$' then raise exception 'Invalid command'; end if;
update public.musicify_connect96 t set command=$3 where t.id=$1 and t.guest_secret=$2 and t.expires>now(); if not found then raise exception 'Invalid or expired pairing'; end if; end; $$;
revoke all on function public.m96_create(text,text),public.m96_host(uuid,text,jsonb),public.m96_read(uuid,text),public.m96_command(uuid,text,jsonb) from public;
grant execute on function public.m96_create(text,text),public.m96_host(uuid,text,jsonb),public.m96_read(uuid,text),public.m96_command(uuid,text,jsonb) to anon,authenticated;
