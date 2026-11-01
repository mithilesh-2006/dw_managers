# DW Control Center – Data Warehouse Management Simulator

**Anna University R2021 Syllabus • CS8791 / IT8791 Data Warehousing & Data Mining**  
**Educational Simulation System for PSG iTech College Data Warehouse**

---

## 🎯 Overview

The **DW Control Center** is an interactive, enterprise-style web application designed to simulate all **10 Managers** involved in Data Warehousing System Management and Process Management. 

Built specifically for educational demonstrations, classroom seminars, and laboratory sessions under Anna University R2021 curriculum, it demonstrates:
- What problem each manager solves.
- Why each manager is required.
- How the manager works.
- What operations the manager performs.
- How all 10 managers collaborate synchronously in a centralized Data Warehouse environment.

---

## 🏛️ Centralized Simulation Environment

**Organization:** PSG iTech College Data Warehouse  
**Academic Year:** 2024–2025  
**Core Entities:**
1. `Dim_Student`: 60 realistic student records across CSE, ECE, EEE, IT, MECH.
2. `Dim_Department`: 5 engineering departments with HODs, intake, and lab counts.
3. `Fact_Attendance`: Biometric attendance records with hours attended, percentages, and statuses.
4. `Fact_Examination`: End-semester exam scores with internal/external marks, grades, and credits.
5. `Fact_Placement`: Campus placement offers with packages (LPA), companies, and interview rounds.
6. `Dim_Faculty`: Faculty registry with experience, designations, and research areas.

Every action across all 10 modules modifies the **same shared simulation state** (persisted to LocalStorage and powered in-memory by AlaSQL).

---

## ⚙️ The 10 Simulated Managers

### Part I: System Management (5 Managers)

1. **System Configuration Manager (`/config`)**
   - **Problem:** Insufficient memory and storage volumes during academic expansion.
   - **Features:** Server hardware specs (16 Cores, 64 GB RAM, 2048 GB Storage), RAM Buffer Pool slider (4GB–32GB), WAL mode selector, Storage allocation adjustment with live utilization gauge and before/after diff matrix.

2. **System Scheduling Manager (`/scheduling`)**
   - **Problem:** Daytime manual data entry causes table lock contention and query slowdowns.
   - **Features:** Cron batch job scheduler (Hourly, Daily Midnight, Weekly, Monthly), Enable/Disable toggles, "Run Now" manual trigger, live stdout terminal stream.

3. **System Event Manager (`/events`)**
   - **Problem:** Silent loading script failures leave administrators unaware of corrupted data.
   - **Features:** Real-time event log with severity categories (Info, Warning, Error, Critical), alert acknowledgement, classroom failure simulation triggers (ETL integrity crash, storage saturation, connection pool starvation), JSON export.

4. **System Database Manager (`/database`)**
   - **Problem:** Poorly organized schemas and unauthorized privilege escalation.
   - **Features:** Schema browser (Fact & Dimension classifications), column types & constraint inspector, live sample rows viewer, custom table creator, Role-Based Access Control (RBAC) with user role switching (Admin, Analyst, Department Viewer, Guest).

5. **System Backup Recovery Manager (`/backup`)**
   - **Problem:** Catastrophic hardware failure or ransomware causes total academic data loss.
   - **Features:** Immutable snapshot creation with checksum, catalog of recovery points, "Simulate Unexpected System Crash" button (suspends operations), point-in-time snapshot restoration with confirmation safeguards.

---

### Part II: Process Management (5 Managers)

6. **Load Manager (ETL Pipeline) (`/load`)**
   - **Problem:** Heterogenous departmental files with conflicting formats, duplicate student IDs, and nulls.
   - **Features:** Visual 3-tier pipeline (`EXTRACT` &rarr; `TRANSFORM` &rarr; `LOAD`), raw CSV file selector (clean vs dirty feeds), automated deduplication, department capitalization normalization, domain range checks, bad-records quarantine table.

7. **Warehouse Manager (`/warehouse`)**
   - **Problem:** Massive flat datasets degrade multi-year trend queries.
   - **Features:** Interactive Star Schema visualizer (central Fact surrounded by Dimension tables), Academic Year Range Partitioning (2021–2025) with mount/detach pruning controls, Materialized Aggregation Cubes generator.

8. **Query Manager (`/query`)**
   - **Problem:** Principals and Deans cannot manually inspect thousands of student records for accreditation reports.
   - **Features:** In-browser relational SQL editor powered by **AlaSQL**, predefined Anna University query templates (Placement statistics, Attendance &lt; 75%, Merit rankers, Cross-table joins), query execution timer, optimizer execution plan viewer, tabular results with JSON export.

9. **Tuning Manager (`/tuning`)**
   - **Problem:** Slow query execution due to expensive sequential Full Table Scans.
   - **Features:** Before-and-after query latency benchmark studio with Recharts bar comparison, B-Tree and Bitmap Index builder, speedup factor calculation (~4x faster), simulated I/O reduction breakdown.

10. **Testing Manager (`/testing`)**
    - **Problem:** Source ERP has 60 students but warehouse only loaded 52 rows due to an ETL bug.
    - **Features:** Automated 5-test data quality audit suite (Source-to-target count reconciliation, primary key uniqueness, null audit, foreign key referential integrity, CGPA domain range 0–10), discrepancy row pinpointing, one-click anomaly injection and auto-repair.

---

## 🚀 Integration & Seminar Features

### 🔄 Cross-Manager Integrated Workflow (`/workflow`)
Step-by-step 10-manager pipeline demonstrating synchronous operation from Configuration verification to Snapshot creation. Includes mid-flow failure injection at Step 5 (Load Manager) to demonstrate cross-manager incident handling.

### 🎮 5 Guided Real-World Scenarios (`/scenarios`)
1. **Scenario 1: Daily Biometric Attendance ETL Pipeline**
2. **Scenario 2: Critical Server Storage Saturation & Volume Expansion**
3. **Scenario 3: Catastrophic Hardware Crash & Point-in-Time Recovery**
4. **Scenario 4: Analytical Query Bottleneck & Bitmap Index Tuning**
5. **Scenario 5: Data Quality Breach & Automated Reconciliation**

### 📽️ Dedicated Presentation Mode (`/presentation`)
- Full-screen friendly layout with minimal distractions.
- High-contrast, large typography optimized for classroom projectors.
- Presenter navigation controls with manager quick-jump pills.
- 6-step guided walkthrough per manager:
  1. Real Problem Statement
  2. Why Manager is Required
  3. Architectural Solution
  4. Interactive Live Action
  5. Verified Simulation Outcome
  6. Key Concept Takeaway

### 📚 Anna University R2021 Syllabus Hub & Quizzes
Every manager workspace includes an **"Syllabus Notes & Quiz"** modal with:
- Formal Definition & Purpose.
- Core Responsibilities & Campus Real-World Example.
- Differences from related managers.
- **Interactive 2-Question Knowledge Check** with instant scoring and explanations.

---

## 🛠️ Technology Stack

- **React 18** with **Vite 6** & **TypeScript**
- **Tailwind CSS** with enterprise charcoal/navy aesthetic
- **AlaSQL**: Client-side relational SQL engine for genuine in-browser SQL queries
- **Lucide React**: Modern iconography
- **Recharts**: Responsive data visualizations
- **React Router DOM 6**: Client-side routing
- **HTML5 Web Storage**: Persistent simulation state

---

## 💻 Running the Application Locally

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Launch Vite development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

Open `http://localhost:5173` in your browser.
