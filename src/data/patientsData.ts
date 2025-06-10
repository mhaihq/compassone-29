
export interface PatientSummary {
  id: string;
  name: string;
  dateOfBirth: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  primaryDiagnosis: string;
  lastVisit: string;
  gender: string;
  diagnosisCode: string;
  nextAppointment?: string;
  status: 'Active' | 'Inactive';
  isClickable: boolean;
}

export const patientsData: PatientSummary[] = [
  // Existing patients
  {
    id: "P001",
    name: "Emily Chen",
    dateOfBirth: "1985-03-15",
    severity: "Severe",
    primaryDiagnosis: "Hypertension",
    lastVisit: "2024-06-08",
    gender: "Female",
    diagnosisCode: "I10",
    nextAppointment: "2024-06-15",
    status: "Active",
    isClickable: true
  },
  {
    id: "P002", 
    name: "Michael Rodriguez",
    dateOfBirth: "1978-11-22",
    severity: "Moderate",
    primaryDiagnosis: "Type 2 Diabetes",
    lastVisit: "2024-06-05",
    gender: "Male",
    diagnosisCode: "E11",
    nextAppointment: "2024-06-12",
    status: "Active",
    isClickable: true
  },
  {
    id: "P003",
    name: "Sarah Thompson",
    dateOfBirth: "1992-07-08",
    severity: "Mild",
    primaryDiagnosis: "Asthma",
    lastVisit: "2024-06-03",
    gender: "Female",
    diagnosisCode: "J45",
    nextAppointment: "2024-06-17",
    status: "Active",
    isClickable: true
  },
  {
    id: "P004",
    name: "David Park",
    dateOfBirth: "1965-12-10",
    severity: "Severe",
    primaryDiagnosis: "COPD",
    lastVisit: "2024-06-07",
    gender: "Male",
    diagnosisCode: "J44",
    nextAppointment: "2024-06-14",
    status: "Active",
    isClickable: true
  },
  {
    id: "P005",
    name: "Lisa Johnson",
    dateOfBirth: "1990-04-25",
    severity: "Moderate",
    primaryDiagnosis: "Anxiety",
    lastVisit: "2024-06-06",
    gender: "Female",
    diagnosisCode: "F41",
    status: "Active",
    isClickable: true
  },
  // New patients to fill up the grid
  {
    id: "P006",
    name: "Robert Martinez",
    dateOfBirth: "1972-09-14",
    severity: "Severe",
    primaryDiagnosis: "Heart Disease",
    lastVisit: "2024-06-09",
    gender: "Male",
    diagnosisCode: "I25",
    nextAppointment: "2024-06-16",
    status: "Active",
    isClickable: true
  },
  {
    id: "P007",
    name: "Jennifer Wilson",
    dateOfBirth: "1988-02-28",
    severity: "Moderate",
    primaryDiagnosis: "Depression",
    lastVisit: "2024-06-04",
    gender: "Female",
    diagnosisCode: "F33",
    status: "Active",
    isClickable: true
  },
  {
    id: "P008",
    name: "Kevin Brown",
    dateOfBirth: "1995-06-12",
    severity: "Mild",
    primaryDiagnosis: "Allergies",
    lastVisit: "2024-06-02",
    gender: "Male",
    diagnosisCode: "T78",
    nextAppointment: "2024-06-18",
    status: "Active",
    isClickable: true
  },
  {
    id: "P009",
    name: "Amanda Davis",
    dateOfBirth: "1963-08-07",
    severity: "Severe",
    primaryDiagnosis: "Chronic Kidney Disease",
    lastVisit: "2024-06-08",
    gender: "Female",
    diagnosisCode: "N18",
    nextAppointment: "2024-06-15",
    status: "Active",
    isClickable: true
  },
  {
    id: "P010",
    name: "Thomas Garcia",
    dateOfBirth: "1981-01-19",
    severity: "Moderate",
    primaryDiagnosis: "Arthritis",
    lastVisit: "2024-06-05",
    gender: "Male",
    diagnosisCode: "M79",
    status: "Active",
    isClickable: true
  },
  {
    id: "P011",
    name: "Rachel Lee",
    dateOfBirth: "1993-10-03",
    severity: "Mild",
    primaryDiagnosis: "Migraine",
    lastVisit: "2024-06-01",
    gender: "Female",
    diagnosisCode: "G43",
    nextAppointment: "2024-06-19",
    status: "Active",
    isClickable: true
  },
  {
    id: "P012",
    name: "Christopher Taylor",
    dateOfBirth: "1970-05-16",
    severity: "Severe",
    primaryDiagnosis: "Stroke Recovery",
    lastVisit: "2024-06-09",
    gender: "Male",
    diagnosisCode: "I63",
    nextAppointment: "2024-06-16",
    status: "Active",
    isClickable: true
  },
  {
    id: "P013",
    name: "Maria Gonzalez",
    dateOfBirth: "1986-12-21",
    severity: "Moderate",
    primaryDiagnosis: "Thyroid Disorder",
    lastVisit: "2024-06-06",
    gender: "Female",
    diagnosisCode: "E03",
    status: "Active",
    isClickable: true
  },
  {
    id: "P014",
    name: "James Anderson",
    dateOfBirth: "1991-03-30",
    severity: "Mild",
    primaryDiagnosis: "Sleep Apnea",
    lastVisit: "2024-06-03",
    gender: "Male",
    diagnosisCode: "G47",
    nextAppointment: "2024-06-17",
    status: "Active",
    isClickable: true
  },
  {
    id: "P015",
    name: "Nicole White",
    dateOfBirth: "1967-07-25",
    severity: "Severe",
    primaryDiagnosis: "Cancer Follow-up",
    lastVisit: "2024-06-10",
    gender: "Female",
    diagnosisCode: "Z51",
    nextAppointment: "2024-06-17",
    status: "Active",
    isClickable: true
  },
  {
    id: "P016",
    name: "Daniel Clark",
    dateOfBirth: "1984-11-08",
    severity: "Moderate",
    primaryDiagnosis: "High Cholesterol",
    lastVisit: "2024-06-07",
    gender: "Male",
    diagnosisCode: "E78",
    status: "Active",
    isClickable: true
  },
  {
    id: "P017",
    name: "Stephanie Lewis",
    dateOfBirth: "1996-04-14",
    severity: "Mild",
    primaryDiagnosis: "Dermatitis",
    lastVisit: "2024-06-02",
    gender: "Female",
    diagnosisCode: "L30",
    nextAppointment: "2024-06-18",
    status: "Active",
    isClickable: true
  },
  {
    id: "P018",
    name: "Mark Walker",
    dateOfBirth: "1973-09-02",
    severity: "Severe",
    primaryDiagnosis: "Liver Disease",
    lastVisit: "2024-06-08",
    gender: "Male",
    diagnosisCode: "K72",
    nextAppointment: "2024-06-15",
    status: "Active",
    isClickable: true
  },
  {
    id: "P019",
    name: "Laura Hall",
    dateOfBirth: "1989-01-12",
    severity: "Moderate",
    primaryDiagnosis: "Osteoporosis",
    lastVisit: "2024-06-05",
    gender: "Female",
    diagnosisCode: "M80",
    status: "Active",
    isClickable: true
  },
  {
    id: "P020",
    name: "Steven Young",
    dateOfBirth: "1994-08-27",
    severity: "Mild",
    primaryDiagnosis: "Back Pain",
    lastVisit: "2024-06-01",
    gender: "Male",
    diagnosisCode: "M54",
    nextAppointment: "2024-06-19",
    status: "Active",
    isClickable: true
  },
  {
    id: "P021",
    name: "Patricia King",
    dateOfBirth: "1962-06-18",
    severity: "Severe",
    primaryDiagnosis: "Pulmonary Embolism",
    lastVisit: "2024-06-09",
    gender: "Female",
    diagnosisCode: "I26",
    nextAppointment: "2024-06-16",
    status: "Active",
    isClickable: true
  },
  {
    id: "P022",
    name: "Ryan Scott",
    dateOfBirth: "1987-10-11",
    severity: "Moderate",
    primaryDiagnosis: "Gastritis",
    lastVisit: "2024-06-06",
    gender: "Male",
    diagnosisCode: "K29",
    status: "Active",
    isClickable: true
  },
  {
    id: "P023",
    name: "Michelle Adams",
    dateOfBirth: "1992-02-05",
    severity: "Mild",
    primaryDiagnosis: "Vitamin Deficiency",
    lastVisit: "2024-06-03",
    gender: "Female",
    diagnosisCode: "E56",
    nextAppointment: "2024-06-17",
    status: "Active",
    isClickable: true
  },
  {
    id: "P024",
    name: "Joseph Nelson",
    dateOfBirth: "1969-12-29",
    severity: "Severe",
    primaryDiagnosis: "Atrial Fibrillation",
    lastVisit: "2024-06-10",
    gender: "Male",
    diagnosisCode: "I48",
    nextAppointment: "2024-06-17",
    status: "Active",
    isClickable: true
  },
  {
    id: "P025",
    name: "Karen Baker",
    dateOfBirth: "1983-05-22",
    severity: "Moderate",
    primaryDiagnosis: "Fibromyalgia",
    lastVisit: "2024-06-07",
    gender: "Female",
    diagnosisCode: "M79",
    status: "Active",
    isClickable: true
  },
  {
    id: "P026",
    name: "Brian Carter",
    dateOfBirth: "1997-09-15",
    severity: "Mild",
    primaryDiagnosis: "Tennis Elbow",
    lastVisit: "2024-06-02",
    gender: "Male",
    diagnosisCode: "M77",
    nextAppointment: "2024-06-18",
    status: "Active",
    isClickable: true
  },
  {
    id: "P027",
    name: "Deborah Mitchell",
    dateOfBirth: "1974-03-08",
    severity: "Severe",
    primaryDiagnosis: "Multiple Sclerosis",
    lastVisit: "2024-06-08",
    gender: "Female",
    diagnosisCode: "G35",
    nextAppointment: "2024-06-15",
    status: "Active",
    isClickable: true
  },
  {
    id: "P028",
    name: "Eric Perez",
    dateOfBirth: "1988-07-17",
    severity: "Moderate",
    primaryDiagnosis: "Gout",
    lastVisit: "2024-06-05",
    gender: "Male",
    diagnosisCode: "M10",
    status: "Active",
    isClickable: true
  },
  {
    id: "P029",
    name: "Melissa Roberts",
    dateOfBirth: "1993-11-24",
    severity: "Mild",
    primaryDiagnosis: "Seasonal Allergies",
    lastVisit: "2024-06-01",
    gender: "Female",
    diagnosisCode: "J30",
    nextAppointment: "2024-06-19",
    status: "Active",
    isClickable: true
  },
  {
    id: "P030",
    name: "Gregory Turner",
    dateOfBirth: "1966-04-13",
    severity: "Severe",
    primaryDiagnosis: "Parkinson's Disease",
    lastVisit: "2024-06-09",
    gender: "Male",
    diagnosisCode: "G20",
    nextAppointment: "2024-06-16",
    status: "Active",
    isClickable: true
  }
];
