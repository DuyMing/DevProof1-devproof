-- Add username column to profiles table
ALTER TABLE public.profiles
ADD COLUMN username text UNIQUE;

-- Create index on username for faster lookups
CREATE INDEX idx_profiles_username ON public.profiles(username);

-- Update existing profiles to generate usernames from names
UPDATE public.profiles
SET username = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]', '', 'g'))
WHERE username IS NULL;

-- Make username required
ALTER TABLE public.profiles
ALTER COLUMN username SET NOT NULL;

-- Update the handle_new_user function to include username generation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  base_username text;
  final_username text;
  counter int := 0;
BEGIN
  -- Generate base username from name or email
  base_username := LOWER(REGEXP_REPLACE(
    COALESCE(NEW.raw_user_meta_data->>'name', SPLIT_PART(NEW.email, '@', 1)),
    '[^a-zA-Z0-9]',
    '',
    'g'
  ));
  
  -- Ensure unique username
  final_username := base_username;
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = final_username) LOOP
    counter := counter + 1;
    final_username := base_username || counter::text;
  END LOOP;
  
  INSERT INTO public.profiles (
    id, 
    name, 
    email, 
    university, 
    github_url, 
    linkedin_url, 
    is_founding_member,
    username
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'university', ''),
    COALESCE(NEW.raw_user_meta_data->>'github_url', ''),
    COALESCE(NEW.raw_user_meta_data->>'linkedin_url', ''),
    (SELECT COUNT(*) FROM public.profiles) < 100,
    final_username
  );
  RETURN NEW;
END;
$function$;