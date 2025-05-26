
import React from 'react';
import PopulationSidebar from '@/components/layout/PopulationSidebar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card backdrop-blur-md bg-white/80">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-primary">CareHealth EHR</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container py-6">
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Welcome to CareHealth EHR</h2>
          <p className="text-muted-foreground text-lg">
            Use the Hana Compass sidebar to access patient information and care tasks.
          </p>
        </div>
      </main>

      <PopulationSidebar />
      
      <style>
        {`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(30, 77, 54, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(30, 77, 54, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(30, 77, 54, 0);
          }
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        `}
      </style>
    </div>
  );
};

export default Index;
