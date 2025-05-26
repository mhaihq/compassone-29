import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { patientData } from '@/data/patientData';
import PatientHeader from '@/components/PatientHeader';
import MedicalHistory from '@/components/MedicalHistory';
import TreatmentPlan from '@/components/TreatmentPlan';
import ProviderNotes from '@/components/ProviderNotes';
import ProviderAssignment from '@/components/ProviderAssignment';
import { PatientInfoCard } from '@/components/layout/sidebar/PatientInfoCard';
import { 
  Brain, CalendarCheck, ClockAlert, Heart, MessageCircle
} from 'lucide-react';
import HanaSidebar from '@/components/layout/HanaSidebar';

const PatientDetail = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [shouldOpenSidebar, setShouldOpenSidebar] = useState(false);

  // Check if we should auto-open the sidebar
  useEffect(() => {
    const openSidebar = searchParams.get('openSidebar');
    if (openSidebar === 'true') {
      setShouldOpenSidebar(true);
      // Clean up the URL parameter
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('openSidebar');
      navigate(`/patient/${patientId}`, { replace: true });
    }
  }, [searchParams, navigate, patientId]);

  // Calculate patient age and other data for the patient info card
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const patientAge = calculateAge(patientData.dateOfBirth);
  
  // Use the most recent session note date as last contacted
  const lastContactedFormatted = patientData.sessionNotes.length > 0 
    ? new Date(patientData.sessionNotes[0].date).toLocaleDateString()
    : 'No recent contact';
  
  // Extract medical conditions from the pastConditions array
  const medicalConditions = patientData.medicalHistory.pastConditions
    .filter(condition => condition.status === 'Active')
    .map(condition => condition.condition);

  // For now, we only support Sthita Pujari's full data
  // Other patients would need their own data structure
  if (patientId !== 'P100592') {
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
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Patients
          </Button>
          
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Patient Record Not Available</h2>
            <p className="text-muted-foreground mb-6">
              Detailed records are only available for authorized patients.
            </p>
            <Button onClick={() => navigate('/')}>
              Return to Patient List
            </Button>
          </div>
        </main>
      </div>
    );
  }

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
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Patients
        </Button>
        
        <PatientHeader patient={patientData} />
        
        {/* Add the compact patient info card */}
        <div className="mb-6">
          <PatientInfoCard 
            patientData={patientData}
            patientAge={patientAge}
            lastContactedFormatted={lastContactedFormatted}
            medicalConditions={medicalConditions}
          />
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start mb-6 bg-transparent border-b rounded-none h-auto p-0 overflow-x-auto medical-scrollbar">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
            >
              <Brain className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="sessions" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Session Notes</span>
            </TabsTrigger>
            <TabsTrigger 
              value="plan" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>Treatment Plan</span>
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
            >
              <Heart className="h-4 w-4" />
              <span>Medical History</span>
            </TabsTrigger>
            <TabsTrigger 
              value="providers" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
            >
              <ClockAlert className="h-4 w-4" />
              <span>Care Team</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <MedicalHistory patient={patientData} />
              </div>
              <div>
                <TreatmentPlan patient={patientData} />
              </div>
            </div>
            <div className="mt-6">
              <ProviderNotes patient={patientData} />
            </div>
          </TabsContent>
          
          <TabsContent value="sessions" className="fade-in">
            <ProviderNotes patient={patientData} />
          </TabsContent>
          
          <TabsContent value="plan" className="fade-in">
            <TreatmentPlan patient={patientData} />
          </TabsContent>
          
          <TabsContent value="history" className="fade-in">
            <MedicalHistory patient={patientData} />
          </TabsContent>
          
          <TabsContent value="providers" className="fade-in">
            <ProviderAssignment />
          </TabsContent>
        </Tabs>
      </main>

      <HanaSidebar autoOpen={shouldOpenSidebar} />
      
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
        
        .medical-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        
        .medical-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .medical-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 2px;
        }

        .fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        `}
      </style>
    </div>
  );
};

export default PatientDetail;
