import { Stethoscope, Mail, MapPin, ArrowRight } from 'lucide-react';

interface FooterProps {
  onDoctorClick: () => void;
  onPatientClick: () => void;
}

export function Footer({ onDoctorClick, onPatientClick }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Stethoscope className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">MedInnovate</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Bridging the rural healthcare access gap through innovative telehealth solutions.
              Empowering communities with instant, secure access to medical guidance.
            </p>
            <div className="flex items-center space-x-2 text-gray-400 mb-3">
              <Mail className="h-5 w-5" />
              <span>contact@medinnovate.health</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <MapPin className="h-5 w-5" />
              <span>VIT Bhopal & Johns Hopkins University Partnership</span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Join our network of healthcare professionals or get instant access to medical guidance today.
            </p>
            <div className="flex flex-col space-y-4">
              <button onClick={onDoctorClick} className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center space-x-2">
                <span>Join as Doctor</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button onClick={onPatientClick} className="w-full px-6 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-lg">
                Get Patient Access
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 MedInnovate. VITB-JHU Health-Hack 2025. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
