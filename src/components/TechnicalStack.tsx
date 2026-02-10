import { Smartphone, Radio, Database, Server, Lock, Zap } from 'lucide-react';

export function TechnicalStack() {
  const technologies = [
    {
      icon: Smartphone,
      name: 'Flutter',
      category: 'Mobile Development',
      description: 'Cross-platform mobile app for iOS and Android with native performance.',
    },
    {
      icon: Radio,
      name: 'WebRTC',
      category: 'Real-time Communication',
      description: 'Peer-to-peer video and chat with end-to-end encryption.',
    },
    {
      icon: Database,
      name: 'Firebase',
      category: 'Authentication & Chat',
      description: 'Secure user authentication and real-time messaging infrastructure.',
    },
    {
      icon: Server,
      name: 'Node.js/Express',
      category: 'Backend API',
      description: 'Scalable REST API for managing users, sessions, and notifications.',
    },
    {
      icon: Database,
      name: 'PostgreSQL',
      category: 'Data Storage',
      description: 'Robust relational database for patient records and consultation history.',
    },
    {
      icon: Zap,
      name: 'Compression Protocol',
      category: 'Optimization',
      description: 'Specialized algorithms for low-bandwidth video and data transmission.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            For Developers & Partners
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Technical Strategy & Stack
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built with cutting-edge technologies optimized for reliability, security, and performance in challenging network conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {tech.name}
                    </h3>
                    <div className="text-sm text-blue-600 font-semibold mb-3">
                      {tech.category}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-600 to-teal-600 p-8 rounded-xl text-white shadow-xl">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Lock className="h-8 w-8" />
            <h3 className="text-2xl font-bold">Enterprise-Grade Architecture</h3>
          </div>
          <p className="text-center text-blue-50 max-w-3xl mx-auto leading-relaxed">
            Our microservices architecture ensures scalability, fault tolerance, and 99.9% uptime. Every component is designed with redundancy and security as top priorities.
          </p>
        </div>
      </div>
    </section>
  );
}
