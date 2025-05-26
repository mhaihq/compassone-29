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
        
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Patient Details</h2>
          <p className="text-muted-foreground text-lg">
            Use the Hana Compass sidebar to access detailed patient information and care tasks.
          </p>
        </div>
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
        `}
      </style>
    </div>
  );
};

export default PatientDetail;
