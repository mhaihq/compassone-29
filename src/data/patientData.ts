
// Patient data schema
export interface PatientData {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  diagnosis: {
    primary: string;
    code: string;
    date: string;
    severity: 'Mild' | 'Moderate' | 'Severe';
    diagnosedBy: string;
  };
  medicalHistory: {
    pastConditions: Array<{
      condition: string;
      diagnosedDate: string;
      status: 'Active' | 'Resolved';
      notes: string;
    }>;
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      startDate: string;
      endDate?: string;
      prescribedBy: string;
    }>;
    allergies: Array<{
      allergen: string;
      reaction: string;
      severity: 'Mild' | 'Moderate' | 'Severe';
    }>;
    familyHistory: Array<{
      condition: string;
      relation: string;
      notes: string;
    }>;
  };
  treatmentPlan: {
    goals: Array<{
      description: string;
      status: 'Not Started' | 'In Progress' | 'Achieved';
      targetDate?: string;
    }>;
    interventions: Array<{
      type: string;
      frequency: string;
      notes: string;
    }>;
    assessments: Array<{
      name: string;
      date: string;
      score: string;
      administrator: string;
      notes?: string;
    }>;
  };
  sessionNotes: Array<{
    id: string;
    date: string;
    provider: string;
    duration: string;
    notes: string;
    interventionsUsed: string[];
    medicationChanges?: {
      medication: string;
      change: string;
      reason: string;
    };
    nextAppointment?: string;
    moodRating: number; // 1-10
  }>;
}

