/*
  # MedInnovate Core Database Schema

  1. New Tables
    - `doctors`: Verified healthcare professionals with license information
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `full_name` (text)
      - `license_number` (text, unique)
      - `specialty` (text)
      - `verified` (boolean, default false)
      - `is_available` (boolean, default false)
      - `current_consultations` (integer, default 0)
      - `created_at` (timestamp)

    - `patients`: Registered patients
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `full_name` (text)
      - `age` (integer)
      - `location` (text)
      - `medical_history` (text, optional)
      - `created_at` (timestamp)

    - `consultations`: Active and historical consultations
      - `id` (uuid, primary key)
      - `patient_id` (uuid, references patients)
      - `doctor_id` (uuid, references doctors)
      - `status` (text: 'pending', 'active', 'completed', 'cancelled')
      - `symptoms_description` (text)
      - `diagnosis` (text, optional)
      - `notes` (text, optional)
      - `started_at` (timestamp)
      - `ended_at` (timestamp, optional)
      - `created_at` (timestamp)

    - `messages`: Chat messages during consultations
      - `id` (uuid, primary key)
      - `consultation_id` (uuid, references consultations)
      - `sender_id` (uuid, references auth.users)
      - `sender_type` (text: 'doctor' or 'patient')
      - `message` (text)
      - `attachment_url` (text, optional)
      - `created_at` (timestamp)

    - `notifications`: Push notifications for doctors
      - `id` (uuid, primary key)
      - `doctor_id` (uuid, references doctors)
      - `consultation_id` (uuid, references consultations)
      - `title` (text)
      - `body` (text)
      - `read` (boolean, default false)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Doctors can only read/update own profile
    - Patients can only read/update own profile
    - Only consultation participants can access messages
    - Doctors can only read own notifications

  3. Indexes
    - doctor_user_id for auth lookups
    - patient_user_id for auth lookups
    - consultation_status for filtering
    - consultation_patient_doctor for lookup
    - messages_consultation_id for query optimization
*/

CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name text NOT NULL,
  license_number text NOT NULL UNIQUE,
  specialty text NOT NULL,
  verified boolean DEFAULT false,
  is_available boolean DEFAULT false,
  current_consultations integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name text NOT NULL,
  age integer,
  location text,
  medical_history text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  symptoms_description text NOT NULL,
  diagnosis text,
  notes text,
  started_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id uuid NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users(id),
  sender_type text NOT NULL CHECK (sender_type IN ('doctor', 'patient')),
  message text NOT NULL,
  attachment_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  consultation_id uuid NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS doctors_user_id_idx ON doctors(user_id);
CREATE INDEX IF NOT EXISTS patients_user_id_idx ON patients(user_id);
CREATE INDEX IF NOT EXISTS consultations_status_idx ON consultations(status);
CREATE INDEX IF NOT EXISTS consultations_patient_doctor_idx ON consultations(patient_id, doctor_id);
CREATE INDEX IF NOT EXISTS messages_consultation_idx ON messages(consultation_id);
CREATE INDEX IF NOT EXISTS notifications_doctor_idx ON notifications(doctor_id);

ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Doctors can read own profile"
  ON doctors FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Doctors can update own profile"
  ON doctors FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can verify doctors"
  ON doctors FOR UPDATE
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert doctors"
  ON doctors FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Patients can read own profile"
  ON patients FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Patients can update own profile"
  ON patients FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can insert patients"
  ON patients FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Patients can read own consultations"
  ON consultations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM patients
      WHERE patients.id = consultations.patient_id
      AND patients.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can read assigned consultations"
  ON consultations FOR SELECT
  TO authenticated
  USING (
    doctor_id IN (
      SELECT id FROM doctors WHERE doctors.user_id = auth.uid()
    ) OR
    patient_id IN (
      SELECT id FROM patients WHERE patients.user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can manage consultations"
  ON consultations FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Participants can read messages"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM consultations c
      WHERE c.id = consultation_id AND (
        c.patient_id IN (SELECT id FROM patients WHERE patients.user_id = auth.uid()) OR
        c.doctor_id IN (SELECT id FROM doctors WHERE doctors.user_id = auth.uid())
      )
    )
  );

CREATE POLICY "Participants can insert messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM consultations c
      WHERE c.id = consultation_id AND (
        c.patient_id IN (SELECT id FROM patients WHERE patients.user_id = auth.uid()) OR
        c.doctor_id IN (SELECT id FROM doctors WHERE doctors.user_id = auth.uid())
      )
    )
  );

CREATE POLICY "Doctors can read own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (
    doctor_id IN (
      SELECT id FROM doctors WHERE doctors.user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can insert notifications"
  ON notifications FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Doctors can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (
    doctor_id IN (
      SELECT id FROM doctors WHERE doctors.user_id = auth.uid()
    )
  );
