import { useState } from 'react';
import { X, Stethoscope } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (userType: 'doctor' | 'patient') => void;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [userType, setUserType] = useState<'doctor' | 'patient'>('patient');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-lg text-gray-900">MedInnovate</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {mode === 'login' ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome Back</h2>
              <LoginForm
                onSuccess={(type) => {
                  onAuthSuccess(type);
                  onClose();
                }}
                onSwitchMode={() => setMode('signup')}
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600 text-sm mb-6">
                Join as a{' '}
                <button
                  onClick={() =>
                    setUserType(userType === 'doctor' ? 'patient' : 'doctor')
                  }
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  {userType === 'doctor' ? 'Patient' : 'Doctor'}
                </button>
              </p>

              <div className="bg-blue-50 p-4 rounded-lg mb-6 border-2 border-blue-200">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    {userType === 'doctor' ? 'MD' : 'P'}
                  </div>
                  <span className="font-semibold text-gray-900">
                    {userType === 'doctor' ? 'Doctor Account' : 'Patient Account'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {userType === 'doctor'
                    ? 'Help patients and earn by providing consultations.'
                    : 'Get instant access to medical guidance 24/7.'}
                </p>
              </div>

              <SignupForm
                userType={userType}
                onSuccess={() => {
                  onAuthSuccess(userType);
                  onClose();
                }}
                onSwitchMode={() => setMode('login')}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
