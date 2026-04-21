
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { providers, patientProviders, Provider } from '@/data/providerData';
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export const ProviderAssignment: React.FC = () => {
  // Filter to get assigned providers
  const assignedProviders = providers.filter(provider => 
    patientProviders.includes(provider.id)
  );

  // Filter to get available but not assigned providers
  const availableProviders = providers.filter(provider => 
    !patientProviders.includes(provider.id)
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Care Team</CardTitle>
            <CardDescription>Mental health providers assigned to this patient</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Assigned Providers</h3>
          <div className="grid grid-cols-1 gap-4">
            {assignedProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} isAssigned={true} />
            ))}
          </div>
        </div>

        {availableProviders.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-3">Available Providers</h3>
            <div className="grid grid-cols-1 gap-4">
              {availableProviders.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} isAssigned={false} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface ProviderCardProps {
  provider: Provider;
  isAssigned: boolean;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, isAssigned }) => {
  // Get role color
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Psychiatrist': return 'border-clinical-blue bg-clinical-blue/10';
      case 'Psychologist': return 'border-clinical-green bg-clinical-green/10';
      case 'Therapist': return 'border-clinical-purple bg-clinical-purple/10';
      case 'Counselor': return 'border-clinical-orange bg-clinical-orange/10';
      default: return 'border-muted bg-muted/10';
    }
  };

  return (
    <div className={`p-4 border rounded-lg ${isAssigned ? getRoleColor(provider.role) : ''}`}>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-medium">{provider.name}</div>
            <div className="text-sm text-muted-foreground">{provider.role}</div>
          </div>
        </div>
        {isAssigned ? (
          <Button variant="outline" size="sm">
            View Schedule
          </Button>
        ) : (
          <Button size="sm">
            Assign
          </Button>
        )}
      </div>
      
      <div className="mt-3">
        <div className="text-sm font-medium">Specialties</div>
        <div className="flex flex-wrap gap-1 mt-1">
          {provider.specialty.map((item, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {item}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="mt-3">
        <div className="text-sm font-medium">Availability</div>
        <div className="text-sm text-muted-foreground mt-1">
          {provider.availability.join(', ')}
        </div>
      </div>
    </div>
  );
};

