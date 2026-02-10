import { useState } from 'react';
import { Mail, Lock, AlertCircle, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface LoginFormProps {
  onSuccess: (userType: 'doctor' | 'patient') => void;
  onSwitchMode: () => void;
}

export function LoginForm({ onSuccess, onSwitchMode }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      const userId = data.user?.id;
      if (!userId) throw new Error('No user ID returned');

      const doctorPromise = supabase
        .from('doctors')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      const patientPromise = supabase
        .from('patients')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      const [doctorResult, patientResult] = await Promise.all([
        doctorPromise,
        patientPromise,
      ]);

      if (doctorResult.data) {
        onSuccess('doctor');
      } else if (patientResult.data) {
        onSuccess('patient');
      } else {
        throw new Error('No profile found for this user');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-start space-x-3 bg-red-50 p-4 rounded-lg border-2 border-red-200">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading && <Loader className="h-5 w-5 animate-spin" />}
        <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
      </button>

      <p className="text-center text-gray-600">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchMode}
          className="text-blue-600 font-semibold hover:text-blue-700"
        >
          Sign Up
        </button>
      </p>
    </form>
  );
}
