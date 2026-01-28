import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Creator {
  id: string;
  display_name: string;
  email: string | null;
  avatar_url: string | null;
  bio: string | null;
}

interface Task {
  id: string;
  title: string;
  description: string | null;
  task_type: string;
  status: string;
  due_at: string | null;
  order_index: number;
  collaboration_creator_id: string;
}

interface Collaboration {
  id: string;
  name: string;
  description: string | null;
  brief: string | null;
  status: string;
  starts_at: string | null;
  ends_at: string | null;
}

interface Submission {
  id: string;
  task_id: string;
  title: string | null;
  description: string | null;
  file_url: string | null;
  file_type: string | null;
  status: string;
  submitted_at: string | null;
}

interface Comment {
  id: string;
  body: string;
  created_at: string;
  author_user_id: string | null;
}

interface SalesLink {
  id: string;
  slug: string;
  destination_url: string;
  clicks: number;
  is_active: boolean;
}

interface PromoCode {
  id: string;
  code: string;
  discount_type: string;
  discount_value: number;
  status: string;
  uses: number;
}

export function useCreatorData() {
  const { user } = useAuth();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [salesLinks, setSalesLinks] = useState<SalesLink[]>([]);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchCreatorData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch creator profile
        const { data: creatorData, error: creatorError } = await supabase
          .from('creators')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (creatorError) throw creatorError;

        if (!creatorData) {
          setLoading(false);
          return;
        }

        setCreator(creatorData);

        // Fetch collaboration_creators for this creator
        const { data: collabCreators, error: ccError } = await supabase
          .from('collaboration_creators')
          .select('id, collaboration_id, status')
          .eq('creator_id', creatorData.id);

        if (ccError) throw ccError;

        if (collabCreators && collabCreators.length > 0) {
          const collabIds = collabCreators.map(cc => cc.collaboration_id);
          const ccIds = collabCreators.map(cc => cc.id);

          // Fetch collaborations
          const { data: collabData, error: collabError } = await supabase
            .from('collaborations')
            .select('*')
            .in('id', collabIds);

          if (collabError) throw collabError;
          setCollaborations(collabData || []);

          // Fetch tasks
          const { data: taskData, error: taskError } = await supabase
            .from('tasks')
            .select('*')
            .in('collaboration_creator_id', ccIds)
            .order('order_index');

          if (taskError) throw taskError;
          setTasks(taskData || []);

          // Fetch sales links
          const { data: linksData, error: linksError } = await supabase
            .from('sales_links')
            .select('*')
            .in('collaboration_creator_id', ccIds);

          if (linksError) throw linksError;
          setSalesLinks(linksData || []);

          // Fetch promo codes
          const { data: codesData, error: codesError } = await supabase
            .from('promo_codes')
            .select('*')
            .in('collaboration_creator_id', ccIds);

          if (codesError) throw codesError;
          setPromoCodes(codesData || []);
        }

        // Fetch submissions
        const { data: subData, error: subError } = await supabase
          .from('submissions')
          .select('*')
          .eq('creator_id', creatorData.id);

        if (subError) throw subError;
        setSubmissions(subData || []);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCreatorData();
  }, [user]);

  const fetchComments = async (entityType: string, entityId: string) => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as Comment[];
  };

  const createSubmission = async (taskId: string, title: string, description: string, fileUrl?: string, fileType?: string) => {
    if (!creator) throw new Error('No creator profile found');

    const { data, error } = await supabase
      .from('submissions')
      .insert({
        task_id: taskId,
        creator_id: creator.id,
        title,
        description,
        file_url: fileUrl,
        file_type: fileType,
        status: 'submitted',
        submitted_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    setSubmissions(prev => [...prev, data]);
    return data;
  };

  const updateTaskStatus = async (taskId: string, status: string) => {
    const { error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', taskId);

    if (error) throw error;
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const addComment = async (entityType: string, entityId: string, body: string) => {
    if (!creator) throw new Error('No creator profile found');

    const { data, error } = await supabase
      .from('comments')
      .insert({
        entity_type: entityType,
        entity_id: entityId,
        author_creator_id: creator.id,
        body
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  return {
    creator,
    tasks,
    collaborations,
    submissions,
    salesLinks,
    promoCodes,
    loading,
    error,
    fetchComments,
    createSubmission,
    updateTaskStatus,
    addComment
  };
}
