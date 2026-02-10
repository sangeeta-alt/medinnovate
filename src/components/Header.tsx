import { Stethoscope } from 'lucide-react';

interface HeaderProps {
  onDoctorClick: () => void;
  onPatientClick: () => void;
}

export function Header({ onDoctorClick, onPatientClick }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">MedInnovate</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={onDoctorClick} className="px-6 py-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Join as Doctor
            </button>
            <button onClick={onPatientClick} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              Get Access
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
