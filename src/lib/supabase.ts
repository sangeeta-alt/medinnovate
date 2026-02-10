import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getDoctorProfile(userId: string) {
  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getPatientProfile(userId: string) {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getConsultations(userId: string, userType: 'doctor' | 'patient') {
  if (userType === 'doctor') {
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .eq('doctor_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } else {
    const { data: patients, error: patientError } = await supabase
      .from('patients')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (patientError) throw patientError;
    if (!patients) return [];

    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .eq('patient_id', patients.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}

export async function getConsultationMessages(consultationId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('consultation_id', consultationId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function getDoctorNotifications(doctorId: string) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('doctor_id', doctorId)
    .eq('read', false)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function markNotificationAsRead(notificationId: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);

  if (error) throw error;
}
