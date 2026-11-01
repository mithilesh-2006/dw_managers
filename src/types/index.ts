// DW Control Center - Core TypeScript Definitions

export type Severity = 'info' | 'warning' | 'error' | 'critical';

export interface SystemEvent {
  id: string;
  timestamp: string;
  sourceManager: string;
  category: Severity;
  message: string;
  details?: string;
  recommendedAction?: string;
  acknowledged: boolean;
}

export interface ServerConfig {
  serverName: string;
  os: string;
  cpuCores: number;
  cpuUtilization: number; // percentage
  ramTotalGb: number;
  ramAllocatedGb: number;
  ramBufferPoolMb: number;
  storageTotalGb: number;
  storageAllocatedGb: number;
  storageUsedGb: number;
  maxConnections: number;
  walMode: 'NORMAL' | 'AGGRESSIVE' | 'OFF';
  compressionEnabled: boolean;
}

export type JobType = 
  | 'attendance_loading' 
  | 'exam_loading' 
  | 'placement_loading' 
  | 'backup' 
  | 'report_generation'
  | 'partition_maintenance'
  | 'index_rebuild';

export type JobFrequency = 'Hourly' | 'Daily (Midnight)' | 'Weekly' | 'Monthly' | 'Manual';

export interface ScheduledJob {
  id: string;
  name: string;
  type: JobType;
  frequency: JobFrequency;
  time: string;
  enabled: boolean;
  status: 'IDLE' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  lastRun?: string;
  nextRun: string;
  executionCount: number;
  logs: string[];
}

export interface StudentRecord {
  student_id: string;
  name: string;
  gender: 'M' | 'F';
  department_id: string;
  department_name: string;
  batch: string;
  cgpa: number;
  attendance_pct: number;
  email: string;
  phone: string;
  placement_status: 'Placed' | 'In Process' | 'Not Placed' | 'Higher Studies';
}

export interface DepartmentRecord {
  department_id: string;
  department_name: string;
  hod_name: string;
  intake: number;
  labs_count: number;
}

export interface AttendanceRecord {
  attendance_id: string;
  student_id: string;
  student_name: string;
  department_id: string;
  date: string;
  academic_year: string;
  semester: number;
  hours_attended: number;
  total_hours: number;
  percentage: number;
  status: 'Present' | 'Absent' | 'On Duty';
}

export interface ExamRecord {
  exam_id: string;
  student_id: string;
  student_name: string;
  department_id: string;
  academic_year: string;
  semester: number;
  subject_code: string;
  subject_name: string;
  internal_marks: number;
  external_marks: number;
  total_marks: number;
  grade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'RA';
  credits: number;
}

export interface PlacementRecord {
  placement_id: string;
  student_id: string;
  student_name: string;
  department_id: string;
  academic_year: string;
  company_name: string;
  role: string;
  package_lpa: number;
  offer_type: 'Dream' | 'Tier-1' | 'Regular';
  interview_rounds: number;
  status: 'Selected' | 'Shortlisted' | 'Rejected';
}

export interface FacultyRecord {
  faculty_id: string;
  name: string;
  department_id: string;
  designation: 'Professor' | 'Associate Professor' | 'Assistant Professor';
  experience_years: number;
  specialization: string;
}

export interface DatabaseTableMeta {
  name: string;
  type: 'Fact' | 'Dimension' | 'Staging' | 'Aggregation';
  recordCount: number;
  sizeKb: number;
  columns: {
    name: string;
    type: string;
    isPrimary?: boolean;
    isForeign?: boolean;
    refTable?: string;
    nullable?: boolean;
  }[];
  partitions?: string[];
  indexes?: string[];
}

export interface SimulatedUser {
  id: string;
  username: string;
  role: 'DB_ADMIN' | 'DATA_ANALYST' | 'DEPT_VIEWER' | 'RESTRICTED_GUEST';
  permissions: {
    select: boolean;
    insert: boolean;
    update: boolean;
    delete: boolean;
  };
}

export interface BackupSnapshot {
  id: string;
  timestamp: string;
  description: string;
  recordCount: number;
  sizeMb: number;
  stateDump: {
    students: StudentRecord[];
    departments: DepartmentRecord[];
    attendance: AttendanceRecord[];
    exams: ExamRecord[];
    placements: PlacementRecord[];
    faculty: FacultyRecord[];
    serverConfig: ServerConfig;
  };
}

export interface ETLRecord {
  id: string;
  raw: Record<string, any>;
  transformed?: Record<string, any>;
  errors: string[];
  status: 'EXTRACTED' | 'VALID' | 'CLEANED' | 'REJECTED' | 'LOADED';
}

export interface ETLBatch {
  id: string;
  sourceDataset: string;
  targetTable: string;
  timestamp: string;
  totalExtracted: number;
  transformedCount: number;
  loadedCount: number;
  rejectedCount: number;
  records: ETLRecord[];
  rulesApplied: {
    deduplication: boolean;
    normalization: boolean;
    nullHandling: boolean;
    typeValidation: boolean;
  };
}

export interface WarehousePartition {
  name: string;
  year: string;
  rowCount: number;
  sizeMb: number;
  active: boolean;
}

export interface QueryHistoryItem {
  id: string;
  sql: string;
  timestamp: string;
  executionTimeMs: number;
  rowCount: number;
  status: 'SUCCESS' | 'ERROR';
  error?: string;
  usedIndex?: string;
}

export interface SimulatedIndex {
  id: string;
  name: string;
  tableName: string;
  columnName: string;
  type: 'B-Tree' | 'Bitmap';
  sizeKb: number;
  createdOn: string;
  speedupFactor: number; // e.g. 3.5x faster
}

export interface DataQualityTest {
  id: string;
  name: string;
  category: 'Completeness' | 'Uniqueness' | 'Consistency' | 'Referential Integrity' | 'Range Validation';
  description: string;
  status: 'PENDING' | 'PASS' | 'FAIL';
  failingCount: number;
  failingRecords: any[];
  expected: string;
  actual: string;
}

export interface EducationalConcept {
  managerId: string;
  managerName: string;
  category: 'System Management' | 'Process Management';
  definition: string;
  purpose: string;
  keyResponsibilities: string[];
  realWorldExample: string;
  differenceFromRelated: string;
  oneLineTakeaway: string;
  annaUnivTopic: string;
  quizQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}
