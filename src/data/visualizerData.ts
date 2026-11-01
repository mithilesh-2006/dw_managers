import {
  Cpu,
  CalendarClock,
  BellRing,
  Database,
  LifeBuoy,
  HardDriveDownload,
  Boxes,
  Terminal,
  Zap,
  CheckCheck,
} from 'lucide-react';

export interface ManagerScenario {
  id: string;
  number: number;
  name: string;
  category: 'System Manager' | 'Process Manager';
  icon: any;
  oneLineSummary: string;
  problem: string;
  simpleExplanation: string;
  glossary: { term: string; meaning: string };
  
  // 3-Stage Data Flow
  input: {
    title: string;
    description: string;
    items: string[];
    visualBadge: string;
  };
  processSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  output: {
    title: string;
    description: string;
    items: string[];
    visualBadge: string;
  };

  // Dedicated Chart
  chartTitle: string;
  chartSubtitle: string;
  chartType: 'bar' | 'timeline' | 'funnel' | 'schema' | 'comparison' | 'matrix';
  chartData: any[];
}

export const MANAGERS_DATA: Record<string, ManagerScenario> = {
  config: {
    id: 'config',
    number: 1,
    name: 'System Configuration Manager',
    category: 'System Manager',
    icon: Cpu,
    oneLineSummary: 'Manages server memory and hard drive space so data loading never crashes.',
    problem: 'The college Data Warehouse does not have enough storage. Large student data uploads will fail with an out-of-disk error.',
    simpleExplanation: 'Controls the physical hardware limits. It allocates RAM (memory) and hard drive storage before incoming batches of student data arrive.',
    glossary: {
      term: 'Buffer Pool / Storage',
      meaning: 'Dedicated computer memory and hard drive space reserved to store college tables.',
    },
    input: {
      title: 'Current Constrained System',
      description: 'Storage allocation is almost exhausted.',
      items: [
        'Total Allocated: 1536 GB',
        'Used Storage: 820 GB',
        'Free Storage Left: Only 716 GB',
      ],
      visualBadge: '⚠️ 53% Capacity (Near Limit)',
    },
    processSteps: [
      { step: 1, title: 'Check Available SAN Array', description: 'Inspects physical enterprise storage server.' },
      { step: 2, title: 'Expand Disk Allocation', description: 'Increases allocated storage parameter from 1536 GB to 2048 GB.' },
      { step: 3, title: 'Dedicate 48 GB RAM Pool', description: 'Reserves 16,384 MB buffer cache in memory for incoming data.' },
    ],
    output: {
      title: 'Expanded Healthy System',
      description: 'Ample free storage is ready for student records.',
      items: [
        'New Total Allocation: 2048 GB',
        'New Free Space: 1228 GB available',
        'Safety Status: Safe Green Zone (40% utilization)',
      ],
      visualBadge: '✅ +512 GB Added Successfully',
    },
    chartTitle: 'Before and After Free Storage Comparison (GB)',
    chartSubtitle: 'Visual comparison showing free storage expansion from 716 GB to 1228 GB',
    chartType: 'comparison',
    chartData: [
      { name: 'Before (Old Storage)', freeGb: 716, fill: '#f59e0b' },
      { name: 'After (Expanded Storage)', freeGb: 1228, fill: '#10b981' },
    ],
  },

  scheduling: {
    id: 'scheduling',
    number: 2,
    name: 'System Scheduling Manager',
    category: 'System Manager',
    icon: CalendarClock,
    oneLineSummary: 'Runs data loading jobs automatically at midnight without slowing down users.',
    problem: 'Attendance data is manually updated during the day, locking tables and slowing down college staff and students.',
    simpleExplanation: 'Works like an automated alarm clock. It holds heavy data uploads in queue and executes them during off-peak midnight hours.',
    glossary: {
      term: 'Batch Window',
      meaning: 'A scheduled off-peak period (e.g. 11:30 PM) when heavy database updates run automatically.',
    },
    input: {
      title: 'Pending Biometric Attendance Scans',
      description: 'Fingerprint & RFID scans collected all day across campus.',
      items: [
        '60 Student Attendance Records waiting',
        'Collected from CSE, ECE, EEE, IT, MECH nodes',
        'State: Waiting in upload queue',
      ],
      visualBadge: '⏳ Pending Ingestion',
    },
    processSteps: [
      { step: 1, title: 'Monitor Peak Daytime Hours', description: 'Blocks heavy batch loading between 9 AM and 6 PM to keep system fast.' },
      { step: 2, title: 'Wait for Scheduled Trigger', description: 'Timer reaches 11:30 PM midnight maintenance window.' },
      { step: 3, title: 'Execute Ingestion Job', description: 'Fires the automated batch runner in background.' },
    ],
    output: {
      title: 'Overnight Batch Completed',
      description: 'Records successfully committed without locking daytime users.',
      items: [
        'Job Status: COMPLETED at 23:30',
        '60 Records inserted into Fact_Attendance',
        'Daytime System Slowdown: 0%',
      ],
      visualBadge: '✅ Executed in Midnight Window',
    },
    chartTitle: '24-Hour Timeline: Daytime vs Scheduled Midnight Execution',
    chartSubtitle: 'Daytime (9 AM - 6 PM) is 100% reserved for users; Batch load executes at 11:30 PM',
    chartType: 'timeline',
    chartData: [
      { window: 'Daytime (9 AM - 6 PM)', batchLoad: 0, collegeStaffQueries: 100 },
      { window: 'Midnight Window (11:30 PM)', batchLoad: 100, collegeStaffQueries: 5 },
    ],
  },

  event: {
    id: 'event',
    number: 3,
    name: 'System Event Manager',
    category: 'System Manager',
    icon: BellRing,
    oneLineSummary: 'Catches system failures and alerts the administrator so no error is missed.',
    problem: 'A background data loading task fails at 2:00 AM without anyone noticing, resulting in empty reports for the Dean.',
    simpleExplanation: 'The central alarm system and black-box recorder. It listens for every warning, crash, or success, logs it, and alerts the admin.',
    glossary: {
      term: 'Event / Audit Trail',
      meaning: 'A timestamped record of an action, error, or warning that occurred in the warehouse.',
    },
    input: {
      title: 'Failed Data Loading Event',
      description: 'Raw error signal generated by a failed midnight import.',
      items: [
        'Signal: Corrupted CSV format in Biometric Batch',
        'Severity: Error Detected',
        'Origin: RFID Gateway Node Block-B',
      ],
      visualBadge: '⚠️ Unprocessed Raw Failure',
    },
    processSteps: [
      { step: 1, title: 'Capture Raw Error Signal', description: 'Detects the unhandled exception at 23:30:12.' },
      { step: 2, title: 'Determine Severity Level', description: 'Classifies event as ERROR (higher than Info and Warning).' },
      { step: 3, title: 'Generate Prescribed Fix', description: 'Recommends quarantining the 1 bad record and notifying administrator.' },
    ],
    output: {
      title: 'Logged Alert & Administrator Notification',
      description: 'Event is permanently logged with an immediate action plan.',
      items: [
        'Event ID: EVT-BATCH-ERR registered in audit log',
        'Severity Tag: ERROR (Immediate Attention)',
        'Recommended Action: Clean duplicate student ID',
      ],
      visualBadge: '📢 Alert Sent to Administrator',
    },
    chartTitle: 'System Event Severity Distribution',
    chartSubtitle: 'Real-time classification of logged warehouse operational events',
    chartType: 'bar',
    chartData: [
      { category: 'Informational (Normal)', count: 18, fill: '#3b82f6' },
      { category: 'Warnings (High Disk)', count: 4, fill: '#f59e0b' },
      { category: 'Errors (Failed Data)', count: 2, fill: '#ef4444' },
    ],
  },

  database: {
    id: 'database',
    number: 4,
    name: 'System Database Manager',
    category: 'System Manager',
    icon: Database,
    oneLineSummary: 'Protects table structures and prevents unauthorized users from modifying marks.',
    problem: 'Unauthorized users attempt to modify or delete student examination records.',
    simpleExplanation: 'The security gatekeeper. It enforces table columns, data types, and Role-Based Access Control (RBAC) permissions.',
    glossary: {
      term: 'RBAC (Role-Based Access Control)',
      meaning: 'Giving specific permissions (read, write, delete) based on whether someone is an Admin, Teacher, or Guest.',
    },
    input: {
      title: 'Incoming Database Access Request',
      description: 'Two users attempt operations on Fact_Examination.',
      items: [
        'User A: "dw_admin" requests to INSERT semester marks',
        'User B: "guest_user" requests to UPDATE / DELETE exam scores',
        'Target Table: Fact_Examination',
      ],
      visualBadge: '🔒 Access Check Required',
    },
    processSteps: [
      { step: 1, title: 'Inspect User Role', description: 'Looks up user permissions in the security catalog.' },
      { step: 2, title: 'Authorize Admin User', description: 'Grants write access to dw_admin (SELECT, INSERT, UPDATE, DELETE = YES).' },
      { step: 3, title: 'Block Unauthorized Guest', description: 'Rejects guest_user write attempt with Permission Denied error.' },
    ],
    output: {
      title: 'Protected Examination Database',
      description: 'Authorized updates succeed; malicious or accidental edits are blocked.',
      items: [
        'Admin Action: Allowed ✅ (Exam marks recorded)',
        'Guest Action: Blocked ❌ (Permission Denied)',
        'Integrity: Exam records remain 100% tamper-proof',
      ],
      visualBadge: '🛡️ Security Enforced',
    },
    chartTitle: 'User Role Permissions Comparison (Allowed vs Denied Privileges)',
    chartSubtitle: 'Admin role has full write access; Guest role is strictly blocked from modifying data',
    chartType: 'matrix',
    chartData: [
      { role: 'Admin (Full Access)', allowedPerms: 4, deniedPerms: 0, fill: '#10b981' },
      { role: 'Analyst (Read Only)', allowedPerms: 1, deniedPerms: 3, fill: '#3b82f6' },
      { role: 'Guest (Restricted)', allowedPerms: 0, deniedPerms: 4, fill: '#ef4444' },
    ],
  },

  backup: {
    id: 'backup',
    number: 5,
    name: 'System Backup Recovery Manager',
    category: 'System Manager',
    icon: LifeBuoy,
    oneLineSummary: 'Saves frozen copies of data and restores the warehouse if the server crashes.',
    problem: 'The Data Warehouse server crashes due to a power failure, making student records inaccessible.',
    simpleExplanation: 'The life insurance policy of the warehouse. It takes periodic snapshot copies and instantly re-hydrates the database after catastrophes.',
    glossary: {
      term: 'Backup Snapshot',
      meaning: 'An exact saved copy of all college tables frozen at a specific moment in time.',
    },
    input: {
      title: 'Crashed Server with Saved Snapshot',
      description: 'Hardware crash strikes the server; data is offline.',
      items: [
        'Server State: CRITICAL_CRASHED (Offline)',
        'Active Records Accessible: 0 records',
        'Available Snapshot: BAK-001 (142.5 MB, 208 rows)',
      ],
      visualBadge: '💥 System Currently Offline',
    },
    processSteps: [
      { step: 1, title: 'Detect Storage Failure', description: 'Marks database as offline to prevent corrupt writes.' },
      { step: 2, title: 'Mount Golden Backup Snapshot', description: 'Locates cleanest snapshot BAK-001 from recovery catalog.' },
      { step: 3, title: 'Restore All Tables', description: 'Restores Dim_Student, Fact_Attendance, and Fact_Examination.' },
    ],
    output: {
      title: 'Warehouse Fully Restored',
      description: 'The server reboots and returns to healthy normal operation.',
      items: [
        'Operational Status: NORMAL (Online)',
        'Restored Records: 208 of 208 records recovered',
        'Data Lost: 0 records (Zero data loss)',
      ],
      visualBadge: '✅ 100% Data Restored',
    },
    chartTitle: 'Disaster Recovery Timeline: Data Availability Percentage',
    chartSubtitle: 'Visual timeline showing 100% availability before crash, 0% during crash, and 100% after restore',
    chartType: 'timeline',
    chartData: [
      { state: '1. Before Crash', dataAvailablePct: 100, fill: '#10b981' },
      { state: '2. During Server Crash', dataAvailablePct: 0, fill: '#ef4444' },
      { state: '3. After Snapshot Recovery', dataAvailablePct: 100, fill: '#38bdf8' },
    ],
  },

  load: {
    id: 'load',
    number: 6,
    name: 'Load Manager',
    category: 'Process Manager',
    icon: HardDriveDownload,
    oneLineSummary: 'Extracts messy files, cleans duplicates and typos, and loads clean data.',
    problem: 'Raw attendance files from departments contain duplicate student IDs and formatting errors.',
    simpleExplanation: 'The refinery of the warehouse. It performs ETL: Extract data from files, Transform and clean duplicates, and Load clean rows into tables.',
    glossary: {
      term: 'ETL',
      meaning: 'Extract (collect raw files) → Transform (clean & fix errors) → Load (save into the warehouse).',
    },
    input: {
      title: '7 Raw Biometric Attendance Records',
      description: 'Unprocessed departmental CSV file containing errors.',
      items: [
        'Row 1: PSG21CS001 (Valid scan)',
        'Row 2: PSG21CS001 (Duplicate scan - repeated!)',
        'Row 3-7: Valid student records from ECE, IT, MECH',
      ],
      visualBadge: '📄 7 Raw Records Ingested',
    },
    processSteps: [
      { step: 1, title: 'Extract', description: 'Reads the raw CSV attendance file from campus server.' },
      { step: 2, title: 'Transform & Deduplicate', description: 'Detects that PSG21CS001 appears twice and catches duplicate key.' },
      { step: 3, title: 'Load', description: 'Inserts 6 clean records into Fact_Attendance and quarantines the duplicate.' },
    ],
    output: {
      title: 'Pristine Warehouse Records',
      description: 'Clean data is stored; duplicate record is rejected.',
      items: [
        'Successfully Loaded: 6 Valid Records',
        'Rejected / Quarantined: 1 Duplicate (PSG21CS001)',
        'Target Table: Fact_Attendance updated',
      ],
      visualBadge: '✅ 6 Clean Loaded / 1 Rejected',
    },
    chartTitle: 'ETL Data Funnel: Raw Records vs Clean Loaded vs Rejected',
    chartSubtitle: 'The Load Manager cleans 7 raw records, keeping 6 valid and rejecting 1 duplicate',
    chartType: 'funnel',
    chartData: [
      { stage: '1. Raw Extracted', count: 7, fill: '#38bdf8' },
      { stage: '2. Clean Loaded', count: 6, fill: '#10b981' },
      { stage: '3. Duplicate Rejected', count: 1, fill: '#ef4444' },
    ],
  },

  warehouse: {
    id: 'warehouse',
    number: 7,
    name: 'Warehouse Manager',
    category: 'Process Manager',
    icon: Boxes,
    oneLineSummary: 'Organizes data into a Star Schema and divides history into year partitions.',
    problem: 'Historical attendance records from multiple years are difficult to organize and scan.',
    simpleExplanation: 'The architect. It arranges tables into a Star Schema (a central Fact table surrounded by Dimension tables) and creates year partitions.',
    glossary: {
      term: 'Star Schema & Partitioning',
      meaning: 'Star Schema links numbers to student profiles. Partitioning divides big data into academic years so searches run faster.',
    },
    input: {
      title: 'Unorganized Student History',
      description: 'Decades of historical attendance records all mixed in one flat file.',
      items: [
        'Years mixed: 2021, 2022, 2023, 2024',
        'Structure: Unindexed flat table',
        'Scan requirement: Must read all past years sequentially',
      ],
      visualBadge: '📦 Unorganized Raw Storage',
    },
    processSteps: [
      { step: 1, title: 'Design Star Schema', description: 'Places Fact_Attendance in center and links to Dim_Student and Dim_Department.' },
      { step: 2, title: 'Create Year Partitions', description: 'Splits history into separate slices for 2021-22, 2022-23, 2023-24, and 2024-25.' },
      { step: 3, title: 'Enable Partition Pruning', description: 'Instructs database to skip irrelevant past years when searching for 2024 data.' },
    ],
    output: {
      title: 'Structured Star Schema & Year Partitions',
      description: 'Queries now skip 75% of old data automatically.',
      items: [
        'Central Table: Fact_Attendance connected to Dimensions',
        'Partitions: 4 Academic Years separated',
        'Search Efficiency: 75% Physical Disk Work Saved',
      ],
      visualBadge: '⭐ Star Schema & 4 Partitions',
    },
    chartTitle: 'Partition Pruning Efficiency: Percentage of Disk Scanned',
    chartSubtitle: 'Without partitioning, 100% of past years are scanned; with year partitions, only 25% is read',
    chartType: 'bar',
    chartData: [
      { method: 'Without Partitions (Full Scan)', diskScannedPct: 100, fill: '#ef4444' },
      { method: 'With Year Partitions (Only 2024)', diskScannedPct: 25, fill: '#10b981' },
    ],
  },

  query: {
    id: 'query',
    number: 8,
    name: 'Query Manager',
    category: 'Process Manager',
    icon: Terminal,
    oneLineSummary: 'Executes SQL questions from the Principal and returns instant summary reports.',
    problem: 'The college Principal wants department-wise placement salary statistics without manual searching.',
    simpleExplanation: 'The search gateway. It takes an analytical SQL query, reads the warehouse tables, groups the numbers, and returns instant answers.',
    glossary: {
      term: 'SQL Query / Aggregation',
      meaning: 'Asking the database a question (like "Calculate average placement package per department").',
    },
    input: {
      title: 'Principal\'s Analytics Request',
      description: 'SQL statement submitted to retrieve campus recruitment numbers.',
      items: [
        'Query: SELECT department_id, AVG(package_lpa)...',
        'Target: Fact_Placement table',
        'Goal: Calculate average and highest salary per department',
      ],
      visualBadge: '💬 SQL Request Received',
    },
    processSteps: [
      { step: 1, title: 'Parse SQL Syntax', description: 'Verifies SQL statement grammar and checks that Fact_Placement exists.' },
      { step: 2, title: 'Execute Group By', description: 'Groups student offers by engineering department (CSE, ECE, EEE, IT, MECH).' },
      { step: 3, title: 'Calculate Averages', description: 'Computes mean package LPA in memory in 14.2 milliseconds.' },
    ],
    output: {
      title: 'Department Placement Report',
      description: 'Clean statistics table returned to the Principal.',
      items: [
        'CSE: Avg 13.50 LPA (Highest: 24.00 LPA)',
        'IT: Avg 16.50 LPA (Highest: 22.00 LPA)',
        'ECE: Avg 11.88 LPA (Highest: 17.50 LPA)',
        'MECH: Avg 7.00 LPA (Highest: 7.00 LPA)',
      ],
      visualBadge: '📊 Report Generated in 14 ms',
    },
    chartTitle: 'Department-wise Average Placement Package (LPA)',
    chartSubtitle: 'Analytical query results computed across all campus company offers',
    chartType: 'bar',
    chartData: [
      { dept: 'IT', avgSalaryLpa: 16.5, offers: 2, fill: '#a855f7' },
      { dept: 'CSE', avgSalaryLpa: 13.5, offers: 11, fill: '#3b82f6' },
      { dept: 'ECE', avgSalaryLpa: 11.9, offers: 4, fill: '#10b981' },
      { dept: 'MECH', avgSalaryLpa: 7.0, offers: 1, fill: '#f59e0b' },
    ],
  },

  tuning: {
    id: 'tuning',
    number: 9,
    name: 'Tuning Manager',
    category: 'Process Manager',
    icon: Zap,
    oneLineSummary: 'Builds indexes to make slow queries run 4x faster.',
    problem: 'A query takes too long (48.5 ms) because it scans every single student record sequentially.',
    simpleExplanation: 'The speed mechanic. It creates an index (like the index at the back of a textbook) so the database jumps directly to matching records.',
    glossary: {
      term: 'Index (B-Tree & Bitmap)',
      meaning: 'A fast lookup shortcut that tells the database where matching data is located without reading every page.',
    },
    input: {
      title: 'Unoptimized Slow Query',
      description: 'Query: SELECT * FROM Dim_Student WHERE department_id = "CSE"',
      items: [
        'Access Method: Full Table Scan (Reads all 60 blocks)',
        'Speed: 48.5 milliseconds (Simulated benchmark)',
        'Problem: Wastes disk I/O reading non-CSE students',
      ],
      visualBadge: '🐢 Slow Full Table Scan',
    },
    processSteps: [
      { step: 1, title: 'Analyze Bottleneck', description: 'Detects that department_id is searched frequently without an index.' },
      { step: 2, title: 'Construct Bitmap Index', description: 'Builds a compact Bitmap Index mapping department_id to row pointers.' },
      { step: 3, title: 'Update Execution Plan', description: 'Replaces Full Table Scan with instant Index Pointer Lookup.' },
    ],
    output: {
      title: 'Accelerated Query Result',
      description: 'The search time drops dramatically from 48.5 ms to 12.2 ms.',
      items: [
        'Optimized Speed: 12.2 milliseconds (Simulated benchmark)',
        'Improvement: 🚀 4.0x Faster (74.8% Latency Reduction)',
        'Access Path: Bitmap Index Scan on department_id',
      ],
      visualBadge: '⚡ 4x Speedup Achieved',
    },
    chartTitle: 'Query Execution Time Comparison: Full Scan vs Bitmap Index (ms)',
    chartSubtitle: 'Simulated benchmark: Searching without index takes 48.5 ms; with Bitmap Index takes 12.2 ms',
    chartType: 'comparison',
    chartData: [
      { type: 'Without Index (Full Scan)', timeMs: 48.5, fill: '#ef4444' },
      { type: 'With Bitmap Index (Index Scan)', timeMs: 12.2, fill: '#10b981' },
    ],
  },

  testing: {
    id: 'testing',
    number: 10,
    name: 'Testing Manager',
    category: 'Process Manager',
    icon: CheckCheck,
    oneLineSummary: 'Compares source vs warehouse records and catches missing or corrupted data.',
    problem: 'The college source portal has 60 students, but only 52 records are found in the warehouse after loading.',
    simpleExplanation: 'The quality inspector. It reconciles source vs target row counts, checks for duplicate IDs, and catches missing or invalid data.',
    glossary: {
      term: 'Data Reconciliation',
      meaning: 'Comparing source records against destination records to mathematically prove no student data was lost.',
    },
    input: {
      title: 'Record Discrepancy Suspected',
      description: 'Source ERP portal count does not match warehouse table count.',
      items: [
        'Source College ERP Records: 60 students',
        'Warehouse Table Records: 52 students',
        'Discrepancy: 8 Missing Student Records!',
      ],
      visualBadge: '⚠️ Discrepancy Detected',
    },
    processSteps: [
      { step: 1, title: 'Compare Record Counts', description: 'Finds that 60 expected students - 52 actual students = 8 missing rows.' },
      { step: 2, title: 'Identify Missing IDs', description: 'Pinpoints the exact 8 students that failed loading during the import.' },
      { step: 3, title: 'Validate Quality Rules', description: 'Audits duplicate keys, null values, and checks that CGPAs are between 0 and 10.' },
    ],
    output: {
      title: 'Audit Report & Remediation',
      description: 'The 8 missing records are identified and re-synced; all 5 quality tests pass.',
      items: [
        'Missing Students: 8 rows pinpointed and re-loaded',
        'Final Warehouse Count: 60 of 60 students matched (100%)',
        'Audit Certificate: 5 of 5 Quality Tests PASSED',
      ],
      visualBadge: '✅ 100% Quality Verified',
    },
    chartTitle: 'Data Quality Test Pass Rate Chart',
    chartSubtitle: 'Source reconciliation, uniqueness, null checks, foreign keys, and CGPA range',
    chartType: 'bar',
    chartData: [
      { testName: '1. Count Match', scorePct: 100, fill: '#10b981' },
      { testName: '2. 0 Duplicates', scorePct: 100, fill: '#10b981' },
      { testName: '3. 0 Null Fields', scorePct: 100, fill: '#10b981' },
      { testName: '4. Valid Students', scorePct: 100, fill: '#10b981' },
      { testName: '5. CGPA In Range', scorePct: 100, fill: '#10b981' },
    ],
  },
};
