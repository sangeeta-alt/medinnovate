import { Search, Palette, Code, TestTube, Rocket, Wrench } from 'lucide-react';

export function Lifecycle() {
  const phases = [
    {
      icon: Search,
      title: 'Discovery',
      description: 'User research, requirement gathering, and stakeholder alignment.',
    },
    {
      icon: Palette,
      title: 'Design',
      description: 'UI/UX design, prototyping, and accessibility testing.',
    },
    {
      icon: Code,
      title: 'Development',
      description: 'Agile sprints with continuous integration and code reviews.',
    },
    {
      icon: TestTube,
      title: 'Testing',
      description: 'Comprehensive QA, security audits, and user acceptance testing.',
    },
    {
      icon: Rocket,
      title: 'Deployment',
      description: 'Staged rollout with monitoring and performance optimization.',
    },
    {
      icon: Wrench,
      title: 'Maintenance',
      description: 'Ongoing support, updates, and feature enhancements.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Implementation Lifecycle
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our Agile Scrum methodology ensures rapid, iterative delivery with continuous feedback and improvement.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-gray-100 hover:border-blue-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-teal-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="text-sm font-bold text-blue-600 mb-2">
                      PHASE {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white p-10 rounded-xl shadow-lg border-2 border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Agile Scrum Framework
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2 Weeks</div>
                <div className="text-gray-600">Sprint Duration</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">Daily</div>
                <div className="text-gray-600">Stand-ups</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">Continuous</div>
                <div className="text-gray-600">Integration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
