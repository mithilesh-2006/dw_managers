// DW Control Center - Centralized Simulation State
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  StudentRecord,
  DepartmentRecord,
  AttendanceRecord,
  ExamRecord,
  PlacementRecord,
  FacultyRecord,
  ServerConfig,
  ScheduledJob,
  SystemEvent,
  SimulatedUser,
  BackupSnapshot,
  ETLBatch,
  ETLRecord,
  WarehousePartition,
  QueryHistoryItem,
  SimulatedIndex,
  DataQualityTest,
  DatabaseTableMeta,
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_DEPARTMENTS,
  INITIAL_ATTENDANCE,
  INITIAL_EXAMS,
  INITIAL_PLACEMENTS,
  INITIAL_FACULTY,
  INITIAL_CONFIG,
  INITIAL_SCHEDULED_JOBS,
  INITIAL_USERS,
} from '../data/initialData';
import { sqlEngine, QueryExecutionResult } from '../services/sqlEngine';

export type SystemHealthStatus = 'NORMAL' | 'CRITICAL_CRASHED' | 'RECOVERING' | 'STORAGE_FULL';

interface SimulationContextType {
  // Data State
  students: StudentRecord[];
  departments: DepartmentRecord[];
  attendance: AttendanceRecord[];
  exams: ExamRecord[];
  placements: PlacementRecord[];
  faculty: FacultyRecord[];
  
  // System State
  systemHealth: SystemHealthStatus;
  crashedReason: string;
  serverConfig: ServerConfig;
  events: SystemEvent[];
  scheduledJobs: ScheduledJob[];
  currentUser: SimulatedUser;
  users: SimulatedUser[];
  backups: BackupSnapshot[];
  indexes: SimulatedIndex[];
  partitions: WarehousePartition[];
  aggregations: Array<{ name: string; description: string; rowCount: number; sql: string; created: string }>;
  etlHistory: ETLBatch[];
  queryHistory: QueryHistoryItem[];
  testResults: DataQualityTest[];
  customTables: DatabaseTableMeta[];

  // Actions - System Configuration
  updateServerConfig: (updates: Partial<ServerConfig>) => void;
  
  // Actions - Event Management
  logEvent: (sourceManager: string, category: SystemEvent['category'], message: string, details?: string, action?: string) => void;
  acknowledgeEvent: (id: string) => void;
  clearEvents: () => void;

  // Actions - Scheduling Management
  createJob: (job: Omit<ScheduledJob, 'id' | 'status' | 'executionCount' | 'logs'>) => void;
  toggleJob: (id: string) => void;
  runJobManually: (id: string) => Promise<boolean>;
  deleteJob: (id: string) => void;

  // Actions - Database Management
  switchUser: (userId: string) => void;
  updateUserPermissions: (userId: string, perms: SimulatedUser['permissions']) => void;
  createCustomTable: (tableMeta: DatabaseTableMeta) => void;

  // Actions - Backup & Recovery
  createBackup: (description?: string) => BackupSnapshot;
  simulateCrash: (reason?: string) => void;
  restoreBackup: (backupId: string) => boolean;
  recoverSystem: () => void;

  // Actions - Load Manager (ETL)
  runETL: (
    sourceType: 'attendance_batch_valid' | 'attendance_batch_dirty' | 'placement_batch_new' | 'student_batch_dirty' | 'custom',
    customRawData?: string,
    rules?: { deduplication: boolean; normalization: boolean; nullHandling: boolean; typeValidation: boolean }
  ) => { processed: number; loaded: number; rejected: number; errors: string[] };

  // Actions - Warehouse Manager
  togglePartition: (name: string) => void;
  createAggregation: (name: string, description: string, sql: string) => void;

  // Actions - Query Manager
  executeQuery: (sql: string) => QueryExecutionResult;

  // Actions - Tuning Manager
  createIndex: (tableName: string, columnName: string, type: 'B-Tree' | 'Bitmap') => void;
  removeIndex: (id: string) => void;

  // Actions - Testing Manager
  runDataQualityTests: () => DataQualityTest[];
  fixDuplicateStudents: () => void;
  injectQualityAnomalies: () => void;

