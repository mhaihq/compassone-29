
import React from 'react';
import PopulationSidebar from '@/components/layout/PopulationSidebar';
import { HeroOrbitDeck } from '@/components/ui/hero-modern';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroOrbitDeck />
      <PopulationSidebar />
    </div>
  );
};

export default Index;
