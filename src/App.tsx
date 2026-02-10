import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemImpact } from './components/ProblemImpact';
import { HowItWorks } from './components/HowItWorks';
import { TechnicalStack } from './components/TechnicalStack';
import { Lifecycle } from './components/Lifecycle';
import { TrustCompliance } from './components/TrustCompliance';
import { Footer } from './components/Footer';
import { AuthModal } from './components/Auth/AuthModal';

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleDoctorClick = () => {
    setAuthModalOpen(true);
  };

  const handlePatientClick = () => {
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (userType: 'doctor' | 'patient') => {
    console.log(`User successfully authenticated as ${userType}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onDoctorClick={handleDoctorClick} onPatientClick={handlePatientClick} />
      <Hero onDoctorClick={handleDoctorClick} onPatientClick={handlePatientClick} />
      <ProblemImpact />
      <HowItWorks />
      <TechnicalStack />
      <Lifecycle />
      <TrustCompliance />
      <Footer onDoctorClick={handleDoctorClick} onPatientClick={handlePatientClick} />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;