  // Global Actions
  resetSimulation: () => void;
  exportSimulationLogs: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

const STORAGE_KEY = 'PSG_DW_SIMULATION_STATE_V1';

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Data States
  const [students, setStudents] = useState<StudentRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_students`);
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [departments, setDepartments] = useState<DepartmentRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_departments`);
    return saved ? JSON.parse(saved) : INITIAL_DEPARTMENTS;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_attendance`);
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [exams, setExams] = useState<ExamRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_exams`);
    return saved ? JSON.parse(saved) : INITIAL_EXAMS;
  });

  const [placements, setPlacements] = useState<PlacementRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_placements`);
    return saved ? JSON.parse(saved) : INITIAL_PLACEMENTS;
  });

  const [faculty, setFaculty] = useState<FacultyRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_faculty`);
    return saved ? JSON.parse(saved) : INITIAL_FACULTY;
  });

  // 2. System Status
  const [systemHealth, setSystemHealth] = useState<SystemHealthStatus>('NORMAL');
  const [crashedReason, setCrashedReason] = useState<string>('');

  const [serverConfig, setServerConfig] = useState<ServerConfig>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_config`);
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  const [events, setEvents] = useState<SystemEvent[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_events`);
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'EVT-INIT-01',
            timestamp: new Date().toLocaleTimeString(),
            sourceManager: 'System Configuration Manager',
            category: 'info',
            message: 'PSG iTech Data Warehouse cluster initialized successfully.',
            details: '16 CPU Cores, 48 GB RAM Allocated, 1536 GB Storage Volume Mounted.',
            recommendedAction: 'Verify operational scheduled jobs.',
            acknowledged: true,
          },
        ];
  });

  const [scheduledJobs, setScheduledJobs] = useState<ScheduledJob[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_jobs`);
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULED_JOBS;
  });

  const [users, setUsers] = useState<SimulatedUser[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_users`);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<SimulatedUser>(() => users[0]);

  const [backups, setBackups] = useState<BackupSnapshot[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_backups`);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'BAK-INIT-001',
        timestamp: '2024-10-30 01:00:00',
        description: 'Baseline Golden Snapshot before Fall Semester ETL',
        recordCount: 60 + 5 + 60 + 60 + 18 + 5,
        sizeMb: 142.5,
        stateDump: {
          students: INITIAL_STUDENTS,
          departments: INITIAL_DEPARTMENTS,
          attendance: INITIAL_ATTENDANCE,
          exams: INITIAL_EXAMS,
          placements: INITIAL_PLACEMENTS,
          faculty: INITIAL_FACULTY,
          serverConfig: INITIAL_CONFIG,
        },
      },
    ];
  });

  const [indexes, setIndexes] = useState<SimulatedIndex[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_indexes`);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'IDX-01',
        name: 'idx_student_dept',
        tableName: 'Dim_Student',
        columnName: 'department_id',
        type: 'Bitmap',
        sizeKb: 256,
        createdOn: '2024-10-01',
        speedupFactor: 3.8,
      },
      {
        id: 'IDX-02',
        name: 'idx_exam_student_id',
        tableName: 'Fact_Examination',
        columnName: 'student_id',
        type: 'B-Tree',
        sizeKb: 512,
        createdOn: '2024-10-05',
        speedupFactor: 4.5,
      },
    ];
  });

  const [partitions, setPartitions] = useState<WarehousePartition[]>([
    { name: 'Fact_Attendance_2021_22', year: '2021-2022', rowCount: 1420, sizeMb: 24.5, active: true },
    { name: 'Fact_Attendance_2022_23', year: '2022-2023', rowCount: 1560, sizeMb: 28.2, active: true },
    { name: 'Fact_Attendance_2023_24', year: '2023-2024', rowCount: 1680, sizeMb: 31.0, active: true },
    { name: 'Fact_Attendance_2024_25', year: '2024-2025', rowCount: 60, sizeMb: 4.8, active: true },
  ]);

  const [aggregations, setAggregations] = useState<Array<{ name: string; description: string; rowCount: number; sql: string; created: string }>>([
    {
      name: 'Agg_Dept_Placement_Summary',
      description: 'Pre-computed departmental placement count, mean package LPA, and highest package',
      rowCount: 5,
      sql: 'SELECT department_id, COUNT(*) as placed_count, AVG(package_lpa) as avg_package, MAX(package_lpa) as max_package FROM Fact_Placement GROUP BY department_id',
      created: '2024-10-15',
    },
    {
      name: 'Agg_Dept_Attendance_Monthly',
      description: 'Departmental average attendance percentage consolidated for NAAC reporting',
      rowCount: 5,
      sql: 'SELECT department_id, AVG(percentage) as avg_attendance FROM Fact_Attendance GROUP BY department_id',
      created: '2024-10-20',
    },
  ]);

  const [etlHistory, setEtlHistory] = useState<ETLBatch[]>([]);
  const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>([]);
  const [testResults, setTestResults] = useState<DataQualityTest[]>([]);
  const [customTables, setCustomTables] = useState<DatabaseTableMeta[]>([]);

  // Initialize AlaSQL engine on load and whenever state changes
  useEffect(() => {
    sqlEngine.init(students, departments, attendance, exams, placements, faculty, indexes);
  }, [students, departments, attendance, exams, placements, faculty, indexes]);

  // Recalculate Storage whenever records change
  useEffect(() => {
    const totalRows = students.length + departments.length + attendance.length + exams.length + placements.length + faculty.length;
    // Calculate simulated storage based on row count + index sizes
    const baseMb = 500 + totalRows * 2.5 + indexes.reduce((acc, i) => acc + i.sizeKb / 1024, 0);
    const usedGb = Math.round((baseMb / 1024) * 100) / 100;

    setServerConfig((prev) => {
      const updated = { ...prev, storageUsedGb: usedGb };
      // Check storage warning threshold (e.g. > 90% allocation)
      if (usedGb >= prev.storageAllocatedGb * 0.95 && systemHealth === 'NORMAL') {
        logEvent(
          'System Configuration Manager',
          'warning',
          `Critical Storage Alert: Disk usage (${usedGb} GB) exceeded 95% of allocated capacity (${prev.storageAllocatedGb} GB)!`,
          'Write transactions and ETL jobs risk failure due to disk exhaustion.',
          'Increase Storage Allocation in System Configuration Manager or purge historical partitions.'
        );
      }
      return updated;
    });
  }, [students.length, attendance.length, exams.length, placements.length, indexes.length]);

  // Sync to local storage for persistence
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_students`, JSON.stringify(students));
    localStorage.setItem(`${STORAGE_KEY}_departments`, JSON.stringify(departments));
    localStorage.setItem(`${STORAGE_KEY}_attendance`, JSON.stringify(attendance));
    localStorage.setItem(`${STORAGE_KEY}_exams`, JSON.stringify(exams));
    localStorage.setItem(`${STORAGE_KEY}_placements`, JSON.stringify(placements));
    localStorage.setItem(`${STORAGE_KEY}_faculty`, JSON.stringify(faculty));
    localStorage.setItem(`${STORAGE_KEY}_config`, JSON.stringify(serverConfig));
    localStorage.setItem(`${STORAGE_KEY}_events`, JSON.stringify(events));
    localStorage.setItem(`${STORAGE_KEY}_jobs`, JSON.stringify(scheduledJobs));
    localStorage.setItem(`${STORAGE_KEY}_users`, JSON.stringify(users));
    localStorage.setItem(`${STORAGE_KEY}_backups`, JSON.stringify(backups));
    localStorage.setItem(`${STORAGE_KEY}_indexes`, JSON.stringify(indexes));
  }, [students, departments, attendance, exams, placements, faculty, serverConfig, events, scheduledJobs, users, backups, indexes]);

  // Log Event helper
  const logEvent = (
    sourceManager: string,
    category: SystemEvent['category'],
    message: string,
    details?: string,
    recommendedAction?: string
  ) => {
    const newEvent: SystemEvent = {
      id: `EVT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString(),
      sourceManager,
      category,
      message,
      details,
      recommendedAction,
      acknowledged: false,
    };
    setEvents((prev) => [newEvent, ...prev.slice(0, 99)]);
  };

  const acknowledgeEvent = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, acknowledged: true } : e))
    );
  };

  const clearEvents = () => {
    setEvents([]);
  };

  // Configuration Manager actions
  const updateServerConfig = (updates: Partial<ServerConfig>) => {
    setServerConfig((prev) => {
      const next = { ...prev, ...updates };
      logEvent(
        'System Configuration Manager',
        'info',
        `Server configuration updated: RAM Allocated ${next.ramAllocatedGb} GB, Storage Allocated ${next.storageAllocatedGb} GB.`,
        `Buffer Pool: ${next.ramBufferPoolMb} MB, CPU Threads: ${next.cpuCores}, WAL: ${next.walMode}.`
      );
      if (next.storageAllocatedGb < next.storageUsedGb) {
        logEvent(
          'System Configuration Manager',
          'critical',
          `Storage Allocation (${next.storageAllocatedGb} GB) is LOWER than current disk utilization (${next.storageUsedGb} GB)!`,
          'System enters degraded write-lock mode.',
          'Expand storage allocation immediately.'
        );
        setSystemHealth('STORAGE_FULL');
      } else if (systemHealth === 'STORAGE_FULL' && next.storageAllocatedGb >= next.storageUsedGb) {
        setSystemHealth('NORMAL');
        logEvent(
          'System Configuration Manager',
          'info',
          'Storage allocation expanded successfully. System health restored to NORMAL.'
        );
      }
      return next;
    });
  };

  // Scheduling Manager actions
  const createJob = (jobData: Omit<ScheduledJob, 'id' | 'status' | 'executionCount' | 'logs'>) => {
    const newJob: ScheduledJob = {
      ...jobData,
      id: `JOB-${Date.now().toString().slice(-4)}`,
      status: 'IDLE',
      executionCount: 0,
      logs: [`[${new Date().toLocaleTimeString()}] Scheduled job registered in catalog.`],
    };
    setScheduledJobs((prev) => [newJob, ...prev]);
    logEvent(
      'System Scheduling Manager',
      'info',
      `New job created: "${newJob.name}" (${newJob.frequency} at ${newJob.time}).`
    );
  };

  const toggleJob = (id: string) => {
    setScheduledJobs((prev) =>
      prev.map((job) => {
        if (job.id === id) {
          const nextState = !job.enabled;
          logEvent(
            'System Scheduling Manager',
            nextState ? 'info' : 'warning',
            `Job "${job.name}" has been ${nextState ? 'ENABLED' : 'DISABLED'}.`
          );
          return { ...job, enabled: nextState };
        }
        return job;
      })
    );
  };

  const runJobManually = async (id: string): Promise<boolean> => {
    const job = scheduledJobs.find((j) => j.id === id);
    if (!job) return false;

    if (systemHealth === 'CRITICAL_CRASHED') {
      logEvent(
        'System Scheduling Manager',
        'error',
        `Job Execution Aborted: Cannot run "${job.name}". System is currently CRASHED!`,
        'Database engine is offline.',
        'Use System Backup Recovery Manager to restore system to operational state.'
      );
      return false;
    }

    // Set job to running
    setScheduledJobs((prev) =>
      prev.map((j) =>
        j.id === id
          ? {
              ...j,
              status: 'RUNNING',
              logs: [`[${new Date().toLocaleTimeString()}] Manual trigger received. Initiating execution...`, ...j.logs],
            }
          : j
      )
    );

    // Simulate work based on job type
    let logMsg = '';
    if (job.type === 'attendance_loading') {
      runETL('attendance_batch_valid');
      logMsg = 'Successfully executed daily biometric attendance batch load via Load Manager.';
    } else if (job.type === 'backup') {
      createBackup(`Automated backup triggered by job ${job.id}`);
      logMsg = 'Snapshot backup generated successfully via Backup Recovery Manager.';
    } else if (job.type === 'placement_loading') {
      runETL('placement_batch_new');
      logMsg = 'New campus placement offers synced into Fact_Placement.';
    } else {
      logMsg = `Executed ${job.name} maintenance routine. All records verified.`;
    }

    // Update job to completed
    setScheduledJobs((prev) =>
      prev.map((j) =>
        j.id === id
          ? {
              ...j,
              status: 'COMPLETED',
              lastRun: `Just now (${new Date().toLocaleTimeString()})`,
              executionCount: j.executionCount + 1,
              logs: [`[${new Date().toLocaleTimeString()}] ${logMsg}`, ...j.logs.slice(0, 10)],
            }
          : j
      )
    );

    logEvent('System Scheduling Manager', 'info', `Job "${job.name}" completed successfully.`, logMsg);
    return true;
  };

  const deleteJob = (id: string) => {
    setScheduledJobs((prev) => prev.filter((j) => j.id !== id));
    logEvent('System Scheduling Manager', 'warning', `Job ID ${id} deleted from scheduler.`);
  };

  // Database Manager actions
  const switchUser = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      setCurrentUser(target);
      logEvent(
        'System Database Manager',
        'info',
        `Active session switched to user "${target.username}" (Role: ${target.role}).`
      );
    }
  };

  const updateUserPermissions = (userId: string, perms: SimulatedUser['permissions']) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, permissions: perms } : u))
    );
    if (currentUser.id === userId) {
      setCurrentUser((prev) => ({ ...prev, permissions: perms }));
    }
    logEvent(
      'System Database Manager',
      'warning',
      `Permissions updated for user ID "${userId}".`,
      `SELECT: ${perms.select}, INSERT: ${perms.insert}, UPDATE: ${perms.update}, DELETE: ${perms.delete}`
    );
  };

  const createCustomTable = (tableMeta: DatabaseTableMeta) => {
    setCustomTables((prev) => [...prev, tableMeta]);
    logEvent(
      'System Database Manager',
      'info',
      `Custom table created: "${tableMeta.name}" with ${tableMeta.columns.length} columns.`,
      `Table registered in system catalog.`
    );
  };

  // Backup & Recovery Manager actions
  const createBackup = (description?: string): BackupSnapshot => {
    const totalCount = students.length + departments.length + attendance.length + exams.length + placements.length + faculty.length;
    const newSnapshot: BackupSnapshot = {
      id: `BAK-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleString(),
      description: description || `Manual snapshot (${totalCount} records across 6 warehouse tables)`,
      recordCount: totalCount,
      sizeMb: Math.round((130 + totalCount * 0.25) * 10) / 10,
      stateDump: {
        students: JSON.parse(JSON.stringify(students)),
        departments: JSON.parse(JSON.stringify(departments)),
        attendance: JSON.parse(JSON.stringify(attendance)),
        exams: JSON.parse(JSON.stringify(exams)),
        placements: JSON.parse(JSON.stringify(placements)),
        faculty: JSON.parse(JSON.stringify(faculty)),
        serverConfig: JSON.parse(JSON.stringify(serverConfig)),
      },
    };

    setBackups((prev) => [newSnapshot, ...prev]);
    logEvent(
      'System Backup Recovery Manager',
      'info',
      `Backup created: ${newSnapshot.id} (${newSnapshot.sizeMb} MB, ${newSnapshot.recordCount} records).`,
      'Snapshot saved to persistent recovery storage catalog.'
    );
    return newSnapshot;
  };

  const simulateCrash = (reason?: string) => {
    const crashText = reason || 'Sudden power outage on primary SAN storage cluster. Data corruption detected in write buffer!';
    setSystemHealth('CRITICAL_CRASHED');
    setCrashedReason(crashText);
    logEvent(
      'System Backup Recovery Manager',
      'critical',
      `SYSTEM CRITICAL FAILURE: ${crashText}`,
      'Warehouse services offline. SQL query execution and ETL pipelines are suspended.',
      'Navigate to System Backup Recovery Manager and perform a point-in-time restoration.'
    );
  };

  const restoreBackup = (backupId: string): boolean => {
    const target = backups.find((b) => b.id === backupId);
    if (!target) {
      logEvent('System Backup Recovery Manager', 'error', `Restoration failed: Snapshot ${backupId} not found.`);
      return false;
    }

    setStudents(target.stateDump.students);
    setDepartments(target.stateDump.departments);
    setAttendance(target.stateDump.attendance);
    setExams(target.stateDump.exams);
    setPlacements(target.stateDump.placements);
    setFaculty(target.stateDump.faculty);
    setServerConfig(target.stateDump.serverConfig);
    setSystemHealth('NORMAL');
    setCrashedReason('');

    logEvent(
      'System Backup Recovery Manager',
      'info',
      `Disaster Recovery Successful: System restored from snapshot "${target.id}" (${target.timestamp}).`,
      `Restored ${target.recordCount} records across all warehouse entities. Warehouse operational status: NORMAL.`
    );
    return true;
  };

  const recoverSystem = () => {
    setSystemHealth('NORMAL');
    setCrashedReason('');
    logEvent(
      'System Backup Recovery Manager',
      'info',
      'System emergency reboot complete. In-memory state verified. Warehouse operational status: NORMAL.'
    );
  };

  // Load Manager (ETL) actions
  const runETL = (
    sourceType: 'attendance_batch_valid' | 'attendance_batch_dirty' | 'placement_batch_new' | 'student_batch_dirty' | 'custom',
    customRawData?: string,
    rules = { deduplication: true, normalization: true, nullHandling: true, typeValidation: true }
  ) => {
    if (systemHealth === 'CRITICAL_CRASHED') {
      logEvent('Load Manager', 'error', 'ETL Aborted: Warehouse is in CRASHED state.');
      return { processed: 0, loaded: 0, rejected: 0, errors: ['System is currently offline'] };
    }

    let recordsToProcess: any[] = [];
    let targetTable = 'Fact_Attendance';

    if (sourceType === 'attendance_batch_valid') {
      targetTable = 'Fact_Attendance';
      recordsToProcess = [
        { student_id: 'PSG21CS001', date: '2024-11-01', hours_attended: 7, total_hours: 7 },
        { student_id: 'PSG21CS002', date: '2024-11-01', hours_attended: 7, total_hours: 7 },
        { student_id: 'PSG21CS003', date: '2024-11-01', hours_attended: 6, total_hours: 7 },
        { student_id: 'PSG21CS004', date: '2024-11-01', hours_attended: 7, total_hours: 7 },
        { student_id: 'PSG21EC001', date: '2024-11-01', hours_attended: 5, total_hours: 7 },
        { student_id: 'PSG21IT001', date: '2024-11-01', hours_attended: 7, total_hours: 7 },
        { student_id: 'PSG21ME001', date: '2024-11-01', hours_attended: 7, total_hours: 7 },
      ];
    } else if (sourceType === 'attendance_batch_dirty') {
      targetTable = 'Fact_Attendance';
      recordsToProcess = [
        { student_id: 'PSG21CS001', date: '2024-11-01', hours_attended: 7, total_hours: 7 },
        { student_id: 'PSG21CS001', date: '2024-11-01', hours_attended: 7, total_hours: 7 }, // Duplicate!
        { student_id: 'INVALID_ID_999', date: '2024-11-01', hours_attended: 6, total_hours: 7 }, // Invalid Foreign Key!
        { student_id: 'PSG21CS006', date: '2024-11-01', hours_attended: null, total_hours: 7 }, // Null value!
        { student_id: 'PSG21EC005', date: '2024-11-01', hours_attended: 9, total_hours: 7 }, // Range error: 9 > 7!
        { student_id: 'PSG21IT011', date: '2024-11-01', hours_attended: 0, total_hours: 7 },
        { student_id: 'PSG21ME004', date: '2024-11-01', hours_attended: 5, total_hours: 7 },
      ];
    } else if (sourceType === 'placement_batch_new') {
      targetTable = 'Fact_Placement';
      recordsToProcess = [
        { student_id: 'PSG21CS004', company_name: 'Infosys', package_lpa: 4.5, offer_type: 'Regular' },
        { student_id: 'PSG21CS010', company_name: 'Wipro Digital', package_lpa: 6.5, offer_type: 'Tier-1' },
        { student_id: 'PSG21EC003', company_name: 'TCS Ninja', package_lpa: 3.8, offer_type: 'Regular' },
        { student_id: 'PSG21IT007', company_name: 'Cognizant GenC Next', package_lpa: 6.8, offer_type: 'Tier-1' },
        { student_id: 'PSG21ME002', company_name: 'Tata Motors', package_lpa: 7.5, offer_type: 'Tier-1' },
      ];
    } else if (sourceType === 'student_batch_dirty') {
      targetTable = 'Dim_Student';
      recordsToProcess = [
        { student_id: 'PSG21CS099', name: 'Vigneshwaran K', gender: 'M', department_id: 'cse', cgpa: 8.20, attendance_pct: 85.0 },
        { student_id: 'PSG21CS099', name: 'Vigneshwaran K', gender: 'M', department_id: 'cse', cgpa: 8.20, attendance_pct: 85.0 }, // Duplicate
        { student_id: 'PSG21EC098', name: 'Sandhiya Devi', gender: 'F', department_id: 'ELECTRONICS', cgpa: 9.10, attendance_pct: 92.0 }, // Inconsistent dept
        { student_id: 'PSG21EE097', name: 'Karthik Raja', gender: 'M', department_id: 'EEE', cgpa: 14.50, attendance_pct: 75.0 }, // Invalid CGPA > 10!
        { student_id: 'PSG21IT096', name: 'Unknown Candidate', gender: 'M', department_id: null, cgpa: 7.40, attendance_pct: 68.0 }, // Null dept
        { student_id: 'PSG21ME095', name: 'Prabakaran S', gender: 'M', department_id: 'MECH', cgpa: 8.00, attendance_pct: 120.0 } // Invalid attendance > 100!
      ];
    }

    const etlRecords: ETLRecord[] = [];
    const loadedData: any[] = [];
    const errorList: string[] = [];
    const seenIds = new Set<string>();

    for (let i = 0; i < recordsToProcess.length; i++) {
      const raw = recordsToProcess[i];
      const errors: string[] = [];
      const transformed = { ...raw };

      // 1. Deduplication Rule
      if (rules.deduplication) {
        const idKey = raw.student_id ? `${raw.student_id}_${raw.date || raw.company_name || i}` : `row_${i}`;
        if (seenIds.has(idKey)) {
          errors.push(`Duplicate key detected: "${raw.student_id}". Skipped redundant record.`);
        } else {
          seenIds.add(idKey);
        }
      }

      // 2. Foreign Key & Student Existence Validation
      if (rules.typeValidation && raw.student_id) {
        const studentExists = students.some((s) => s.student_id === raw.student_id);
        if (!studentExists && targetTable !== 'Dim_Student') {
          errors.push(`Referential Integrity Violation: student_id "${raw.student_id}" does not exist in Dim_Student.`);
        }
      }

      // 3. Null Handling & Range Checks
      if (rules.nullHandling) {
        if (raw.hours_attended === null || raw.hours_attended === undefined) {
          errors.push(`Missing / Null value in hours_attended.`);
        }
        if (raw.department_id === null || raw.department_id === '') {
          errors.push(`Missing department_id.`);
        }
      }

      if (rules.typeValidation) {
        if (raw.hours_attended !== null && raw.total_hours !== undefined && raw.hours_attended > raw.total_hours) {
          errors.push(`Range Error: hours_attended (${raw.hours_attended}) cannot exceed total_hours (${raw.total_hours}).`);
        }
        if (raw.cgpa !== undefined && (raw.cgpa < 0 || raw.cgpa > 10)) {
          errors.push(`Range Error: CGPA (${raw.cgpa}) must be between 0.00 and 10.00.`);
        }
        if (raw.attendance_pct !== undefined && (raw.attendance_pct < 0 || raw.attendance_pct > 100)) {
          errors.push(`Range Error: Attendance % (${raw.attendance_pct}) must be between 0 and 100.`);
        }
      }

      // 4. Normalization Rule
      if (rules.normalization && transformed.department_id) {
        const lowerDept = String(transformed.department_id).toLowerCase();
        if (lowerDept === 'cse' || lowerDept === 'computer science') transformed.department_id = 'CSE';
        else if (lowerDept === 'electronics' || lowerDept === 'ece') transformed.department_id = 'ECE';
        else if (lowerDept === 'eee' || lowerDept === 'electrical') transformed.department_id = 'EEE';
        else if (lowerDept === 'it' || lowerDept === 'information tech') transformed.department_id = 'IT';
        else if (lowerDept === 'mech' || lowerDept === 'mechanical') transformed.department_id = 'MECH';
      }

      if (errors.length > 0) {
        etlRecords.push({
          id: `REC-${i + 1}`,
          raw,
          errors,
          status: 'REJECTED',
        });
        errorList.push(`Row ${i + 1} (${raw.student_id || 'Unknown'}): ${errors.join(', ')}`);
      } else {
        etlRecords.push({
          id: `REC-${i + 1}`,
          raw,
          transformed,
          errors: [],
          status: 'LOADED',
        });
        loadedData.push(transformed);
      }
    }

    // Insert loaded data into state
    if (loadedData.length > 0) {
      if (targetTable === 'Fact_Attendance') {
        const newAttRows: AttendanceRecord[] = loadedData.map((d, idx) => {
          const studentObj = students.find((s) => s.student_id === d.student_id);
          const pct = Math.round((d.hours_attended / d.total_hours) * 100);
          return {
            attendance_id: `ATT_ETL_${Date.now()}_${idx}`,
            student_id: d.student_id,
            student_name: studentObj ? studentObj.name : 'Unknown Student',
            department_id: studentObj ? studentObj.department_id : 'CSE',
            date: d.date || '2024-11-01',
            academic_year: '2024-2025',
            semester: 7,
            hours_attended: d.hours_attended,
            total_hours: d.total_hours,
            percentage: pct,
            status: pct >= 75 ? 'Present' : 'Absent',
          };
        });
        setAttendance((prev) => [...prev, ...newAttRows]);
      } else if (targetTable === 'Fact_Placement') {
        const newPlcRows: PlacementRecord[] = loadedData.map((d, idx) => {
          const studentObj = students.find((s) => s.student_id === d.student_id);
          return {
            placement_id: `PLC_ETL_${Date.now()}_${idx}`,
            student_id: d.student_id,
            student_name: studentObj ? studentObj.name : 'Unknown Student',
            department_id: studentObj ? studentObj.department_id : 'CSE',
            academic_year: '2024-2025',
            company_name: d.company_name,
            role: 'Associate Trainee',
            package_lpa: d.package_lpa,
            offer_type: d.offer_type,
            interview_rounds: 3,
            status: 'Selected',
          };
        });
        setPlacements((prev) => [...prev, ...newPlcRows]);
      } else if (targetTable === 'Dim_Student') {
        const newStuRows: StudentRecord[] = loadedData.map((d) => ({
          student_id: d.student_id,
          name: d.name,
          gender: d.gender,
          department_id: d.department_id,
          department_name: d.department_id === 'CSE' ? 'Computer Science and Engineering' : 'Engineering Department',
          batch: '2021-2025',
          cgpa: d.cgpa,
          attendance_pct: d.attendance_pct,
          email: `${d.student_id.toLowerCase()}@psgitech.ac.in`,
          phone: '9840199999',
          placement_status: 'In Process',
        }));
        setStudents((prev) => [...prev, ...newStuRows]);
      }
    }

    const batchSummary: ETLBatch = {
      id: `BATCH-${Date.now().toString().slice(-4)}`,
      sourceDataset: sourceType,
      targetTable,
      timestamp: new Date().toLocaleTimeString(),
      totalExtracted: recordsToProcess.length,
      transformedCount: loadedData.length,
      loadedCount: loadedData.length,
      rejectedCount: errorList.length,
      records: etlRecords,
      rulesApplied: rules,
    };

    setEtlHistory((prev) => [batchSummary, ...prev]);

    if (errorList.length > 0) {
      logEvent(
        'Load Manager',
        'warning',
        `ETL Batch completed with issues: ${loadedData.length} records loaded into ${targetTable}, ${errorList.length} rejected.`,
        errorList.slice(0, 3).join(' | '),
        'Review rejected quarantine table in Load Manager.'
      );
    } else {
      logEvent(
        'Load Manager',
        'info',
        `ETL Pipeline Success: ${loadedData.length} clean records transformed and loaded into ${targetTable}.`,
        `0 validation errors encountered.`
      );
    }

    return {
      processed: recordsToProcess.length,
      loaded: loadedData.length,
      rejected: errorList.length,
      errors: errorList,
    };
  };

  // Warehouse Manager actions
  const togglePartition = (name: string) => {
    setPartitions((prev) =>
      prev.map((p) => {
        if (p.name === name) {
          const nextActive = !p.active;
          logEvent(
            'Warehouse Manager',
            'info',
            `Partition "${name}" (Academic Year: ${p.year}) is now ${nextActive ? 'ONLINE / MOUNTED' : 'OFFLINE / DETACHED'}.`,
            nextActive ? 'Partition available for OLAP scan pruning.' : 'Partition excluded from query optimizer scans.'
          );
          return { ...p, active: nextActive };
        }
        return p;
      })
    );
  };

  const createAggregation = (name: string, description: string, sql: string) => {
    const res = sqlEngine.execute(sql, indexes);
    const newAgg = {
      name,
      description,
      rowCount: res.rowCount,
      sql,
      created: new Date().toLocaleDateString(),
    };
    setAggregations((prev) => [newAgg, ...prev]);
    logEvent(
      'Warehouse Manager',
      'info',
      `Materialized Summary Aggregation created: "${name}".`,
      `Computed ${res.rowCount} pre-aggregated rows. Speeds up executive dashboards by 8x.`
    );
  };

  // Query Manager actions
  const executeQuery = (sql: string): QueryExecutionResult => {
    if (systemHealth === 'CRITICAL_CRASHED') {
      const errRes: QueryExecutionResult = {
        sql,
        success: false,
        rows: [],
        columns: [],
        rowCount: 0,
        executionTimeMs: 0,
        plan: ['CRITICAL: Database server is offline due to system crash'],
        error: 'Query execution aborted: Simulated database is offline. Restore from backup first.',
      };
      logEvent('Query Manager', 'error', 'SQL Query rejected: Server is currently CRASHED.');
      return errRes;
    }

    // Role-based permission check
    const lower = sql.trim().toLowerCase();
    const isSelect = lower.startsWith('select');
    const isInsert = lower.startsWith('insert');
    const isUpdate = lower.startsWith('update');
    const isDelete = lower.startsWith('delete') || lower.startsWith('drop');

    if (isSelect && !currentUser.permissions.select) {
      const denied: QueryExecutionResult = {
        sql,
        success: false,
        rows: [],
        columns: [],
        rowCount: 0,
        executionTimeMs: 1.2,
        plan: [`Security Exception: User "${currentUser.username}" lacks SELECT permission.`],
        error: `Permission Denied: User role [${currentUser.role}] does not have SELECT permission on warehouse catalog.`,
      };
      logEvent(
        'Query Manager',
        'warning',
        `Security violation: User "${currentUser.username}" attempted unauthorized SELECT.`,
        'Access denied by Database Manager RBAC rules.'
      );
      return denied;
    }

    if (isInsert && !currentUser.permissions.insert) {
      const denied: QueryExecutionResult = {
        sql,
        success: false,
        rows: [],
        columns: [],
        rowCount: 0,
        executionTimeMs: 1.0,
        plan: [`Security Exception: User "${currentUser.username}" lacks INSERT permission.`],
        error: `Permission Denied: User role [${currentUser.role}] does not have INSERT privileges.`,
      };
      logEvent('Query Manager', 'warning', `Security violation: User "${currentUser.username}" attempted unauthorized INSERT.`);
      return denied;
    }

    const res = sqlEngine.execute(sql, indexes);

    // Save to Query History
    const historyItem: QueryHistoryItem = {
      id: `QRY-${Date.now()}`,
      sql,
      timestamp: new Date().toLocaleTimeString(),
      executionTimeMs: res.executionTimeMs,
      rowCount: res.rowCount,
      status: res.success ? 'SUCCESS' : 'ERROR',
      error: res.error,
      usedIndex: res.indexUsed,
    };
    setQueryHistory((prev) => [historyItem, ...prev.slice(0, 49)]);

    if (res.success) {
      logEvent(
        'Query Manager',
        'info',
        `Query executed: ${res.rowCount} rows retrieved in ${res.executionTimeMs} ms.`,
        res.indexUsed ? `Accelerated by index [${res.indexUsed}]` : `Plan: Full Table Scan`
      );
    } else {
      logEvent('Query Manager', 'error', `Query execution failed: ${res.error}`);
    }

    return res;
  };

  // Tuning Manager actions
  const createIndex = (tableName: string, columnName: string, type: 'B-Tree' | 'Bitmap') => {
    const existing = indexes.find((i) => i.tableName === tableName && i.columnName === columnName);
    if (existing) {
      logEvent('Tuning Manager', 'warning', `Index on ${tableName}.${columnName} already exists as "${existing.name}".`);
      return;
    }

    const speedup = type === 'Bitmap' ? 3.9 : 4.8;
    const newIdx: SimulatedIndex = {
      id: `IDX-${Date.now().toString().slice(-4)}`,
      name: `idx_${tableName.toLowerCase().slice(0, 6)}_${columnName}`,
      tableName,
      columnName,
      type,
      sizeKb: Math.floor(Math.random() * 400 + 200),
      createdOn: new Date().toISOString().split('T')[0],
      speedupFactor: speedup,
    };

    const nextIndexes = [...indexes, newIdx];
    setIndexes(nextIndexes);
    sqlEngine.init(students, departments, attendance, exams, placements, faculty, nextIndexes);

    logEvent(
      'Tuning Manager',
      'info',
      `Index created: "${newIdx.name}" on ${tableName}.${columnName} (${type}).`,
      `Estimated query speedup: ~${speedup}x faster. Converted Full Table Scans to Index Scans.`
    );
  };

  const removeIndex = (id: string) => {
    const target = indexes.find((i) => i.id === id);
    const nextIndexes = indexes.filter((i) => i.id !== id);
    setIndexes(nextIndexes);
    sqlEngine.init(students, departments, attendance, exams, placements, faculty, nextIndexes);

    logEvent(
      'Tuning Manager',
      'warning',
      `Index "${target ? target.name : id}" dropped.`,
      'Queries referencing this column will now fall back to Full Table Scans.'
    );
  };

  // Testing Manager actions
  const runDataQualityTests = (): DataQualityTest[] => {
    const tests: DataQualityTest[] = [];

    // 1. Source vs Target Record Count
    // Expected 60 students in PSG sample
    const expectedStudents = 60;
    const actualStudents = students.length;
    tests.push({
      id: 'TEST-01',
      name: 'Source-to-Target Student Record Reconciliation',
      category: 'Completeness',
      description: 'Verifies whether all students from the source ERP are accounted for in Dim_Student.',
      status: actualStudents >= expectedStudents ? 'PASS' : 'FAIL',
      failingCount: Math.max(0, expectedStudents - actualStudents),
      failingRecords: actualStudents < expectedStudents ? [{ missing_count: expectedStudents - actualStudents }] : [],
      expected: `${expectedStudents} rows`,
      actual: `${actualStudents} rows`,
    });

    // 2. Duplicate Primary Keys in Dim_Student
    const idMap: Record<string, number> = {};
    students.forEach((s) => {
      idMap[s.student_id] = (idMap[s.student_id] || 0) + 1;
    });
    const dupes = Object.entries(idMap).filter(([_, count]) => count > 1);
    tests.push({
      id: 'TEST-02',
      name: 'Primary Key Uniqueness Test (student_id)',
      category: 'Uniqueness',
      description: 'Ensures Dim_Student contains zero duplicate primary keys.',
      status: dupes.length === 0 ? 'PASS' : 'FAIL',
      failingCount: dupes.length,
      failingRecords: dupes.map(([id, count]) => ({ student_id: id, occurrences: count })),
      expected: '0 duplicates',
      actual: `${dupes.length} duplicates detected`,
    });

    // 3. Null Check on Mandatory Columns
    const nullRecords = students.filter(
      (s) => !s.name || !s.department_id || s.cgpa === null || s.cgpa === undefined
    );
    tests.push({
      id: 'TEST-03',
      name: 'Mandatory Attribute Null Value Audit',
      category: 'Consistency',
      description: 'Checks for NULL or empty strings in name, department_id, or cgpa.',
      status: nullRecords.length === 0 ? 'PASS' : 'FAIL',
      failingCount: nullRecords.length,
      failingRecords: nullRecords,
      expected: '0 NULL records',
      actual: `${nullRecords.length} records with NULLs`,
    });

    // 4. Referential Integrity Test (Fact_Attendance -> Dim_Student)
    const validStudentIds = new Set(students.map((s) => s.student_id));
    const orphanedAtt = attendance.filter((a) => !validStudentIds.has(a.student_id));
    tests.push({
      id: 'TEST-04',
      name: 'Referential Integrity: Fact_Attendance Foreign Key Check',
      category: 'Referential Integrity',
      description: 'Ensures every attendance fact points to a valid student in Dim_Student.',
      status: orphanedAtt.length === 0 ? 'PASS' : 'FAIL',
      failingCount: orphanedAtt.length,
      failingRecords: orphanedAtt,
      expected: '0 orphaned rows',
      actual: `${orphanedAtt.length} orphaned rows`,
    });

    // 5. Value Range Validation (CGPA between 0 and 10)
    const invalidCgpa = students.filter((s) => s.cgpa < 0 || s.cgpa > 10);
    tests.push({
      id: 'TEST-05',
      name: 'Range Validation: CGPA Domain Constraint (0.00 - 10.00)',
      category: 'Range Validation',
      description: 'Verifies CGPA values fall within Anna University grading scale.',
      status: invalidCgpa.length === 0 ? 'PASS' : 'FAIL',
      failingCount: invalidCgpa.length,
      failingRecords: invalidCgpa,
      expected: 'All CGPAs in range [0.0, 10.0]',
      actual: `${invalidCgpa.length} out-of-range values`,
    });

    setTestResults(tests);

    const failCount = tests.filter((t) => t.status === 'FAIL').length;
    if (failCount > 0) {
      logEvent(
        'Testing Manager',
        'warning',
        `Data Quality Test Suite executed: ${failCount} of ${tests.length} tests FAILED.`,
        'Discrepancies identified in warehouse tables.',
        'Review failed test details in Testing Manager and apply corrective ETL cleaning.'
      );
    } else {
      logEvent(
        'Testing Manager',
        'info',
        `Data Quality Test Suite executed: ALL ${tests.length} TESTS PASSED!`,
        '100% data completeness, integrity, and domain constraints verified.'
      );
    }

    return tests;
  };

  const fixDuplicateStudents = () => {
    // Deduplicate students by student_id
    const uniqueMap = new Map<string, StudentRecord>();
    students.forEach((s) => {
      if (!uniqueMap.has(s.student_id)) {
        uniqueMap.set(s.student_id, s);
      }
    });
    const cleaned = Array.from(uniqueMap.values());
    const removedCount = students.length - cleaned.length;
    setStudents(cleaned);

    logEvent(
      'Testing Manager',
      'info',
      `Duplicate remediation completed: Removed ${removedCount} duplicate student records.`,
      'Dim_Student primary key uniqueness restored.'
    );
    // Rerun tests
    setTimeout(() => runDataQualityTests(), 100);
  };

  const injectQualityAnomalies = () => {
    // Intentionally inject duplicates and missing records for educational demonstration
    const duplicateStudent: StudentRecord = { ...students[0] };
    const invalidStudent: StudentRecord = {
      student_id: 'PSG21CS999',
      name: 'Invalid Test Student',
      gender: 'M',
      department_id: 'CSE',
      department_name: 'Computer Science and Engineering',
      batch: '2021-2025',
      cgpa: 14.5, // Out of range!
      attendance_pct: 110, // Out of range!
      email: 'invalid@psgitech.ac.in',
      phone: '0000000000',
      placement_status: 'Not Placed',
    };

    setStudents((prev) => [duplicateStudent, invalidStudent, ...prev.slice(0, 52)]); // Also drop some to test count mismatch!
    logEvent(
      'Testing Manager',
      'warning',
      'Educational Anomaly Injection: Introduced 1 duplicate record, 1 invalid CGPA record, and dropped 8 records.',
      'Run the Testing Manager test suite to detect these deliberate discrepancies.'
    );
    setTimeout(() => runDataQualityTests(), 100);
  };

  // Reset Simulation
  const resetSimulation = () => {
    localStorage.clear();
    setStudents(INITIAL_STUDENTS);
    setDepartments(INITIAL_DEPARTMENTS);
    setAttendance(INITIAL_ATTENDANCE);
    setExams(INITIAL_EXAMS);
    setPlacements(INITIAL_PLACEMENTS);
    setFaculty(INITIAL_FACULTY);
    setServerConfig(INITIAL_CONFIG);
    setSystemHealth('NORMAL');
    setCrashedReason('');
    setScheduledJobs(INITIAL_SCHEDULED_JOBS);
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setEvents([
      {
        id: 'EVT-RESET-01',
        timestamp: new Date().toLocaleTimeString(),
        sourceManager: 'System Configuration Manager',
        category: 'info',
        message: 'Simulation reset: All 10 manager states restored to golden initial baseline.',
        acknowledged: true,
      },
    ]);
    setEtlHistory([]);
    setQueryHistory([]);
    setTestResults([]);
    sqlEngine.init(INITIAL_STUDENTS, INITIAL_DEPARTMENTS, INITIAL_ATTENDANCE, INITIAL_EXAMS, INITIAL_PLACEMENTS, INITIAL_FACULTY, []);
  };

  const exportSimulationLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `PSG_DW_EventLogs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <SimulationContext.Provider
      value={{
        students,
        departments,
        attendance,
        exams,
        placements,
        faculty,
        systemHealth,
        crashedReason,
        serverConfig,
        events,
        scheduledJobs,
        currentUser,
        users,
        backups,
        indexes,
        partitions,
        aggregations,
        etlHistory,
        queryHistory,
        testResults,
        customTables,
        updateServerConfig,
        logEvent,
        acknowledgeEvent,
        clearEvents,
        createJob,
        toggleJob,
        runJobManually,
        deleteJob,
        switchUser,
        updateUserPermissions,
        createCustomTable,
        createBackup,
        simulateCrash,
        restoreBackup,
        recoverSystem,
        runETL,
        togglePartition,
        createAggregation,
        executeQuery,
        createIndex,
        removeIndex,
        runDataQualityTests,
        fixDuplicateStudents,
        injectQualityAnomalies,
        resetSimulation,
        exportSimulationLogs,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