// Mock data for our patient
export const patientData: PatientData = {
  id: "P100592",
  name: "Matteo Grassi",
  dateOfBirth: "1992-03-14",
  gender: "Male",
  contactInfo: {
    phone: "(555) 234-5678",
    email: "matteo.grassi@example.com",
    address: "456 Wellness Blvd, Milano Heights, CA 90211"
  },
  insurance: {
    provider: "BlueCross BlueShield",
    policyNumber: "BCBS-2025-89012",
    groupNumber: "HTN-CARE-Y55"
  },
  emergencyContact: {
    name: "Sofia Grassi",
    relationship: "Sister",
    phone: "(555) 876-5432"
  },
  diagnosis: {
    primary: "Essential Hypertension with Depression",
    code: "I10, F32.1",
    date: "2024-11-10",
    severity: "Moderate",
    diagnosedBy: "Dr. Maria Rodriguez"
  },
  medicalHistory: {
    pastConditions: [
      {
        condition: "Essential Hypertension",
        diagnosedDate: "2024-11-10",
        status: "Active",
        notes: "Stage 1 hypertension, well-controlled with medication and lifestyle changes."
      },
      {
        condition: "Major Depressive Disorder, Single Episode",
        diagnosedDate: "2024-12-05",
        status: "Active",
        notes: "Moderate depression, responding well to therapy and medication."
      }
    ],
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "2024-11-15",
        prescribedBy: "Dr. Maria Rodriguez"
      },
      {
        name: "Sertraline (Zoloft)",
        dosage: "50mg",
        frequency: "Once daily",
        startDate: "2024-12-10",
        prescribedBy: "Dr. Sarah Chen"
      },
      {
        name: "Hydrochlorothiazide",
        dosage: "25mg",
        frequency: "Once daily",
        startDate: "2024-11-15",
        prescribedBy: "Dr. Maria Rodriguez"
      }
    ],
    allergies: [
      {
        allergen: "Shellfish",
        reaction: "Hives and swelling",
        severity: "Moderate"
      }
    ],
    familyHistory: [
      {
        condition: "Hypertension",
        relation: "Father",
        notes: "Diagnosed at age 45, managed with medication"
      },
      {
        condition: "Depression",
        relation: "Mother",
        notes: "History of postpartum depression, treated successfully"
      }
    ]
  },
  treatmentPlan: {
    goals: [
      {
        description: "Achieve target blood pressure <130/80 mmHg consistently",
        status: "In Progress",
        targetDate: "2025-08-15"
      },
      {
        description: "Reduce depressive symptoms by 50% as measured by PHQ-9",
        status: "In Progress",
        targetDate: "2025-09-01"
      },
      {
        description: "Establish consistent exercise routine (150 min/week)",
        status: "In Progress",
        targetDate: "2025-07-01"
      }
    ],
    interventions: [
      {
        type: "Cognitive Behavioral Therapy (CBT)",
        frequency: "Bi-weekly sessions",
        notes: "Focusing on stress management and healthy coping strategies"
      },
      {
        type: "Medication Management",
        frequency: "Monthly reviews",
        notes: "Monitoring blood pressure response and mood improvements"
      },
      {
        type: "Lifestyle Counseling",
        frequency: "Ongoing",
        notes: "Diet modification, exercise plan, stress reduction techniques"
      }
    ],
    assessments: [
      {
        name: "Blood Pressure Monitoring",
        date: "2025-05-20",
        score: "128/82 mmHg (improving trend)",
        administrator: "Dr. Maria Rodriguez",
        notes: "Approaching target range"
      },
      {
        name: "PHQ-9 (Depression Screening)",
        date: "2025-05-18",
        score: "11 (Moderate depression)",
        administrator: "Dr. Sarah Chen",
        notes: "Decrease from initial score of 16"
      },
      {
        name: "Exercise Tolerance Assessment",
        date: "2025-05-15",
        score: "Good - can walk 30 minutes without SOB",
        administrator: "Physical Therapist Mike Johnson"
      }
    ]
  },
  sessionNotes: [
    {
      id: "SN-3456",
      date: "2025-05-20",
      provider: "Dr. Maria Rodriguez",
      duration: "30 minutes",
      notes: "Blood pressure check and medication review. Patient reports feeling more energetic and motivated since starting sertraline. BP reading 128/82, showing good improvement. Discussed importance of continued medication adherence and lifestyle modifications.",
      interventionsUsed: ["Medication management", "Patient education"],
      nextAppointment: "2025-06-17",
      moodRating: 6
    },
    {
      id: "SN-3455",
      date: "2025-05-18",
      provider: "Dr. Sarah Chen",
      duration: "45 minutes",
      notes: "Therapy session focused on stress management techniques. Patient practicing deep breathing exercises daily and reports improved sleep quality. PHQ-9 score down to 11 from 16. Discussed workplace stress and developed coping strategies.",
      interventionsUsed: ["CBT", "Stress management", "Mindfulness"],
      nextAppointment: "2025-06-01",
      moodRating: 6
    },
    {
      id: "SN-3454",
      date: "2025-05-10",
      provider: "Dr. Maria Rodriguez",
      duration: "25 minutes",
      notes: "Follow-up for hypertension management. Patient adherent to medications. Home BP readings averaging 132/84. Encouraged to continue current regimen and lifestyle modifications. Weight stable at 178 lbs.",
      interventionsUsed: ["Medication management", "Lifestyle counseling"],
      nextAppointment: "2025-05-20",
      moodRating: 5
    },
    {
      id: "SN-3453",
      date: "2025-05-03",
      provider: "Dr. Sarah Chen",
      duration: "50 minutes",
      notes: "Second therapy session. Patient opening up about work-related stress and perfectionist tendencies. Introduced cognitive restructuring techniques. Homework: thought record for negative self-talk patterns. Mood improving slightly.",
      interventionsUsed: ["CBT", "Cognitive restructuring"],
      nextAppointment: "2025-05-18",
      moodRating: 5
    },
    {
      id: "SN-3452",
      date: "2025-04-26",
      provider: "Dr. Sarah Chen",
      duration: "50 minutes",
      notes: "Initial therapy session for depression treatment. Established therapeutic rapport and conducted comprehensive assessment. Patient motivated for treatment and shows good insight. Discussed CBT approach and set initial treatment goals.",
      interventionsUsed: ["Assessment", "Treatment planning", "Psychoeducation"],
      nextAppointment: "2025-05-03",
      moodRating: 4
    }
  ]
};
