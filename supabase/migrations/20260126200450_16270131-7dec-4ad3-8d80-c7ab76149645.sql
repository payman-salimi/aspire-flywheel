-- Create app_role enum for RBAC
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create profiles table for user information
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    display_name TEXT,
    avatar_url TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create workspaces table
CREATE TABLE public.workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workspace_members table
CREATE TABLE public.workspace_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (workspace_id, user_id)
);

-- Create creators table (the talent/influencers)
CREATE TABLE public.creators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    display_name TEXT NOT NULL,
    email TEXT,
    avatar_url TEXT,
    bio TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    source TEXT DEFAULT 'manual',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create collaboration_templates table
CREATE TABLE public.collaboration_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    goal_type TEXT NOT NULL,
    description TEXT,
    config JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create collaborations table
CREATE TABLE public.collaborations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    template_id UUID REFERENCES public.collaboration_templates(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    brief TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    starts_at TIMESTAMP WITH TIME ZONE,
    ends_at TIMESTAMP WITH TIME ZONE,
    config JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create collaboration_creators junction table
CREATE TABLE public.collaboration_creators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collaboration_id UUID REFERENCES public.collaborations(id) ON DELETE CASCADE NOT NULL,
    creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE NOT NULL,
    status TEXT NOT NULL DEFAULT 'invited',
    invited_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    accepted_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (collaboration_id, creator_id)
);

-- Create tasks table
CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collaboration_creator_id UUID REFERENCES public.collaboration_creators(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    task_type TEXT NOT NULL DEFAULT 'content',
    status TEXT NOT NULL DEFAULT 'pending',
    due_at TIMESTAMP WITH TIME ZONE,
    order_index INTEGER DEFAULT 0,
    config JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create submissions table
CREATE TABLE public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
    creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE NOT NULL,
    title TEXT,
    description TEXT,
    file_url TEXT,
    file_type TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    submitted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create comments table for feedback
CREATE TABLE public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    author_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    author_creator_id UUID REFERENCES public.creators(id) ON DELETE SET NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sales_links table
CREATE TABLE public.sales_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collaboration_creator_id UUID REFERENCES public.collaboration_creators(id) ON DELETE CASCADE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    destination_url TEXT NOT NULL,
    utm_params JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    clicks INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create promo_codes table
CREATE TABLE public.promo_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collaboration_creator_id UUID REFERENCES public.collaboration_creators(id) ON DELETE CASCADE NOT NULL,
    code TEXT NOT NULL,
    discount_type TEXT DEFAULT 'percentage',
    discount_value NUMERIC DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active',
    uses INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaboration_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaboration_creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to get creator_id for current user
CREATE OR REPLACE FUNCTION public.get_creator_id_for_user(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.creators WHERE user_id = _user_id LIMIT 1
$$;

-- Profile policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User roles policies (only admins can manage)
CREATE POLICY "Users can view own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

-- Workspace policies
CREATE POLICY "Members can view workspace" ON public.workspaces
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.workspace_members WHERE workspace_id = id AND user_id = auth.uid())
    );

-- Workspace members policies
CREATE POLICY "Members can view workspace members" ON public.workspace_members
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.workspace_members wm WHERE wm.workspace_id = workspace_id AND wm.user_id = auth.uid())
    );

-- Creator policies (creators can view themselves, workspace members can view all in workspace)
CREATE POLICY "Creators can view own profile" ON public.creators
    FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Creators can update own profile" ON public.creators
    FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Workspace members can view creators" ON public.creators
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.workspace_members WHERE workspace_id = creators.workspace_id AND user_id = auth.uid())
    );

-- Collaboration templates policies
CREATE POLICY "Workspace members can view templates" ON public.collaboration_templates
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.workspace_members WHERE workspace_id = collaboration_templates.workspace_id AND user_id = auth.uid())
    );

-- Collaboration policies
CREATE POLICY "Workspace members can view collaborations" ON public.collaborations
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.workspace_members WHERE workspace_id = collaborations.workspace_id AND user_id = auth.uid())
    );
CREATE POLICY "Creators can view own collaborations" ON public.collaborations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.collaboration_creators cc
            JOIN public.creators c ON cc.creator_id = c.id
            WHERE cc.collaboration_id = collaborations.id AND c.user_id = auth.uid()
        )
    );

