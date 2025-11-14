-- Add linkedin_url to profiles table
ALTER TABLE public.profiles ADD COLUMN linkedin_url text;

-- Update handle_new_user function to include linkedin_url
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, name, email, university, github_url, linkedin_url, is_founding_member)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'university', ''),
    COALESCE(NEW.raw_user_meta_data->>'github_url', ''),
    COALESCE(NEW.raw_user_meta_data->>'linkedin_url', ''),
    (SELECT COUNT(*) FROM public.profiles) < 100
  );
  RETURN NEW;
END;
$function$;