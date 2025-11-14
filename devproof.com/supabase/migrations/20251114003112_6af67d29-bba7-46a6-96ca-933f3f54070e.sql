-- Add github_username column to profiles table
ALTER TABLE public.profiles
ADD COLUMN github_username text;

-- Create index on github_username for faster lookups
CREATE INDEX idx_profiles_github_username ON public.profiles(github_username);

-- Update the handle_new_user function to handle GitHub OAuth sign-ins
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
  user_name text;
  user_avatar text;
  user_github_username text;
BEGIN
  -- Extract user info from OAuth provider or email
  user_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name', 
    NEW.raw_user_meta_data->>'user_name',
    SPLIT_PART(NEW.email, '@', 1)
  );
  
  -- Extract GitHub username if signing in with GitHub
  user_github_username := NEW.raw_user_meta_data->>'user_name';
  
  -- Generate base username from name or email
  base_username := LOWER(REGEXP_REPLACE(
    user_name,
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
    username,
    github_username
  )
  VALUES (
    NEW.id,
    user_name,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'university', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    COALESCE(NEW.raw_user_meta_data->>'linkedin_url', ''),
    (SELECT COUNT(*) FROM public.profiles) < 100,
    final_username,
    user_github_username
  );
  RETURN NEW;
END;
$function$;