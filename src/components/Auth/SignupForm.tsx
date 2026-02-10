import { useState } from 'react';
import { Mail, Lock, User, AlertCircle, Loader } from 'lucide-react';
import { api } from '../../lib/api';

interface SignupFormProps {
  userType: 'doctor' | 'patient';
  onSuccess: () => void;
  onSwitchMode: () => void;
}

export function SignupForm({ userType, onSuccess, onSwitchMode }: SignupFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    ...(userType === 'doctor' && {
      licenseNumber: '',
      specialty: 'General Practice',
    }),
    ...(userType === 'patient' && {
      age: '',
      location: '',
    }),
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (userType === 'doctor') {
        const doctorData = formData as any;
        if (!doctorData.licenseNumber || !doctorData.specialty) {
          throw new Error('License number and specialty are required');
        }

        await api.auth.signupDoctor(
          doctorData.email,
          doctorData.password,
          doctorData.fullName,
          doctorData.licenseNumber,
          doctorData.specialty
        );
      } else {
        const patientData = formData as any;
        await api.auth.signupPatient(
          patientData.email,
          patientData.password,
          patientData.fullName,
          patientData.age ? parseInt(patientData.age) : undefined,
          patientData.location || undefined
        );
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="John Doe"
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {userType === 'doctor' && (
        <>
          <div>
            <label htmlFor="licenseNumber" className="block text-sm font-semibold text-gray-900 mb-2">
              Medical License Number
            </label>
            <input
              id="licenseNumber"
              type="text"
              value={(formData as any).licenseNumber || ''}
              onChange={(e) =>
                setFormData({ ...formData, licenseNumber: e.target.value } as any)
              }
              placeholder="LICENSE123456"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="specialty" className="block text-sm font-semibold text-gray-900 mb-2">
              Specialty
            </label>
            <select
              id="specialty"
              value={(formData as any).specialty || 'General Practice'}
              onChange={(e) =>
                setFormData({ ...formData, specialty: e.target.value } as any)
              }
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              disabled={isLoading}
            >
              <option>General Practice</option>
              <option>Cardiology</option>
              <option>Pediatrics</option>
              <option>Dermatology</option>
              <option>Psychiatry</option>
              <option>Orthopedics</option>
              <option>Other</option>
            </select>
          </div>
        </>
      )}

      {userType === 'patient' && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="age" className="block text-sm font-semibold text-gray-900 mb-2">
                Age
              </label>
              <input
                id="age"
                type="number"
                value={(formData as any).age || ''}
                onChange={(e) => setFormData({ ...formData, age: e.target.value } as any)}
                placeholder="30"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-900 mb-2">
                Location
              </label>
              <input
                id="location"
                type="text"
                value={(formData as any).location || ''}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value } as any)
                }
                placeholder="Rural Area"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                disabled={isLoading}
              />
            </div>
          </div>
        </>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
            required
            disabled={isLoading}
            minLength={6}
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
        <span>{isLoading ? 'Creating account...' : 'Sign Up'}</span>
      </button>

      <p className="text-center text-gray-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchMode}
          className="text-blue-600 font-semibold hover:text-blue-700"
        >
          Sign In
        </button>
      </p>
    </form>
  );
}
