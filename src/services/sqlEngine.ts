// AlaSQL client-side relational SQL engine wrapper
import alasql from 'alasql';
import {
  StudentRecord,
  DepartmentRecord,
  AttendanceRecord,
  ExamRecord,
  PlacementRecord,
  FacultyRecord,
  SimulatedIndex,
} from '../types';

export interface QueryExecutionResult {
  sql: string;
  success: boolean;
  rows: any[];
  columns: string[];
  rowCount: number;
  executionTimeMs: number;
  plan: string[];
  error?: string;
  indexUsed?: string;
}

class SqlEngineService {
  private initialized: boolean = false;
  private currentIndexes: SimulatedIndex[] = [];

  public init(
    students: StudentRecord[],
    departments: DepartmentRecord[],
    attendance: AttendanceRecord[],
    exams: ExamRecord[],
    placements: PlacementRecord[],
    faculty: FacultyRecord[],
    indexes: SimulatedIndex[] = []
  ) {
    try {
      this.currentIndexes = indexes;
      // Reset tables in alasql
      alasql('DROP TABLE IF EXISTS Dim_Student');
      alasql('DROP TABLE IF EXISTS Dim_Department');
      alasql('DROP TABLE IF EXISTS Fact_Attendance');
      alasql('DROP TABLE IF EXISTS Fact_Examination');
      alasql('DROP TABLE IF EXISTS Fact_Placement');
      alasql('DROP TABLE IF EXISTS Dim_Faculty');
      alasql('DROP TABLE IF EXISTS students'); // Aliases for convenience
      alasql('DROP TABLE IF EXISTS departments');
      alasql('DROP TABLE IF EXISTS attendance');
      alasql('DROP TABLE IF EXISTS examination');
      alasql('DROP TABLE IF EXISTS placement');

      // Create Tables
      alasql('CREATE TABLE Dim_Student');
      alasql('CREATE TABLE Dim_Department');
      alasql('CREATE TABLE Fact_Attendance');
      alasql('CREATE TABLE Fact_Examination');
      alasql('CREATE TABLE Fact_Placement');
      alasql('CREATE TABLE Dim_Faculty');

      // Populate Data
      alasql.tables.Dim_Student.data = JSON.parse(JSON.stringify(students));
      alasql.tables.Dim_Department.data = JSON.parse(JSON.stringify(departments));
      alasql.tables.Fact_Attendance.data = JSON.parse(JSON.stringify(attendance));
      alasql.tables.Fact_Examination.data = JSON.parse(JSON.stringify(exams));
      alasql.tables.Fact_Placement.data = JSON.parse(JSON.stringify(placements));
      alasql.tables.Dim_Faculty.data = JSON.parse(JSON.stringify(faculty));

      // Convenience aliases
      alasql('CREATE TABLE students');
      alasql('CREATE TABLE departments');
      alasql('CREATE TABLE attendance');
      alasql('CREATE TABLE examination');
      alasql('CREATE TABLE placement');

      alasql.tables.students.data = alasql.tables.Dim_Student.data;
      alasql.tables.departments.data = alasql.tables.Dim_Department.data;
      alasql.tables.attendance.data = alasql.tables.Fact_Attendance.data;
      alasql.tables.examination.data = alasql.tables.Fact_Examination.data;
      alasql.tables.placement.data = alasql.tables.Fact_Placement.data;

      this.initialized = true;
    } catch (err: any) {
      console.error('Failed to initialize AlaSQL tables:', err);
    }
  }

  public execute(
    sqlQuery: string,
    indexes: SimulatedIndex[] = []
  ): QueryExecutionResult {
    const trimmed = sqlQuery.trim();
    if (!trimmed) {
      return {
        sql: sqlQuery,
        success: false,
        rows: [],
        columns: [],
        rowCount: 0,
        executionTimeMs: 0,
        plan: ['Empty query provided'],
        error: 'Please enter a valid SQL query',
      };
    }

    const startTime = performance.now();
    try {
      // AlaSQL query execution
      const res = alasql(trimmed);
      const rawRows = Array.isArray(res) ? res : [res];
      const endTime = performance.now();

      // Determine matched indexes based on WHERE or JOIN clauses in the query
      const lowerSql = trimmed.toLowerCase();
      let matchedIndex: SimulatedIndex | undefined = undefined;

      for (const idx of indexes) {
        if (
          lowerSql.includes(idx.columnName.toLowerCase()) ||
          lowerSql.includes(idx.tableName.toLowerCase())
        ) {
          matchedIndex = idx;
          break;
        }
      }

      // Base execution time simulation for educational realism:
      // An unindexed scan across warehouse joins takes ~45ms - 120ms
      // With index, speedup cuts it to 4ms - 15ms
      let simulatedTimeMs: number;
      if (matchedIndex) {
        simulatedTimeMs = Math.max(3.2, Math.round((28.5 / matchedIndex.speedupFactor) * 10) / 10);
      } else {
        const joinCount = (lowerSql.match(/join/g) || []).length;
        simulatedTimeMs = Math.round((28.5 + joinCount * 18.2 + (endTime - startTime)) * 10) / 10;
      }

      // Generate simulated Execution Plan
      const plan: string[] = [];
      plan.push(`1. SQL Parser: Parsed statement successfully`);
      if (lowerSql.includes('join')) {
        plan.push(`2. Optimizer: Hash Join between Fact and Dimension relations`);
      }
      if (matchedIndex) {
        plan.push(`3. Access Path: INDEX SCAN using [${matchedIndex.name}] on ${matchedIndex.tableName}.${matchedIndex.columnName} (${matchedIndex.type})`);
        plan.push(`4. Cost Benefit: Filtered target blocks with ${matchedIndex.speedupFactor}x reduction in block reads`);
      } else {
        plan.push(`3. Access Path: FULL TABLE SCAN (Sequential Disk Scan across all storage pages)`);
        plan.push(`4. Recommendation: Consider creating a B-Tree or Bitmap Index to avoid full scans`);
      }
      if (lowerSql.includes('group by')) {
        plan.push(`5. Aggregation: Hash Aggregate operator grouped results`);
      }
      if (lowerSql.includes('order by')) {
        plan.push(`6. Sort: Quicksort on output projection`);
      }

      // Extract columns
      const firstRow = rawRows[0] || {};
      const columns = typeof firstRow === 'object' && firstRow !== null ? Object.keys(firstRow) : ['Result'];

      return {
        sql: trimmed,
        success: true,
        rows: rawRows,
        columns,
        rowCount: rawRows.length,
        executionTimeMs: simulatedTimeMs,
        plan,
        indexUsed: matchedIndex ? matchedIndex.name : undefined,
      };
    } catch (err: any) {
      const endTime = performance.now();
      return {
        sql: trimmed,
        success: false,
        rows: [],
        columns: [],
        rowCount: 0,
        executionTimeMs: Math.round((endTime - startTime) * 10) / 10,
        plan: ['1. SQL Parser: Syntax or Catalog error', `2. ${err.message || 'Execution halted'}`],
        error: err.message || 'SQL execution failed. Check table names and syntax.',
      };
    }
  }

  public getTables(): string[] {
    return [
      'Dim_Student',
      'Dim_Department',
      'Fact_Attendance',
      'Fact_Examination',
      'Fact_Placement',
      'Dim_Faculty',
    ];
  }
}

export const sqlEngine = new SqlEngineService();
