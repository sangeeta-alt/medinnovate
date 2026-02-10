export interface User {
  id: string;
  email: string;
  user_metadata?: Record<string, any>;
}

export interface Doctor {
  id: string;
  user_id: string;
  full_name: string;
  license_number: string;
  specialty: string;
  verified: boolean;
  is_available: boolean;
  current_consultations: number;
  created_at: string;
}

export interface Patient {
  id: string;
  user_id: string;
  full_name: string;
  age?: number;
  location?: string;
  medical_history?: string;
  created_at: string;
}

export interface Consultation {
  id: string;
  patient_id: string;
  doctor_id?: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  symptoms_description: string;
  diagnosis?: string;
  notes?: string;
  started_at?: string;
  ended_at?: string;
  created_at: string;
}

export interface Message {
  id: string;
  consultation_id: string;
  sender_id: string;
  sender_type: 'doctor' | 'patient';
  message: string;
  attachment_url?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  doctor_id: string;
  consultation_id: string;
  title: string;
  body: string;
  read: boolean;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  profile: Doctor | Patient | null;
  userType: 'doctor' | 'patient' | null;
  isLoading: boolean;
  error: string | null;
}
