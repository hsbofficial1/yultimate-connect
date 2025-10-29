-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('admin', 'tournament_director', 'team_captain', 'player', 'coach', 'program_manager', 'volunteer');

-- Create enum for tournament status
CREATE TYPE tournament_status AS ENUM ('draft', 'registration_open', 'in_progress', 'completed');

-- Create enum for team status
CREATE TYPE team_status AS ENUM ('pending', 'approved', 'rejected');

-- Create enum for match status
CREATE TYPE match_status AS ENUM ('upcoming', 'live', 'completed');

-- Create enum for program type
CREATE TYPE program_type AS ENUM ('school', 'community');

-- Create enum for assessment type
CREATE TYPE assessment_type AS ENUM ('baseline', 'midline', 'endline');

-- Users/Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'player',
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Schools table
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view schools" ON schools FOR SELECT USING (true);
CREATE POLICY "Coaches and admins can manage schools" ON schools FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('coach', 'program_manager', 'admin')
  )
);

-- Communities table
CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view communities" ON communities FOR SELECT USING (true);
CREATE POLICY "Coaches and admins can manage communities" ON communities FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('coach', 'program_manager', 'admin')
  )
);

-- Tournaments table
CREATE TABLE tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location TEXT NOT NULL,
  max_teams INTEGER NOT NULL DEFAULT 16,
  status tournament_status NOT NULL DEFAULT 'draft',
  description TEXT,
  created_by UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published tournaments" ON tournaments FOR SELECT USING (status != 'draft' OR auth.uid() = created_by);
CREATE POLICY "Directors and admins can create tournaments" ON tournaments FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('tournament_director', 'admin')
  )
);
CREATE POLICY "Directors and admins can update tournaments" ON tournaments FOR UPDATE USING (
  auth.uid() = created_by OR 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('tournament_director', 'admin')
  )
);

-- Teams table
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  captain_id UUID REFERENCES profiles(id) NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  status team_status NOT NULL DEFAULT 'pending',
  logo_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(tournament_id, name)
);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view approved teams" ON teams FOR SELECT USING (status = 'approved' OR auth.uid() = captain_id);
CREATE POLICY "Captains can create teams" ON teams FOR INSERT WITH CHECK (auth.uid() = captain_id);
CREATE POLICY "Captains can update their teams" ON teams FOR UPDATE USING (auth.uid() = captain_id AND status = 'pending');
CREATE POLICY "Directors can manage all teams" ON teams FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('tournament_director', 'admin')
  )
);

-- Team players table
CREATE TABLE team_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE team_players ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view players of approved teams" ON team_players FOR SELECT USING (
  EXISTS (SELECT 1 FROM teams WHERE id = team_id AND status = 'approved')
);
CREATE POLICY "Captains can manage their team players" ON team_players FOR ALL USING (
  EXISTS (
    SELECT 1 FROM teams 
    WHERE id = team_id AND captain_id = auth.uid()
  )
);
CREATE POLICY "Directors can view all players" ON team_players FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('tournament_director', 'admin')
  )
);

-- Matches table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,
  team_a_id UUID REFERENCES teams(id) NOT NULL,
  team_b_id UUID REFERENCES teams(id) NOT NULL,
  field TEXT NOT NULL,
  scheduled_time TIMESTAMPTZ NOT NULL,
  team_a_score INTEGER NOT NULL DEFAULT 0,
  team_b_score INTEGER NOT NULL DEFAULT 0,
  status match_status NOT NULL DEFAULT 'upcoming',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view matches" ON matches FOR SELECT USING (true);
CREATE POLICY "Directors and volunteers can update matches" ON matches FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('tournament_director', 'admin', 'volunteer')
  )
);
CREATE POLICY "Directors can create matches" ON matches FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('tournament_director', 'admin')
  )
);

