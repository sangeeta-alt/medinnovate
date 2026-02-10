import { Shield, Lock, Eye, FileCheck } from 'lucide-react';

export function TrustCompliance() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Shield className="h-4 w-4" />
            <span>Your Privacy is Our Priority</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trust & Compliance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We adhere to the highest standards of healthcare privacy and data security to protect your sensitive information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-10 rounded-xl border-2 border-blue-200">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-blue-600 text-white w-14 h-14 rounded-lg flex items-center justify-center">
                <Lock className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                HIPAA Compliant
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our platform strictly adheres to Health Insurance Portability and Accountability Act (HIPAA) regulations, ensuring all patient data is handled with the utmost care and confidentiality.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>End-to-end encryption for all communications</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Secure data storage with access controls</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Regular security audits and compliance reviews</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-10 rounded-xl border-2 border-teal-200">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-teal-600 text-white w-14 h-14 rounded-lg flex items-center justify-center">
                <Eye className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Data Privacy
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your personal health information is never shared without explicit consent. We implement industry-leading practices to safeguard your privacy at every step.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                <span>No third-party data sharing or selling</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                <span>Anonymized data for quality improvement only</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                <span>Patient control over data access and deletion</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900 text-white p-10 rounded-xl shadow-xl">
          <div className="text-center max-w-3xl mx-auto">
            <FileCheck className="h-16 w-16 text-blue-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">
              Verified Healthcare Professionals
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              All doctors on our platform undergo rigorous verification including medical license validation, background checks, and continuous performance monitoring to ensure you receive care from qualified, trusted professionals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
                <div className="text-sm text-gray-300">License Verified</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400 mb-1">Secure</div>
                <div className="text-sm text-gray-300">Data Handling</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400 mb-1">24/7</div>
                <div className="text-sm text-gray-300">Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
