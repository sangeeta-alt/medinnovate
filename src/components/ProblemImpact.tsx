import { MapPin, Wifi, DollarSign, Users, Building2, Leaf } from 'lucide-react';

export function ProblemImpact() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The Challenge We're Solving
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rural communities face unique barriers to healthcare access that create ripple effects across society.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-red-50 p-8 rounded-xl border-2 border-red-200">
            <Wifi className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Poor Internet Connectivity</h3>
            <p className="text-gray-600 leading-relaxed">
              Limited bandwidth makes traditional video consultations nearly impossible in remote areas.
            </p>
          </div>

          <div className="bg-red-50 p-8 rounded-xl border-2 border-red-200">
            <Users className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Low Tech Skills</h3>
            <p className="text-gray-600 leading-relaxed">
              Complex interfaces and digital literacy barriers prevent many from seeking online healthcare.
            </p>
          </div>

          <div className="bg-red-50 p-8 rounded-xl border-2 border-red-200">
            <DollarSign className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">High Travel Costs</h3>
            <p className="text-gray-600 leading-relaxed">
              Long distances to healthcare facilities create financial and time burdens for families.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-12 rounded-2xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Multi-Dimensional Impact
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
                <h4 className="text-lg font-bold text-gray-900">Social Impact</h4>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Democratizing health advice for underserved populations and empowering communities with instant access to care.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="h-8 w-8 text-blue-600" />
                <h4 className="text-lg font-bold text-gray-900">Economic Impact</h4>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Reducing ER clutter for non-emergencies, lowering healthcare costs, and minimizing time away from work.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <Leaf className="h-8 w-8 text-blue-600" />
                <h4 className="text-lg font-bold text-gray-900">Environmental Impact</h4>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Lowering carbon footprints by eliminating unnecessary travel for routine medical consultations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
