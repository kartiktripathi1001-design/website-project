-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- User roles RLS policies
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create challenges table for challenge plans
CREATE TABLE public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  balance DECIMAL NOT NULL,
  base_price DECIMAL NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('standard', 'pro')),
  steps INTEGER NOT NULL CHECK (steps IN (2, 3)),
  phase1_target DECIMAL NOT NULL,
  phase2_target DECIMAL NOT NULL,
  phase3_target DECIMAL,
  max_drawdown DECIMAL NOT NULL,
  reward_split INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;

-- Challenges RLS policies (public read, admin write)
CREATE POLICY "Anyone can view active challenges"
  ON public.challenges FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage challenges"
  ON public.challenges FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create challenge_enrollments table
CREATE TABLE public.challenge_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'passed', 'failed', 'cancelled')),
  current_phase INTEGER NOT NULL DEFAULT 1,
  total_paid DECIMAL NOT NULL,
  
  -- Add-ons purchased
  has_profit_split_addon BOOLEAN NOT NULL DEFAULT false,
  has_drawdown_addon BOOLEAN NOT NULL DEFAULT false,
  has_express_payout BOOLEAN NOT NULL DEFAULT false,
  
  -- Trading stats
  current_balance DECIMAL,
  max_balance DECIMAL,
  current_profit DECIMAL DEFAULT 0,
  total_trades INTEGER DEFAULT 0,
  winning_trades INTEGER DEFAULT 0,
  losing_trades INTEGER DEFAULT 0,
  
  -- Phase tracking
  phase1_completed_at TIMESTAMPTZ,
  phase2_completed_at TIMESTAMPTZ,
  phase3_completed_at TIMESTAMPTZ,
  
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.challenge_enrollments ENABLE ROW LEVEL SECURITY;

-- Enrollments RLS policies
CREATE POLICY "Users can view own enrollments"
  ON public.challenge_enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own enrollments"
  ON public.challenge_enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments"
  ON public.challenge_enrollments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all enrollments"
  ON public.challenge_enrollments FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all enrollments"
  ON public.challenge_enrollments FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_challenges_updated_at
  BEFORE UPDATE ON public.challenges
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at
  BEFORE UPDATE ON public.challenge_enrollments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample challenges
INSERT INTO public.challenges (name, balance, base_price, type, steps, phase1_target, phase2_target, phase3_target, max_drawdown, reward_split) VALUES
('5K Standard 2-Step', 5000, 99, 'standard', 2, 500, 300, NULL, 300, 80),
('10K Standard 2-Step', 10000, 149, 'standard', 2, 1000, 600, NULL, 600, 80),
('25K Standard 2-Step', 25000, 249, 'standard', 2, 2500, 1500, NULL, 1500, 80),
('50K Standard 2-Step', 50000, 399, 'standard', 2, 5000, 3000, NULL, 3000, 80),
('100K Standard 2-Step', 100000, 699, 'standard', 2, 10000, 6000, NULL, 6000, 80),
('5K Pro 3-Step', 5000, 79, 'pro', 3, 400, 300, 200, 300, 75),
('10K Pro 3-Step', 10000, 119, 'pro', 3, 800, 600, 400, 600, 75),
('25K Pro 3-Step', 25000, 199, 'pro', 3, 2000, 1500, 1000, 1500, 75),
('50K Pro 3-Step', 50000, 319, 'pro', 3, 4000, 3000, 2000, 3000, 75),
('100K Pro 3-Step', 100000, 559, 'pro', 3, 8000, 6000, 4000, 6000, 75);