-- Collaboration creators policies
CREATE POLICY "Workspace members can view collaboration creators" ON public.collaboration_creators
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.collaborations col
            JOIN public.workspace_members wm ON wm.workspace_id = col.workspace_id
            WHERE col.id = collaboration_id AND wm.user_id = auth.uid()
        )
    );
CREATE POLICY "Creators can view own participation" ON public.collaboration_creators
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.creators WHERE id = creator_id AND user_id = auth.uid())
    );
CREATE POLICY "Creators can update own participation" ON public.collaboration_creators
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.creators WHERE id = creator_id AND user_id = auth.uid())
    );

-- Tasks policies
CREATE POLICY "Workspace members can view tasks" ON public.tasks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.collaboration_creators cc
            JOIN public.collaborations col ON cc.collaboration_id = col.id
            JOIN public.workspace_members wm ON wm.workspace_id = col.workspace_id
            WHERE cc.id = collaboration_creator_id AND wm.user_id = auth.uid()
        )
    );
CREATE POLICY "Creators can view own tasks" ON public.tasks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.collaboration_creators cc
            JOIN public.creators c ON cc.creator_id = c.id
            WHERE cc.id = collaboration_creator_id AND c.user_id = auth.uid()
        )
    );
CREATE POLICY "Creators can update own tasks" ON public.tasks
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.collaboration_creators cc
            JOIN public.creators c ON cc.creator_id = c.id
            WHERE cc.id = collaboration_creator_id AND c.user_id = auth.uid()
        )
    );

-- Submissions policies
CREATE POLICY "Creators can view own submissions" ON public.submissions
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.creators WHERE id = creator_id AND user_id = auth.uid())
    );
CREATE POLICY "Creators can insert own submissions" ON public.submissions
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.creators WHERE id = creator_id AND user_id = auth.uid())
    );
CREATE POLICY "Creators can update own submissions" ON public.submissions
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.creators WHERE id = creator_id AND user_id = auth.uid())
    );
CREATE POLICY "Workspace members can view submissions" ON public.submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.tasks t
            JOIN public.collaboration_creators cc ON t.collaboration_creator_id = cc.id
            JOIN public.collaborations col ON cc.collaboration_id = col.id
            JOIN public.workspace_members wm ON wm.workspace_id = col.workspace_id
            WHERE t.id = task_id AND wm.user_id = auth.uid()
        )
    );

-- Comments policies
CREATE POLICY "Users can view comments on accessible entities" ON public.comments
    FOR SELECT USING (
        author_user_id = auth.uid() OR
        EXISTS (SELECT 1 FROM public.creators WHERE id = author_creator_id AND user_id = auth.uid()) OR
        (entity_type = 'submission' AND EXISTS (
            SELECT 1 FROM public.submissions s
            JOIN public.creators c ON s.creator_id = c.id
            WHERE s.id = entity_id AND c.user_id = auth.uid()
        ))
    );
CREATE POLICY "Users can insert comments" ON public.comments
    FOR INSERT WITH CHECK (
        auth.uid() = author_user_id OR
        EXISTS (SELECT 1 FROM public.creators WHERE id = author_creator_id AND user_id = auth.uid())
    );

-- Sales links policies
CREATE POLICY "Creators can view own sales links" ON public.sales_links
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.collaboration_creators cc
            JOIN public.creators c ON cc.creator_id = c.id
            WHERE cc.id = collaboration_creator_id AND c.user_id = auth.uid()
        )
    );

-- Promo codes policies
CREATE POLICY "Creators can view own promo codes" ON public.promo_codes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.collaboration_creators cc
            JOIN public.creators c ON cc.creator_id = c.id
            WHERE cc.id = collaboration_creator_id AND c.user_id = auth.uid()
        )
    );

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_workspaces_updated_at BEFORE UPDATE ON public.workspaces FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_creators_updated_at BEFORE UPDATE ON public.creators FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_collaboration_templates_updated_at BEFORE UPDATE ON public.collaboration_templates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_collaborations_updated_at BEFORE UPDATE ON public.collaborations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON public.submissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();