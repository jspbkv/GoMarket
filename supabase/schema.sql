create extension if not exists pgcrypto;

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 2 and 80),
  category text not null check (category in (
    'Электроника', 'Дом и интерьер', 'Одежда и обувь', 'Хобби и спорт',
    'Транспорт', 'Детские товары', 'Книги', 'Другое'
  )),
  price numeric(12, 2) not null default 0 check (price >= 0),
  region text not null check (char_length(region) between 2 and 80),
  city text not null check (char_length(city) between 2 and 80),
  description text not null check (char_length(description) between 5 and 700),
  seller_name text not null check (char_length(seller_name) between 1 and 50),
  seller_phone text not null check (char_length(seller_phone) between 7 and 20),
  exchange boolean not null default false,
  image_url text not null default '',
  image_urls text[] not null default '{}',
  status text not null default 'active' check (status in ('active', 'hidden')),
  created_at timestamptz not null default now(),
  check (cardinality(image_urls) <= 3)
);

alter table public.listings drop constraint if exists listings_status_check;
alter table public.listings add constraint listings_status_check
  check (status in ('active', 'sold', 'hidden'));

alter table public.listings add column if not exists image_urls text[] not null default '{}';
update public.listings set image_urls = array[image_url] where cardinality(image_urls) = 0 and image_url <> '';
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'listings_image_urls_max_three'
      and conrelid = 'public.listings'::regclass
  ) then
    alter table public.listings add constraint listings_image_urls_max_three
      check (cardinality(image_urls) <= 3);
  end if;
end
$$;

create index if not exists listings_active_created_idx
  on public.listings (created_at desc) where status = 'active';
create index if not exists listings_owner_idx on public.listings (user_id);

create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);

create table if not exists public.ads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 2 and 70),
  description text not null check (char_length(description) between 5 and 240),
  city text not null check (char_length(city) between 2 and 80),
  contact text not null check (char_length(contact) between 5 and 50),
  url text check (url is null or url ~ '^https?://'),
  status text not null default 'active' check (status in ('active', 'hidden')),
  created_at timestamptz not null default now()
);

alter table public.ads add column if not exists image_url text not null default '';

create index if not exists ads_active_created_idx
  on public.ads (created_at desc) where status = 'active';
create index if not exists ads_owner_idx on public.ads (user_id);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('listing', 'ad')),
  content_id uuid not null,
  reporter_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (content_type, content_id, reporter_id)
);
create index if not exists reports_content_idx
  on public.reports (content_type, content_id);

alter table public.listings enable row level security;
alter table public.favorites enable row level security;
alter table public.ads enable row level security;
alter table public.reports enable row level security;

drop policy if exists "Anyone can view active listings" on public.listings;
drop policy if exists "Anyone can view active and sold listings" on public.listings;
create policy "Anyone can view active and sold listings"
  on public.listings for select
  using (status in ('active', 'sold') or user_id = (select auth.uid()));

drop policy if exists "Owners can publish listings" on public.listings;
create policy "Owners can publish listings"
  on public.listings for insert to authenticated
  with check (user_id = (select auth.uid()) and status = 'active');

drop policy if exists "Owners can edit active listings" on public.listings;
drop policy if exists "Owners can update their listings" on public.listings;
create policy "Owners can update their listings"
  on public.listings for update to authenticated
  using (user_id = (select auth.uid()))
  with check (
    user_id = (select auth.uid())
    and status in ('active', 'sold', 'hidden')
  );

drop policy if exists "Owners can delete listings" on public.listings;
create policy "Owners can delete listings"
  on public.listings for delete to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Users can view their favorites" on public.favorites;
create policy "Users can view their favorites"
  on public.favorites for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Users can save their favorites" on public.favorites;
create policy "Users can save their favorites"
  on public.favorites for insert to authenticated
  with check (user_id = (select auth.uid()));

drop policy if exists "Users can remove their favorites" on public.favorites;
create policy "Users can remove their favorites"
  on public.favorites for delete to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Anyone can view active ads" on public.ads;
create policy "Anyone can view active ads"
  on public.ads for select
  using (status = 'active' or user_id = (select auth.uid()));

drop policy if exists "Owners can publish ads" on public.ads;
create policy "Owners can publish ads"
  on public.ads for insert to authenticated
  with check (user_id = (select auth.uid()) and status = 'active');

drop policy if exists "Owners can edit active ads" on public.ads;
create policy "Owners can edit active ads"
  on public.ads for update to authenticated
  using (user_id = (select auth.uid()) and status = 'active')
  with check (user_id = (select auth.uid()) and status = 'active');

drop policy if exists "Owners can delete ads" on public.ads;
create policy "Owners can delete ads"
  on public.ads for delete to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "No direct report access" on public.reports;
create policy "No direct report access"
  on public.reports for select to authenticated using (false);

create or replace function public.report_content(
  p_content_type text,
  p_content_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  item_owner uuid;
  item_status text;
  report_total integer;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if p_content_type = 'listing' then
    select user_id, status into item_owner, item_status
      from public.listings where id = p_content_id;
  elsif p_content_type = 'ad' then
    select user_id, status into item_owner, item_status
      from public.ads where id = p_content_id;
  else
    raise exception 'Unsupported content type';
  end if;

  if item_owner is null or item_owner = auth.uid() then
    raise exception 'Content cannot be reported';
  end if;

  insert into public.reports (content_type, content_id, reporter_id)
    values (p_content_type, p_content_id, auth.uid())
    on conflict (content_type, content_id, reporter_id) do nothing;
  if not found then
    return jsonb_build_object('duplicate', true, 'hidden', item_status = 'hidden');
  end if;

  select count(*) into report_total from public.reports
    where content_type = p_content_type and content_id = p_content_id;

  if report_total >= 3 and item_status = 'active' then
    if p_content_type = 'listing' then
      update public.listings set status = 'hidden' where id = p_content_id;
    else
      update public.ads set status = 'hidden' where id = p_content_id;
    end if;
    item_status := 'hidden';
  end if;

  return jsonb_build_object('duplicate', false, 'hidden', item_status = 'hidden');
end;
$$;

revoke all on function public.report_content(text, uuid) from public;
grant execute on function public.report_content(text, uuid) to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('listing-images', 'listing-images', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can view listing images" on storage.objects;
create policy "Anyone can view listing images"
  on storage.objects for select
  using (bucket_id = 'listing-images');

drop policy if exists "Owners can upload listing images" on storage.objects;
create policy "Owners can upload listing images"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'listing-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "Owners can update listing images" on storage.objects;
create policy "Owners can update listing images"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'listing-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'listing-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "Owners can delete listing images" on storage.objects;
create policy "Owners can delete listing images"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'listing-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
