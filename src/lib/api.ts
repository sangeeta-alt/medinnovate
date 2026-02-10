import { Doctor, Patient, Consultation, Message } from './types';

const API_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

async function apiCall<T>(
  endpoint: string,
  method: string = 'GET',
  body?: Record<string, any>,
  token?: string
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    apikey: ANON_KEY,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.message || 'API request failed');
  }

  return response.json();
}

export const api = {
  auth: {
    async signupDoctor(
      email: string,
      password: string,
      fullName: string,
      licenseNumber: string,
      specialty: string
    ) {
      return apiCall<{ user: any; doctor: Doctor; message: string }>(
        '/auth_doctor_signup',
        'POST',
        {
          email,
          password,
          full_name: fullName,
          license_number: licenseNumber,
          specialty,
        }
      );
    },

    async signupPatient(
      email: string,
      password: string,
      fullName: string,
      age?: number,
      location?: string
    ) {
      return apiCall<{ user: any; patient: Patient; message: string }>(
        '/auth_patient_signup',
        'POST',
        {
          email,
          password,
          full_name: fullName,
          age,
          location,
        }
      );
    },
  },

  consultations: {
    async create(symptomsDescription: string, specialty?: string, token?: string) {
      return apiCall<{ consultation: Consultation; message: string }>(
        '/create_consultation',
        'POST',
        {
          symptoms_description: symptomsDescription,
          specialty,
        },
        token
      );
    },
  },

  messages: {
    async send(
      consultationId: string,
      message: string,
      attachmentUrl?: string,
      token?: string
    ) {
      return apiCall<{ message: Message }>(
        '/send_message',
        'POST',
        {
          consultation_id: consultationId,
          message,
          attachment_url: attachmentUrl,
        },
        token
      );
    },
  },
};
