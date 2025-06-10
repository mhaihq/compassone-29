export interface PatientSummary {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  primaryDiagnosis: string;
  diagnosisCode: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  lastVisit: string;
  nextAppointment?: string;
  status: 'Active' | 'Inactive';
  isClickable: boolean;
}

export const patientsData: PatientSummary[] = [
  {
    id: "P100592",
    name: "Matteo Grassi",
    dateOfBirth: "1992-03-14",
    gender: "Male",
    primaryDiagnosis: "Essential Hypertension with Depression",
    diagnosisCode: "I10, F32.1",
    severity: "Moderate",
    lastVisit: "2025-05-20",
    nextAppointment: "2025-06-17",
    status: "Active",
    isClickable: true
  },
  {
    id: "P100593",
    name: "James Thompson",
    dateOfBirth: "1985-03-22",
    gender: "Male",
    primaryDiagnosis: "Generalized Anxiety Disorder",
    diagnosisCode: "F41.1",
    severity: "Mild",
    lastVisit: "2025-05-10",
    nextAppointment: "2025-05-25",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100594",
    name: "Maria Rodriguez",
    dateOfBirth: "1978-11-08",
    gender: "Female",
    primaryDiagnosis: "Bipolar Disorder Type I",
    diagnosisCode: "F31.1",
    severity: "Severe",
    lastVisit: "2025-05-12",
    nextAppointment: "2025-05-19",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100595",
    name: "Robert Chen",
    dateOfBirth: "1990-07-14",
    gender: "Male",
    primaryDiagnosis: "Post-Traumatic Stress Disorder",
    diagnosisCode: "F43.1",
    severity: "Moderate",
    lastVisit: "2025-05-08",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100596",
    name: "Sarah Johnson",
    dateOfBirth: "1995-01-30",
    gender: "Female",
    primaryDiagnosis: "Social Anxiety Disorder",
    diagnosisCode: "F40.1",
    severity: "Mild",
    lastVisit: "2025-05-05",
    nextAppointment: "2025-05-26",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100597",
    name: "Emily Davis",
    dateOfBirth: "1988-12-15",
    gender: "Female",
    primaryDiagnosis: "Major Depressive Disorder",
    diagnosisCode: "F32.2",
    severity: "Severe",
    lastVisit: "2025-04-28",
    nextAppointment: "2025-05-20",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100598",
    name: "Michael Wilson",
    dateOfBirth: "1975-06-03",
    gender: "Male",
    primaryDiagnosis: "Panic Disorder",
    diagnosisCode: "F41.0",
    severity: "Moderate",
    lastVisit: "2025-05-15",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100599",
    name: "Lisa Anderson",
    dateOfBirth: "1993-09-22",
    gender: "Female",
    primaryDiagnosis: "Obsessive-Compulsive Disorder",
    diagnosisCode: "F42.2",
    severity: "Mild",
    lastVisit: "2025-05-18",
    nextAppointment: "2025-06-02",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100600",
    name: "David Martinez",
    dateOfBirth: "1982-04-11",
    gender: "Male",
    primaryDiagnosis: "Adjustment Disorder",
    diagnosisCode: "F43.2",
    severity: "Mild",
    lastVisit: "2025-05-22",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100601",
    name: "Jennifer Brown",
    dateOfBirth: "1987-11-07",
    gender: "Female",
    primaryDiagnosis: "Borderline Personality Disorder",
    diagnosisCode: "F60.3",
    severity: "Severe",
    lastVisit: "2025-05-01",
    nextAppointment: "2025-05-15",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100602",
    name: "Christopher Lee",
    dateOfBirth: "1991-02-28",
    gender: "Male",
    primaryDiagnosis: "Attention Deficit Hyperactivity Disorder",
    diagnosisCode: "F90.2",
    severity: "Moderate",
    lastVisit: "2025-05-14",
    nextAppointment: "2025-06-11",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100603",
    name: "Amanda Taylor",
    dateOfBirth: "1996-08-19",
    gender: "Female",
    primaryDiagnosis: "Eating Disorder NOS",
    diagnosisCode: "F50.9",
    severity: "Moderate",
    lastVisit: "2025-05-06",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100604",
    name: "Ryan Garcia",
    dateOfBirth: "1983-12-04",
    gender: "Male",
    primaryDiagnosis: "Substance Use Disorder",
    diagnosisCode: "F19.20",
    severity: "Severe",
    lastVisit: "2025-04-30",
    nextAppointment: "2025-05-14",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100605",
    name: "Jessica White",
    dateOfBirth: "1989-05-16",
    gender: "Female",
    primaryDiagnosis: "Phobic Anxiety Disorder",
    diagnosisCode: "F40.2",
    severity: "Mild",
    lastVisit: "2025-05-17",
    nextAppointment: "2025-06-07",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100606",
    name: "Kevin Miller",
    dateOfBirth: "1994-10-25",
    gender: "Male",
    primaryDiagnosis: "Sleep-Wake Disorder",
    diagnosisCode: "G47.9",
    severity: "Mild",
    lastVisit: "2025-05-21",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100607",
    name: "Nicole Thompson",
    dateOfBirth: "1986-07-12",
    gender: "Female",
    primaryDiagnosis: "Dissociative Disorder",
    diagnosisCode: "F44.9",
    severity: "Moderate",
    lastVisit: "2025-05-03",
    nextAppointment: "2025-05-17",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100608",
    name: "Brandon Clark",
    dateOfBirth: "1981-01-09",
    gender: "Male",
    primaryDiagnosis: "Mood Disorder NOS",
    diagnosisCode: "F39",
    severity: "Moderate",
    lastVisit: "2025-05-11",
    nextAppointment: "2025-05-25",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100609",
    name: "Stephanie Lewis",
    dateOfBirth: "1997-03-30",
    gender: "Female",
    primaryDiagnosis: "Autism Spectrum Disorder",
    diagnosisCode: "F84.0",
    severity: "Mild",
    lastVisit: "2025-05-19",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100610",
    name: "Daniel Harris",
    dateOfBirth: "1984-09-14",
    gender: "Male",
    primaryDiagnosis: "Impulse Control Disorder",
    diagnosisCode: "F63.9",
    severity: "Severe",
    lastVisit: "2025-04-25",
    nextAppointment: "2025-05-09",
    status: "Active",
    isClickable: false
  },
  {
    id: "P100689",
    name: "Maya Thompson",
    dateOfBirth: "1985-11-09",
    gender: "Female",
    primaryDiagnosis: "Anxiety Disorder NOS",
    diagnosisCode: "F41.9",
    severity: "Moderate",
    lastVisit: "2025-05-18",
    nextAppointment: "2025-06-02",
    status: "Active",
    isClickable: false
  }
];
