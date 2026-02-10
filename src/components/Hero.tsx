import { ArrowRight, Heart } from 'lucide-react';

interface HeroProps {
  onDoctorClick: () => void;
  onPatientClick: () => void;
}

export function Hero({ onDoctorClick, onPatientClick }: HeroProps) {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Heart className="h-4 w-4" />
            <span>VITB-JHU Health-Hack 2025</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Bridging the Rural Healthcare Access Gap
          </h1>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            An on-demand telehealth membership providing instant, 24/7 access to medical guidance for non-emergency needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button onClick={onDoctorClick} className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
              <span>Join the Network</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button onClick={onPatientClick} className="w-full sm:w-auto px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl">
              Get Access as Patient
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Instant Access</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-gray-600">Secure & Private</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">Low</div>
            <div className="text-gray-600">Bandwidth Optimized</div>
          </div>
        </div>
      </div>
    </section>
  );
}
