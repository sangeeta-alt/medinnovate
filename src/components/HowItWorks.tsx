import { FileText, Bell, UserCheck, Video } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: 'Patient Submits Query',
      description: 'Patient enters symptoms and health concerns through our simple, accessible interface.',
      color: 'blue',
    },
    {
      icon: Bell,
      title: 'Doctors Notified',
      description: 'Verified volunteer doctors receive instant push notifications about the consultation request.',
      color: 'teal',
    },
    {
      icon: UserCheck,
      title: 'First to Accept',
      description: 'The first available doctor accepts the request and is connected with the patient.',
      color: 'blue',
    },
    {
      icon: Video,
      title: 'Secure Consultation',
      description: 'Secure consultation via WebRTC chat or video, optimized for low-bandwidth connections.',
      color: 'teal',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple, efficient flow connecting patients with qualified doctors in minutes.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-teal-200 to-blue-200 transform -translate-y-1/2" style={{ top: '80px' }}></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const bgColor = step.color === 'blue' ? 'bg-blue-600' : 'bg-teal-600';
              const borderColor = step.color === 'blue' ? 'border-blue-200' : 'border-teal-200';

              return (
                <div key={index} className="relative">
                  <div className={`bg-white p-8 rounded-xl shadow-lg border-2 ${borderColor} hover:shadow-xl transition-shadow`}>
                    <div className="flex flex-col items-center text-center">
                      <div className={`${bgColor} text-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className={`text-sm font-bold ${step.color === 'blue' ? 'text-blue-600' : 'text-teal-600'} mb-2`}>
                        STEP {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Built for Low Connectivity
          </h3>
          <p className="text-gray-600 text-center leading-relaxed">
            Our platform uses optimized compression protocols to ensure smooth consultations even in areas with limited internet access. The system intelligently adapts between chat and video based on available bandwidth.
          </p>
        </div>
      </div>
    </section>
  );
}