-- Spirit scores table
CREATE TABLE spirit_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE NOT NULL,
  from_team_id UUID REFERENCES teams(id) NOT NULL,
  to_team_id UUID REFERENCES teams(id) NOT NULL,
  rules INTEGER NOT NULL CHECK (rules >= 0 AND rules <= 4),
  fouls INTEGER NOT NULL CHECK (fouls >= 0 AND fouls <= 4),
  fairness INTEGER NOT NULL CHECK (fairness >= 0 AND fairness <= 4),
  attitude INTEGER NOT NULL CHECK (attitude >= 0 AND attitude <= 4),
  communication INTEGER NOT NULL CHECK (communication >= 0 AND communication <= 4),
  total INTEGER GENERATED ALWAYS AS (rules + fouls + fairness + attitude + communication) STORED,
  comments TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(match_id, from_team_id)
);

ALTER TABLE spirit_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view spirit scores" ON spirit_scores FOR SELECT USING (true);
CREATE POLICY "Captains can submit spirit scores for their team" ON spirit_scores FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM teams 
    WHERE id = from_team_id AND captain_id = auth.uid()
  )
);

-- Children table
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  photo_url TEXT,
  school_id UUID REFERENCES schools(id),
  community_id UUID REFERENCES communities(id),
  parent_name TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  parent_whatsapp TEXT,
  medical_notes TEXT,
  join_date DATE NOT NULL DEFAULT CURRENT_DATE,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE children ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Coaches and managers can view children" ON children FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('coach', 'program_manager', 'admin')
  )
);
CREATE POLICY "Coaches and managers can manage children" ON children FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('coach', 'program_manager', 'admin')
  )
);

-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  coach_id UUID REFERENCES profiles(id) NOT NULL,
  program_type program_type NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Coaches and managers can view sessions" ON sessions FOR SELECT USING (
  auth.uid() = coach_id OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('program_manager', 'admin')
  )
);
CREATE POLICY "Coaches can create sessions" ON sessions FOR INSERT WITH CHECK (auth.uid() = coach_id);
CREATE POLICY "Coaches can update their sessions" ON sessions FOR UPDATE USING (auth.uid() = coach_id);

-- Attendance table
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE NOT NULL,
  present BOOLEAN NOT NULL DEFAULT false,
  marked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  synced BOOLEAN NOT NULL DEFAULT false,
  UNIQUE(session_id, child_id)
);

ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Coaches and managers can view attendance" ON attendance FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM sessions s 
    WHERE s.id = session_id AND s.coach_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('program_manager', 'admin')
  )
);
CREATE POLICY "Coaches can manage attendance for their sessions" ON attendance FOR ALL USING (
  EXISTS (
    SELECT 1 FROM sessions s 
    WHERE s.id = session_id AND s.coach_id = auth.uid()
  )
);

-- Home visits table
CREATE TABLE home_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE NOT NULL,
  coach_id UUID REFERENCES profiles(id) NOT NULL,
  visit_date DATE NOT NULL,
  duration INTEGER,
  purpose TEXT NOT NULL,
  notes TEXT,
  action_items TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE home_visits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Coaches and managers can view home visits" ON home_visits FOR SELECT USING (
  auth.uid() = coach_id OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('program_manager', 'admin')
  )
);
CREATE POLICY "Coaches can manage their home visits" ON home_visits FOR ALL USING (auth.uid() = coach_id);

-- Assessments table
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE NOT NULL,
  assessment_date DATE NOT NULL,
  type assessment_type NOT NULL,
  physical_score INTEGER NOT NULL CHECK (physical_score >= 1 AND physical_score <= 5),
  social_score INTEGER NOT NULL CHECK (social_score >= 1 AND social_score <= 5),
  emotional_score INTEGER NOT NULL CHECK (emotional_score >= 1 AND emotional_score <= 5),
  cognitive_score INTEGER NOT NULL CHECK (cognitive_score >= 1 AND cognitive_score <= 5),
  total_score INTEGER GENERATED ALWAYS AS (physical_score + social_score + emotional_score + cognitive_score) STORED,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Coaches and managers can view assessments" ON assessments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('coach', 'program_manager', 'admin')
  )
);
CREATE POLICY "Coaches can create assessments" ON assessments FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('coach', 'program_manager', 'admin')
  )
);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'player')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tournaments_updated_at BEFORE UPDATE ON tournaments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON matches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON children FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();