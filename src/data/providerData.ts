
export interface Provider {
  id: string;
  name: string;
  role: 'MD' | 'DO' | 'NP' | 'PA' | 'RN' | 'LCSW' | 'Psychiatrist';
  specialty: string[];
  availability: string[];
  profileImage?: string;
  bio: string;
}

export const providers: Provider[] = [
  {
    id: "DR-001",
    name: "Dr. Sandra Kim, MD",
    role: "MD",
    specialty: ["Primary Care", "Chronic Disease Management", "Hypertension", "Diabetes"],
    availability: ["Monday AM", "Wednesday Full Day", "Thursday PM"],
    bio: "Dr. Kim is a board-certified internist with 18 years of primary care experience. She specializes in managing complex chronic conditions including hypertension, diabetes, and heart failure using evidence-based CCM protocols."
  },
  {
    id: "DR-002",
    name: "Dr. James Okafor, DO",
    role: "DO",
    specialty: ["Family Medicine", "Geriatric Care", "COPD", "Cardiovascular Disease"],
    availability: ["Monday PM", "Tuesday Full Day", "Friday AM"],
    bio: "Dr. Okafor is a family medicine physician with a focus on geriatric and chronic disease management. He has extensive experience guiding APCM-enrolled patients through complex multi-condition care plans."
  },
  {
    id: "NP-001",
    name: "Patricia Nguyen, NP",
    role: "NP",
    specialty: ["Chronic Care Management", "Medication Reconciliation", "Patient Education"],
    availability: ["Tuesday AM", "Wednesday PM", "Thursday Full Day", "Friday PM"],
    bio: "Patricia is a nurse practitioner with specialized training in CCM program coordination. She leads monthly monitoring calls, manages care plan updates, and coordinates specialist referrals for a panel of 85 CCM patients."
  },
  {
    id: "PA-001",
    name: "Marcus Webb, PA",
    role: "PA",
    specialty: ["Internal Medicine", "Diabetes Management", "Preventive Care"],
    availability: ["Monday Full Day", "Wednesday AM", "Friday Full Day"],
    bio: "Marcus is a physician assistant with 10 years of internal medicine experience. He supports CCM billing under physician supervision, handling care gap closures and transitional care follow-ups."
  },
  {
    id: "RN-001",
    name: "Linda Torres, RN",
    role: "RN",
    specialty: ["Care Coordination", "Telehealth Monitoring", "Patient Coaching"],
    availability: ["Monday–Friday, 8 AM – 4 PM"],
    bio: "Linda is a registered nurse serving as the primary care coordinator for the CCM program. She conducts monthly check-in calls, logs care time, and escalates to the supervising physician when clinical thresholds are met."
  },
  {
    id: "DR-003",
    name: "Dr. Anita Sharma, MD",
    role: "MD",
    specialty: ["Nephrology", "CKD Management", "Hypertension"],
    availability: ["Tuesday PM", "Thursday AM"],
    bio: "Dr. Sharma is a nephrologist who co-manages CKD patients enrolled in CCM. She collaborates with primary care on medication adjustments and lab monitoring to slow disease progression."
  },
  {
    id: "DR-004",
    name: "Dr. Elena Rodriguez, Psychiatrist",
    role: "Psychiatrist",
    specialty: ["Comorbid Depression", "Bipolar Disorder", "Anxiety in Chronic Illness"],
    availability: ["Wednesday AM", "Thursday PM", "Friday AM"],
    bio: "Dr. Rodriguez manages psychiatric comorbidities in CCM-enrolled patients. She coordinates with the primary care team to ensure mental health conditions are addressed within the patient's chronic care management plan."
  },
  {
    id: "LCSW-001",
    name: "Darlene Hughes, LCSW",
    role: "LCSW",
    specialty: ["Behavioral Health Integration", "Social Determinants of Health", "Care Navigation"],
    availability: ["Monday AM", "Tuesday PM", "Thursday Full Day"],
    bio: "Darlene addresses social barriers to care — transportation, food insecurity, housing — that affect CCM patients' ability to manage chronic conditions. She connects patients to community resources and supports care plan adherence."
  }
];

// Currently assigned providers to the primary demo patient (Matteo Grassi)
export const patientProviders = ["DR-001", "NP-001", "DR-004"];
