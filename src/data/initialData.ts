// PSG iTech College Data Warehouse - Realistic Initial Simulation Dataset
import {
  StudentRecord,
  DepartmentRecord,
  AttendanceRecord,
  ExamRecord,
  PlacementRecord,
  FacultyRecord,
  ServerConfig,
  ScheduledJob,
  SimulatedUser,
  EducationalConcept,
} from '../types';

export const INITIAL_DEPARTMENTS: DepartmentRecord[] = [
  { department_id: 'CSE', department_name: 'Computer Science and Engineering', hod_name: 'Dr. R. Manimegalai', intake: 120, labs_count: 6 },
  { department_id: 'ECE', department_name: 'Electronics and Communication Engineering', hod_name: 'Dr. P. Vetrivelan', intake: 120, labs_count: 5 },
  { department_id: 'EEE', department_name: 'Electrical and Electronics Engineering', hod_name: 'Dr. C. S. Subhash Kumar', intake: 60, labs_count: 4 },
  { department_id: 'IT', department_name: 'Information Technology', hod_name: 'Dr. K. Umamaheswari', intake: 60, labs_count: 4 },
  { department_id: 'MECH', department_name: 'Mechanical Engineering', hod_name: 'Dr. S. Jayakumar', intake: 60, labs_count: 5 },
];

export const INITIAL_STUDENTS: StudentRecord[] = [
  // CSE Department (15 students)
  { student_id: 'PSG21CS001', name: 'Aakash Sundararajan', gender: 'M', department_id: 'CSE', department_name: 'Computer Science and Engineering', batch: '2021-2025', cgpa: 9.15, attendance_pct: 92.4, email: 'aakash.s@psgitech.ac.in', phone: '9840123401', placement_status: 'Placed' },
  { student_id: 'PSG21CS002', name: 'Abirami Ramanathan', gender: 'F', department_id: 'CSE', department_name: 'Computer Science and Engineering', batch: '2021-2025', cgpa: 9.42, attendance_pct: 95.0, email: 'abirami.r@psgitech.ac.in', phone: '9840123402', placement_status: 'Placed' },
  { student_id: 'PSG21CS003', name: 'Bharathwaj Kalyan', gender: 'M', department_id: 'CSE', department_name: 'Computer Science and Engineering', batch: '2021-2025', cgpa: 8.65, attendance_pct: 88.5, email: 'bharath.k@psgitech.ac.in', phone: '9840123403', placement_status: 'Placed' },
  { student_id: 'PSG21CS004', name: 'Charumathi Venkatesan', gender: 'F', department_id: 'CSE', department_name: 'Computer Science and Engineering', batch: '2021-2025', cgpa: 7.82, attendance_pct: 81.2, email: 'charu.v@psgitech.ac.in', phone: '9840123404', placement_status: 'In Process' },
  { student_id: 'PSG21CS005', name: 'Dharani Selvaganapathy', gender: 'F', department_id: 'CSE', department_name: 'Computer Science and Engineering', batch: '2021-2025', cgpa: 8.90, attendance_pct: 90.0, email: 'dharani.s@psgitech.ac.in', phone: '9840123405', placement_status: 'Placed' },
  { student_id: 'PSG21CS006', name: 'Gowtham Sivakumar', gender: 'M', department_id: 'CSE', department_name: 'Computer Science and Engineering', batch: '2021-2025', cgpa: 6.95, attendance_pct: 73.5, email: 'gowtham.s@psgitech.ac.in', phone: '9840123406', placement_status: 'Not Placed' },
  { student_id: 'PSG21CS007', name: 'Harini Balasubramanian', gender: 'F', department_id: 'CSE', department_name: 'Computer Science and Engineering', batch: '2021-2025', cgpa: 9.60, attendance_pct: 96.5, email: 'harini.b@psgitech.ac.in', phone: '9840123407', placement_status: 'Placed' },
  { student_id: 'PSG21CS008', name: 'Jaganathan Natarajan', gender: 'M', department_id: 'CSE', department_name: 'Computer Science and Engineering', batch: '2021-2025', cgpa: 8.12, attendance_pct: 84.0, email: 'jagan.n@psgitech.ac.in', phone: '9840123408', placement_status: 'Placed' },
  { student_id: 'PSG21CS009', name: 'Kavitha Krishnamoorthy', gender: 'F', department_id: 'CSE', department_name: 'Computer Science and Engineering', batch: '2021-2025', cgpa: 8.45, attendance_pct: 89.2, email: 'kavitha.k@psgitech.ac.in', phone: '9840123409', placement_status: 'Placed' },
  { student_id: 'PSG21CS010', name: 'Lokesh Kumaravel', gender: 'M', department_id: 'CSE', department_name: 'Computer Science and Engineering', batch: '2021-2025', cgpa: 7.20, attendance_pct: 76.8, email: 'lokesh.k@psgitech.ac.in', phone: '9840123410', placement_status: 'In Process' },
  { student_id: 'PSG21CS011', name: 'Manojkumar Rajendran', gender: 'M', department_id: 'CSE', department_name: 'Computer Science and Engineering', batch: '2021-2025', cgpa: 8.78, attendance_pct: 91.0, email: 'manoj.r@psgitech.ac.in', phone: '9840123411', placement_status: 'Placed' },
  { student_id: 'PSG21CS012', name: 'Naveen Chandrasekar', gender: 'M', department_id: 'CSE', department_name: 'Computer Science and Engineering', batch: '2021-2025', cgpa: 9.05, attendance_pct: 93.5, email: 'naveen.c@psgitech.ac.in', phone: '9840123412', placement_status: 'Placed' },
  { student_id: 'PSG21CS013', name: 'Pavithra Subramanian', gender: 'F', department_id: 'CSE', department_name: 'Computer Science and Engineering', batch: '2021-2025', cgpa: 8.35, attendance_pct: 87.0, email: 'pavithra.s@psgitech.ac.in', phone: '9840123413', placement_status: 'Placed' },
  { student_id: 'PSG21CS014', name: 'Rohit Jayaraman', gender: 'M', department_id: 'CSE', department_name: 'Computer Science and Engineering', batch: '2021-2025', cgpa: 6.80, attendance_pct: 71.0, email: 'rohit.j@psgitech.ac.in', phone: '9840123414', placement_status: 'Not Placed' },
  { student_id: 'PSG21CS015', name: 'Sneha Muthukumar', gender: 'F', department_id: 'CSE', department_name: 'Computer Science and Engineering', batch: '2021-2025', cgpa: 9.30, attendance_pct: 94.0, email: 'sneha.m@psgitech.ac.in', phone: '9840123415', placement_status: 'Placed' },

  // ECE Department (12 students)
  { student_id: 'PSG21EC001', name: 'Anirudh Raghavan', gender: 'M', department_id: 'ECE', department_name: 'Electronics and Communication Engineering', batch: '2021-2025', cgpa: 8.85, attendance_pct: 89.0, email: 'anirudh.r@psgitech.ac.in', phone: '9840123416', placement_status: 'Placed' },
  { student_id: 'PSG21EC002', name: 'Bhavana Soundarrajan', gender: 'F', department_id: 'ECE', department_name: 'Electronics and Communication Engineering', batch: '2021-2025', cgpa: 9.20, attendance_pct: 93.0, email: 'bhavana.s@psgitech.ac.in', phone: '9840123417', placement_status: 'Placed' },
  { student_id: 'PSG21EC003', name: 'Chandru Thangavel', gender: 'M', department_id: 'ECE', department_name: 'Electronics and Communication Engineering', batch: '2021-2025', cgpa: 7.50, attendance_pct: 78.5, email: 'chandru.t@psgitech.ac.in', phone: '9840123418', placement_status: 'In Process' },
  { student_id: 'PSG21EC004', name: 'Deepika Mohanraj', gender: 'F', department_id: 'ECE', department_name: 'Electronics and Communication Engineering', batch: '2021-2025', cgpa: 8.60, attendance_pct: 88.0, email: 'deepika.m@psgitech.ac.in', phone: '9840123419', placement_status: 'Placed' },
  { student_id: 'PSG21EC005', name: 'Ganesh Periasamy', gender: 'M', department_id: 'ECE', department_name: 'Electronics and Communication Engineering', batch: '2021-2025', cgpa: 7.15, attendance_pct: 74.0, email: 'ganesh.p@psgitech.ac.in', phone: '9840123420', placement_status: 'Not Placed' },
  { student_id: 'PSG21EC006', name: 'Hemalatha Govindaraj', gender: 'F', department_id: 'ECE', department_name: 'Electronics and Communication Engineering', batch: '2021-2025', cgpa: 8.95, attendance_pct: 91.5, email: 'hema.g@psgitech.ac.in', phone: '9840123421', placement_status: 'Placed' },
  { student_id: 'PSG21EC007', name: 'Karthikeyan Shanmugam', gender: 'M', department_id: 'ECE', department_name: 'Electronics and Communication Engineering', batch: '2021-2025', cgpa: 9.35, attendance_pct: 94.5, email: 'karthi.s@psgitech.ac.in', phone: '9840123422', placement_status: 'Placed' },
  { student_id: 'PSG21EC008', name: 'Monika Arumugam', gender: 'F', department_id: 'ECE', department_name: 'Electronics and Communication Engineering', batch: '2021-2025', cgpa: 8.25, attendance_pct: 86.0, email: 'monika.a@psgitech.ac.in', phone: '9840123423', placement_status: 'Placed' },
  { student_id: 'PSG21EC009', name: 'Pranesh Vijayakumar', gender: 'M', department_id: 'ECE', department_name: 'Electronics and Communication Engineering', batch: '2021-2025', cgpa: 8.05, attendance_pct: 82.0, email: 'pranesh.v@psgitech.ac.in', phone: '9840123424', placement_status: 'Higher Studies' },
  { student_id: 'PSG21EC010', name: 'Rithika Elangovan', gender: 'F', department_id: 'ECE', department_name: 'Electronics and Communication Engineering', batch: '2021-2025', cgpa: 8.70, attendance_pct: 90.0, email: 'rithika.e@psgitech.ac.in', phone: '9840123425', placement_status: 'Placed' },
  { student_id: 'PSG21EC011', name: 'Siddharth Senthilkumar', gender: 'M', department_id: 'ECE', department_name: 'Electronics and Communication Engineering', batch: '2021-2025', cgpa: 9.10, attendance_pct: 92.5, email: 'sid.s@psgitech.ac.in', phone: '9840123426', placement_status: 'Placed' },
  { student_id: 'PSG21EC012', name: 'Vaishnavi Palanisamy', gender: 'F', department_id: 'ECE', department_name: 'Electronics and Communication Engineering', batch: '2021-2025', cgpa: 8.40, attendance_pct: 87.5, email: 'vaishnavi.p@psgitech.ac.in', phone: '9840123427', placement_status: 'Placed' },

  // EEE Department (10 students)
  { student_id: 'PSG21EE001', name: 'Abishek Murugesan', gender: 'M', department_id: 'EEE', department_name: 'Electrical and Electronics Engineering', batch: '2021-2025', cgpa: 8.30, attendance_pct: 85.0, email: 'abishek.m@psgitech.ac.in', phone: '9840123428', placement_status: 'Placed' },
  { student_id: 'PSG21EE002', name: 'Divyabharathi Chelliah', gender: 'F', department_id: 'EEE', department_name: 'Electrical and Electronics Engineering', batch: '2021-2025', cgpa: 8.90, attendance_pct: 92.0, email: 'divya.c@psgitech.ac.in', phone: '9840123429', placement_status: 'Placed' },
  { student_id: 'PSG21EE003', name: 'Gokulakrishnan Radhakrishnan', gender: 'M', department_id: 'EEE', department_name: 'Electrical and Electronics Engineering', batch: '2021-2025', cgpa: 7.40, attendance_pct: 79.0, email: 'gokul.r@psgitech.ac.in', phone: '9840123430', placement_status: 'In Process' },
  { student_id: 'PSG21EE004', name: 'Janani Thirunavukkarasu', gender: 'F', department_id: 'EEE', department_name: 'Electrical and Electronics Engineering', batch: '2021-2025', cgpa: 9.15, attendance_pct: 94.0, email: 'janani.t@psgitech.ac.in', phone: '9840123431', placement_status: 'Placed' },
  { student_id: 'PSG21EE005', name: 'Kishore Kumar', gender: 'M', department_id: 'EEE', department_name: 'Electrical and Electronics Engineering', batch: '2021-2025', cgpa: 7.05, attendance_pct: 72.0, email: 'kishore.k@psgitech.ac.in', phone: '9840123432', placement_status: 'Not Placed' },
  { student_id: 'PSG21EE006', name: 'Madhumitha Swaminathan', gender: 'F', department_id: 'EEE', department_name: 'Electrical and Electronics Engineering', batch: '2021-2025', cgpa: 8.75, attendance_pct: 89.5, email: 'madhu.s@psgitech.ac.in', phone: '9840123433', placement_status: 'Placed' },
  { student_id: 'PSG21EE007', name: 'Naveenkumar Boopathi', gender: 'M', department_id: 'EEE', department_name: 'Electrical and Electronics Engineering', batch: '2021-2025', cgpa: 8.15, attendance_pct: 83.5, email: 'naveen.b@psgitech.ac.in', phone: '9840123434', placement_status: 'Placed' },
  { student_id: 'PSG21EE008', name: 'Poornima Dharmaraj', gender: 'F', department_id: 'EEE', department_name: 'Electrical and Electronics Engineering', batch: '2021-2025', cgpa: 8.50, attendance_pct: 88.0, email: 'poornima.d@psgitech.ac.in', phone: '9840123435', placement_status: 'Placed' },
  { student_id: 'PSG21EE009', name: 'Saran Rajendran', gender: 'M', department_id: 'EEE', department_name: 'Electrical and Electronics Engineering', batch: '2021-2025', cgpa: 7.60, attendance_pct: 80.0, email: 'saran.r@psgitech.ac.in', phone: '9840123436', placement_status: 'In Process' },
  { student_id: 'PSG21EE010', name: 'Yamini Soundar', gender: 'F', department_id: 'EEE', department_name: 'Electrical and Electronics Engineering', batch: '2021-2025', cgpa: 9.00, attendance_pct: 91.0, email: 'yamini.s@psgitech.ac.in', phone: '9840123437', placement_status: 'Placed' },

  // IT Department (12 students)
  { student_id: 'PSG21IT001', name: 'Ajith Velumani', gender: 'M', department_id: 'IT', department_name: 'Information Technology', batch: '2021-2025', cgpa: 8.95, attendance_pct: 92.0, email: 'ajith.v@psgitech.ac.in', phone: '9840123438', placement_status: 'Placed' },
  { student_id: 'PSG21IT002', name: 'Archana Ramasamy', gender: 'F', department_id: 'IT', department_name: 'Information Technology', batch: '2021-2025', cgpa: 9.35, attendance_pct: 95.5, email: 'archana.r@psgitech.ac.in', phone: '9840123439', placement_status: 'Placed' },
  { student_id: 'PSG21IT003', name: 'Dinesh Balaji', gender: 'M', department_id: 'IT', department_name: 'Information Technology', batch: '2021-2025', cgpa: 7.85, attendance_pct: 82.5, email: 'dinesh.b@psgitech.ac.in', phone: '9840123440', placement_status: 'Placed' },
  { student_id: 'PSG21IT004', name: 'Gayathri Kandasamy', gender: 'F', department_id: 'IT', department_name: 'Information Technology', batch: '2021-2025', cgpa: 8.55, attendance_pct: 89.0, email: 'gayathri.k@psgitech.ac.in', phone: '9840123441', placement_status: 'Placed' },
  { student_id: 'PSG21IT005', name: 'Hariharan Thangadurai', gender: 'M', department_id: 'IT', department_name: 'Information Technology', batch: '2021-2025', cgpa: 8.70, attendance_pct: 87.0, email: 'hari.t@psgitech.ac.in', phone: '9840123442', placement_status: 'Placed' },
  { student_id: 'PSG21IT006', name: 'Keerthana Selvaraj', gender: 'F', department_id: 'IT', department_name: 'Information Technology', batch: '2021-2025', cgpa: 9.50, attendance_pct: 96.0, email: 'keerthana.s@psgitech.ac.in', phone: '9840123443', placement_status: 'Placed' },
  { student_id: 'PSG21IT007', name: 'Mithun Vignesh', gender: 'M', department_id: 'IT', department_name: 'Information Technology', batch: '2021-2025', cgpa: 7.30, attendance_pct: 75.0, email: 'mithun.v@psgitech.ac.in', phone: '9840123444', placement_status: 'In Process' },
  { student_id: 'PSG21IT008', name: 'Nandhini Prakash', gender: 'F', department_id: 'IT', department_name: 'Information Technology', batch: '2021-2025', cgpa: 8.80, attendance_pct: 90.5, email: 'nandhini.p@psgitech.ac.in', phone: '9840123445', placement_status: 'Placed' },
  { student_id: 'PSG21IT009', name: 'Praveen Subramaniam', gender: 'M', department_id: 'IT', department_name: 'Information Technology', batch: '2021-2025', cgpa: 8.20, attendance_pct: 84.0, email: 'praveen.s@psgitech.ac.in', phone: '9840123446', placement_status: 'Placed' },
  { student_id: 'PSG21IT010', name: 'Sandhya Gurusamy', gender: 'F', department_id: 'IT', department_name: 'Information Technology', batch: '2021-2025', cgpa: 9.10, attendance_pct: 93.0, email: 'sandhya.g@psgitech.ac.in', phone: '9840123447', placement_status: 'Placed' },
  { student_id: 'PSG21IT011', name: 'Vasanth Meganathan', gender: 'M', department_id: 'IT', department_name: 'Information Technology', batch: '2021-2025', cgpa: 6.75, attendance_pct: 69.5, email: 'vasanth.m@psgitech.ac.in', phone: '9840123448', placement_status: 'Not Placed' },
  { student_id: 'PSG21IT012', name: 'Vinodhini Jayachandran', gender: 'F', department_id: 'IT', department_name: 'Information Technology', batch: '2021-2025', cgpa: 8.65, attendance_pct: 88.5, email: 'vinodhini.j@psgitech.ac.in', phone: '9840123449', placement_status: 'Placed' },

  // MECH Department (11 students)
  { student_id: 'PSG21ME001', name: 'Akilesh Parthiban', gender: 'M', department_id: 'MECH', department_name: 'Mechanical Engineering', batch: '2021-2025', cgpa: 8.40, attendance_pct: 86.0, email: 'akilesh.p@psgitech.ac.in', phone: '9840123450', placement_status: 'Placed' },
  { student_id: 'PSG21ME002', name: 'Balakumaran Muthusamy', gender: 'M', department_id: 'MECH', department_name: 'Mechanical Engineering', batch: '2021-2025', cgpa: 7.90, attendance_pct: 81.0, email: 'bala.m@psgitech.ac.in', phone: '9840123451', placement_status: 'In Process' },
  { student_id: 'PSG21ME003', name: 'Deepan Chakkaravarthy', gender: 'M', department_id: 'MECH', department_name: 'Mechanical Engineering', batch: '2021-2025', cgpa: 8.60, attendance_pct: 89.0, email: 'deepan.c@psgitech.ac.in', phone: '9840123452', placement_status: 'Placed' },
  { student_id: 'PSG21ME004', name: 'Elango Dharmalingam', gender: 'M', department_id: 'MECH', department_name: 'Mechanical Engineering', batch: '2021-2025', cgpa: 6.90, attendance_pct: 70.0, email: 'elango.d@psgitech.ac.in', phone: '9840123453', placement_status: 'Not Placed' },
  { student_id: 'PSG21ME005', name: 'Gopinath Loganathan', gender: 'M', department_id: 'MECH', department_name: 'Mechanical Engineering', batch: '2021-2025', cgpa: 8.10, attendance_pct: 83.5, email: 'gopi.l@psgitech.ac.in', phone: '9840123454', placement_status: 'Placed' },
  { student_id: 'PSG21ME006', name: 'Kaviarasu Sundaram', gender: 'M', department_id: 'MECH', department_name: 'Mechanical Engineering', batch: '2021-2025', cgpa: 8.75, attendance_pct: 90.0, email: 'kavi.s@psgitech.ac.in', phone: '9840123455', placement_status: 'Placed' },
  { student_id: 'PSG21ME007', name: 'Manikandan Veerappan', gender: 'M', department_id: 'MECH', department_name: 'Mechanical Engineering', batch: '2021-2025', cgpa: 7.25, attendance_pct: 76.0, email: 'mani.v@psgitech.ac.in', phone: '9840123456', placement_status: 'In Process' },
  { student_id: 'PSG21ME008', name: 'Nitheeshwar Veluchamy', gender: 'M', department_id: 'MECH', department_name: 'Mechanical Engineering', batch: '2021-2025', cgpa: 9.00, attendance_pct: 92.5, email: 'nitheesh.v@psgitech.ac.in', phone: '9840123457', placement_status: 'Placed' },
  { student_id: 'PSG21ME009', name: 'Praveenkumar Marimuthu', gender: 'M', department_id: 'MECH', department_name: 'Mechanical Engineering', batch: '2021-2025', cgpa: 8.35, attendance_pct: 85.0, email: 'praveen.m@psgitech.ac.in', phone: '9840123458', placement_status: 'Placed' },
  { student_id: 'PSG21ME010', name: 'Srinivasan Ramanujam', gender: 'M', department_id: 'MECH', department_name: 'Mechanical Engineering', batch: '2021-2025', cgpa: 8.85, attendance_pct: 91.0, email: 'srini.r@psgitech.ac.in', phone: '9840123459', placement_status: 'Higher Studies' },
  { student_id: 'PSG21ME011', name: 'Vijay Anand', gender: 'M', department_id: 'MECH', department_name: 'Mechanical Engineering', batch: '2021-2025', cgpa: 7.70, attendance_pct: 78.0, email: 'vijay.a@psgitech.ac.in', phone: '9840123460', placement_status: 'In Process' },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = INITIAL_STUDENTS.map((s, index) => {
  const hoursAttended = Math.round((s.attendance_pct / 100) * 450);
  return {
    attendance_id: `ATT2024_${(index + 1).toString().padStart(4, '0')}`,
    student_id: s.student_id,
    student_name: s.name,
    department_id: s.department_id,
    date: '2024-10-31',
    academic_year: '2024-2025',
    semester: 7,
    hours_attended: hoursAttended,
    total_hours: 450,
    percentage: s.attendance_pct,
    status: s.attendance_pct >= 75 ? 'Present' : 'Absent',
  };
});

export const INITIAL_EXAMS: ExamRecord[] = INITIAL_STUDENTS.map((s, index) => {
  const internal = Math.min(20, Math.round((s.cgpa / 10) * 20));
  const external = Math.min(80, Math.round((s.cgpa / 10) * 80));
  const total = internal + external;
  let grade: ExamRecord['grade'] = 'B';
  if (total >= 91) grade = 'O';
  else if (total >= 81) grade = 'A+';
  else if (total >= 71) grade = 'A';
  else if (total >= 61) grade = 'B+';
  else if (total < 50) grade = 'RA';

  const subMap: Record<string, { code: string; name: string }> = {
    CSE: { code: 'CS8791', name: 'Cloud Computing & Data Warehousing' },
    ECE: { code: 'EC8701', name: 'Antennas and Microwave Engineering' },
    EEE: { code: 'EE8701', name: 'Power System Operation and Control' },
    IT: { code: 'IT8791', name: 'Information Storage and Management' },
    MECH: { code: 'ME8792', name: 'Power Plant Engineering' },
  };

  const sub = subMap[s.department_id] || { code: 'GE8077', name: 'Total Quality Management' };

  return {
    exam_id: `EXM2024_${(index + 1).toString().padStart(4, '0')}`,
    student_id: s.student_id,
    student_name: s.name,
    department_id: s.department_id,
    academic_year: '2024-2025',
    semester: 7,
    subject_code: sub.code,
    subject_name: sub.name,
    internal_marks: internal,
    external_marks: external,
    total_marks: total,
    grade,
    credits: 3,
  };
});

export const INITIAL_PLACEMENTS: PlacementRecord[] = [
  { placement_id: 'PLC2024_001', student_id: 'PSG21CS001', student_name: 'Aakash Sundararajan', department_id: 'CSE', academic_year: '2024-2025', company_name: 'Zoho Corporation', role: 'Software Development Engineer', package_lpa: 8.5, offer_type: 'Dream', interview_rounds: 4, status: 'Selected' },
  { placement_id: 'PLC2024_002', student_id: 'PSG21CS002', student_name: 'Abirami Ramanathan', department_id: 'CSE', academic_year: '2024-2025', company_name: 'Microsoft IDC', role: 'Cloud Solution Engineer', package_lpa: 21.0, offer_type: 'Dream', interview_rounds: 5, status: 'Selected' },
  { placement_id: 'PLC2024_003', student_id: 'PSG21CS003', student_name: 'Bharathwaj Kalyan', department_id: 'CSE', academic_year: '2024-2025', company_name: 'Cisco Systems', role: 'Software Engineer - Networking', package_lpa: 14.5, offer_type: 'Dream', interview_rounds: 4, status: 'Selected' },
  { placement_id: 'PLC2024_004', student_id: 'PSG21CS005', student_name: 'Dharani Selvaganapathy', department_id: 'CSE', academic_year: '2024-2025', company_name: 'SAP Labs', role: 'Developer Associate', package_lpa: 12.0, offer_type: 'Dream', interview_rounds: 4, status: 'Selected' },
  { placement_id: 'PLC2024_005', student_id: 'PSG21CS007', student_name: 'Harini Balasubramanian', department_id: 'CSE', academic_year: '2024-2025', company_name: 'Amazon Web Services', role: 'Solutions Architect', package_lpa: 24.0, offer_type: 'Dream', interview_rounds: 5, status: 'Selected' },
  { placement_id: 'PLC2024_006', student_id: 'PSG21CS008', student_name: 'Jaganathan Natarajan', department_id: 'CSE', academic_year: '2024-2025', company_name: 'Cognizant', role: 'Programmer Analyst', package_lpa: 5.5, offer_type: 'Regular', interview_rounds: 3, status: 'Selected' },
  { placement_id: 'PLC2024_007', student_id: 'PSG21CS009', student_name: 'Kavitha Krishnamoorthy', department_id: 'CSE', academic_year: '2024-2025', company_name: 'Thoughtworks', role: 'Application Developer', package_lpa: 10.5, offer_type: 'Tier-1', interview_rounds: 4, status: 'Selected' },
  { placement_id: 'PLC2024_008', student_id: 'PSG21CS011', student_name: 'Manojkumar Rajendran', department_id: 'CSE', academic_year: '2024-2025', company_name: 'TCS Digital', role: 'Systems Engineer', package_lpa: 7.2, offer_type: 'Tier-1', interview_rounds: 3, status: 'Selected' },
  { placement_id: 'PLC2024_009', student_id: 'PSG21CS012', student_name: 'Naveen Chandrasekar', department_id: 'CSE', academic_year: '2024-2025', company_name: 'Oracle India', role: 'Member Technical Staff', package_lpa: 16.0, offer_type: 'Dream', interview_rounds: 4, status: 'Selected' },
  { placement_id: 'PLC2024_010', student_id: 'PSG21CS013', student_name: 'Pavithra Subramanian', department_id: 'CSE', academic_year: '2024-2025', company_name: 'Accenture Advanced', role: 'Software Engineer', package_lpa: 6.5, offer_type: 'Regular', interview_rounds: 3, status: 'Selected' },
  { placement_id: 'PLC2024_011', student_id: 'PSG21CS015', student_name: 'Sneha Muthukumar', department_id: 'CSE', academic_year: '2024-2025', company_name: 'Qualcomm', role: 'Embedded Software Engineer', package_lpa: 18.0, offer_type: 'Dream', interview_rounds: 4, status: 'Selected' },
  { placement_id: 'PLC2024_012', student_id: 'PSG21EC001', student_name: 'Anirudh Raghavan', department_id: 'ECE', academic_year: '2024-2025', company_name: 'Texas Instruments', role: 'Analog Design Engineer', package_lpa: 17.5, offer_type: 'Dream', interview_rounds: 5, status: 'Selected' },
  { placement_id: 'PLC2024_013', student_id: 'PSG21EC002', student_name: 'Bhavana Soundarrajan', department_id: 'ECE', academic_year: '2024-2025', company_name: 'Robert Bosch', role: 'Automotive Embedded Engineer', package_lpa: 9.0, offer_type: 'Tier-1', interview_rounds: 4, status: 'Selected' },
  { placement_id: 'PLC2024_014', student_id: 'PSG21EC004', student_name: 'Deepika Mohanraj', department_id: 'ECE', academic_year: '2024-2025', company_name: 'L&T Technology Services', role: 'Systems Engineer', package_lpa: 6.0, offer_type: 'Regular', interview_rounds: 3, status: 'Selected' },
  { placement_id: 'PLC2024_015', student_id: 'PSG21EC007', student_name: 'Karthikeyan Shanmugam', department_id: 'ECE', academic_year: '2024-2025', company_name: 'Cadence Design Systems', role: 'VLSI Verification Engineer', package_lpa: 15.0, offer_type: 'Dream', interview_rounds: 4, status: 'Selected' },
  { placement_id: 'PLC2024_016', student_id: 'PSG21IT001', student_name: 'Ajith Velumani', department_id: 'IT', academic_year: '2024-2025', company_name: 'Freshworks', role: 'Backend Engineer', package_lpa: 11.0, offer_type: 'Tier-1', interview_rounds: 4, status: 'Selected' },
  { placement_id: 'PLC2024_017', student_id: 'PSG21IT002', student_name: 'Archana Ramasamy', department_id: 'IT', academic_year: '2024-2025', company_name: 'Goldman Sachs', role: 'Technology Analyst', package_lpa: 22.0, offer_type: 'Dream', interview_rounds: 5, status: 'Selected' },
  { placement_id: 'PLC2024_018', student_id: 'PSG21ME001', student_name: 'Akilesh Parthiban', department_id: 'MECH', academic_year: '2024-2025', company_name: 'Larsen & Toubro', role: 'Graduate Engineer Trainee', package_lpa: 7.0, offer_type: 'Tier-1', interview_rounds: 3, status: 'Selected' },
];

export const INITIAL_FACULTY: FacultyRecord[] = [
  { faculty_id: 'FAC001', name: 'Dr. R. Manimegalai', department_id: 'CSE', designation: 'Professor', experience_years: 22, specialization: 'Distributed Systems & Data Warehousing' },
  { faculty_id: 'FAC002', name: 'Dr. P. Vetrivelan', department_id: 'ECE', designation: 'Professor', experience_years: 19, specialization: 'Embedded IoT & Signal Processing' },
  { faculty_id: 'FAC003', name: 'Dr. C. S. Subhash Kumar', department_id: 'EEE', designation: 'Professor', experience_years: 18, specialization: 'Smart Grids & Power Electronics' },
  { faculty_id: 'FAC004', name: 'Dr. K. Umamaheswari', department_id: 'IT', designation: 'Professor', experience_years: 20, specialization: 'Big Data Analytics & Cloud Storage' },
  { faculty_id: 'FAC005', name: 'Dr. S. Jayakumar', department_id: 'MECH', designation: 'Professor', experience_years: 24, specialization: 'Thermal Engineering & CFD Modeling' },
];

export const INITIAL_CONFIG: ServerConfig = {
  serverName: 'PSG-ITECH-DW-CLUSTER-01',
  os: 'Enterprise Linux 9.2 (x86_64)',
  cpuCores: 16,
  cpuUtilization: 38,
  ramTotalGb: 64,
  ramAllocatedGb: 48,
  ramBufferPoolMb: 16384,
  storageTotalGb: 2048,
  storageAllocatedGb: 1536,
  storageUsedGb: 820,
  maxConnections: 250,
  walMode: 'NORMAL',
  compressionEnabled: true,
};

export const INITIAL_SCHEDULED_JOBS: ScheduledJob[] = [
  {
    id: 'JOB-ATT-001',
    name: 'Daily Biometric Attendance Sync',
    type: 'attendance_loading',
    frequency: 'Daily (Midnight)',
    time: '23:30',
    enabled: true,
    status: 'COMPLETED',
    lastRun: 'Yesterday, 23:30:12',
    nextRun: 'Today, 23:30:00',
    executionCount: 142,
    logs: [
      '[23:30:00] Initiating batch fetch from RFID / Biometric nodes...',
      '[23:30:04] 60 records extracted from campus gateway.',
      '[23:30:08] Transformed 60 records: calculated attendance percentages.',
      '[23:30:12] Loaded into Fact_Attendance. Zero errors encountered.'
    ]
  },
  {
    id: 'JOB-EXAM-002',
    name: 'End-Semester Exam Result ETL',
    type: 'exam_loading',
    frequency: 'Monthly',
    time: '02:00',
    enabled: true,
    status: 'IDLE',
    lastRun: '15 days ago',
    nextRun: 'In 15 days, 02:00:00',
    executionCount: 12,
    logs: ['[02:00:00] End-semester controller database synced. 60 grade records loaded.']
  },
  {
    id: 'JOB-PLC-003',
    name: 'Campus Placement Offer Consolidation',
    type: 'placement_loading',
    frequency: 'Weekly',
    time: '06:00',
    enabled: true,
    status: 'IDLE',
    lastRun: '3 days ago',
    nextRun: 'In 4 days, 06:00:00',
    executionCount: 28,
    logs: ['[06:00:00] Extracted 18 verified company offer letters from Placement Portal.']
  },
  {
    id: 'JOB-BAK-004',
    name: 'Automated Snapshot Full Backup',
    type: 'backup',
    frequency: 'Daily (Midnight)',
    time: '01:00',
    enabled: true,
    status: 'COMPLETED',
    lastRun: 'Today, 01:00:05',
    nextRun: 'Tomorrow, 01:00:00',
    executionCount: 365,
    logs: [
      '[01:00:00] Backup manager snapshot invoked.',
      '[01:00:03] Cold snapshot written: size 148.2 MB.',
      '[01:00:05] SHA256 checksum verified. Snapshot marked resilient.'
    ]
  },
  {
    id: 'JOB-REP-005',
    name: 'Anna University Accreditation Summary Generator',
    type: 'report_generation',
    frequency: 'Monthly',
    time: '04:00',
    enabled: false,
    status: 'IDLE',
    lastRun: '30 days ago',
    nextRun: 'Disabled',
    executionCount: 8,
    logs: ['[04:00:00] NBA/NAAC Metric Summary generated and stored in summary partition.']
  }
];

export const INITIAL_USERS: SimulatedUser[] = [
  {
    id: 'usr-1',
    username: 'dw_superadmin',
    role: 'DB_ADMIN',
    permissions: { select: true, insert: true, update: true, delete: true },
  },
  {
    id: 'usr-2',
    username: 'naac_analyst',
    role: 'DATA_ANALYST',
    permissions: { select: true, insert: false, update: false, delete: false },
  },
  {
    id: 'usr-3',
    username: 'hod_cse_portal',
    role: 'DEPT_VIEWER',
    permissions: { select: true, insert: true, update: false, delete: false },
  },
  {
    id: 'usr-4',
    username: 'guest_auditor',
    role: 'RESTRICTED_GUEST',
    permissions: { select: false, insert: false, update: false, delete: false },
  },
];

// Sample CSV raw text files for ETL simulation
export const RAW_CSV_DATASETS = {
  attendance_batch_valid: `student_id,date,hours_attended,total_hours
PSG21CS001,2024-11-01,7,7
PSG21CS002,2024-11-01,7,7
PSG21CS003,2024-11-01,6,7
PSG21CS004,2024-11-01,7,7
PSG21EC001,2024-11-01,5,7
PSG21IT001,2024-11-01,7,7
PSG21ME001,2024-11-01,7,7`,

  attendance_batch_dirty: `student_id,date,hours_attended,total_hours
PSG21CS001,2024-11-01,7,7
PSG21CS001,2024-11-01,7,7
INVALID_ID_999,2024-11-01,6,7
PSG21CS006,2024-11-01,,7
PSG21EC005,2024-11-01,9,7
PSG21IT011,2024-11-01,0,7
PSG21ME004,2024-11-01,5,7`,

  placement_batch_new: `student_id,company_name,package_lpa,offer_type
PSG21CS004,Infosys,4.5,Regular
PSG21CS010,Wipro Digital,6.5,Tier-1
PSG21EC003,TCS Ninja,3.8,Regular
PSG21IT007,Cognizant GenC Next,6.8,Tier-1
PSG21ME002,Tata Motors,7.5,Tier-1`,

  student_batch_dirty: `student_id,name,gender,department_id,cgpa,attendance_pct
PSG21CS099,Vigneshwaran K,M,cse,8.20,85.0
PSG21CS099,Vigneshwaran K,M,cse,8.20,85.0
PSG21EC098,Sandhiya Devi,F,ELECTRONICS,9.10,92.0
PSG21EE097,Karthik Raja,M,EEE,14.50,75.0
PSG21IT096,Unknown Candidate,M,,7.40,68.0
PSG21ME095,Prabakaran S,M,MECH,8.00,120.0`
};

export const EDUCATIONAL_CONCEPTS: Record<string, EducationalConcept> = {
  config: {
    managerId: 'config',
    managerName: 'System Configuration Manager',
    category: 'System Management',
    definition: 'Controls the physical, logical, and resource allocation settings of the Data Warehouse hardware and DBMS instance.',
    purpose: 'Ensures the DW has sufficient memory buffer pool, CPU threads, and storage partitions to handle heavy ETL batches and complex analytical OLAP queries without crashing.',
    keyResponsibilities: [
      'Manage CPU allocation and thread concurrency.',
      'Configure RAM Buffer Pool and Cache size for in-memory joins.',
      'Allocate storage volumes and track disk usage thresholds.',
      'Enable compression and Write-Ahead Logging (WAL) levels.'
    ],
    realWorldExample: 'Scaling RAM buffer from 16 GB to 48 GB before running semester result consolidation to prevent swapping to disk.',
    differenceFromRelated: 'Database Manager handles relational schemas & users, while Configuration Manager handles hardware limits, server memory, and storage allocation.',
    oneLineTakeaway: 'The hardware and resource pilot that ensures the warehouse never runs out of disk or memory.',
    annaUnivTopic: 'Unit IV: Data Warehouse Operations - Server Configuration & Resource Management',
    quizQuestions: [
      {
        question: 'What happens when the DW storage utilization exceeds 95%?',
        options: ['Queries run faster', 'ETL write jobs stall and throw storage failure exceptions', 'Tables auto-delete', 'RAM doubles automatically'],
        correctIndex: 1,
        explanation: 'When storage is exhausted, write transactions (ETL inserts) are aborted by the database engine to protect file system integrity.'
      },
      {
        question: 'Why is the Buffer Pool allocation crucial in Data Warehousing?',
        options: ['It changes the CSS colors', 'It holds frequently accessed fact and dimension pages in RAM to minimize disk I/O', 'It stores user passwords', 'It backs up data to tape'],
        correctIndex: 1,
        explanation: 'OLAP queries scan millions of rows; caching fact blocks in the RAM buffer pool reduces expensive physical disk reads by up to 90%.'
      }
    ]
  },
  scheduling: {
    managerId: 'scheduling',
    managerName: 'System Scheduling Manager',
    category: 'System Management',
    definition: 'Automates and orchestrates the timely execution of periodic ETL pipelines, warehouse maintenance, aggregations, and backups.',
    purpose: 'Prevents daytime operational slowdown by executing heavy batch loads (such as midnight attendance sync or month-end grades) during low-traffic maintenance windows.',
    keyResponsibilities: [
      'Define cron triggers (Daily, Weekly, Monthly) for load jobs.',
      'Coordinate dependency chains (e.g. Extract must finish before Load starts).',
      'Track execution status (Pending, Running, Succeeded, Failed).',
      'Provide manual trigger overrides for urgent ad-hoc loads.'
    ],
    realWorldExample: 'Scheduling the college attendance ETL to trigger every night at 23:30 after biometric campus sync closes.',
    differenceFromRelated: 'Load Manager does the actual data parsing & transformation; Scheduling Manager decides WHEN and in what ORDER the job runs.',
    oneLineTakeaway: 'The clockwork engine ensuring batch processing happens seamlessly without manual human intervention.',
    annaUnivTopic: 'Unit IV: Process Management - Scheduling Batch Processing & Maintenance',
    quizQuestions: [
      {
        question: 'Why should heavy Data Warehouse load jobs be scheduled at midnight?',
        options: ['Because computers work better in the cold', 'To avoid contending for CPU and disk I/O with daytime business analysts', 'Electricity is free at night', 'To hide errors from users'],
        correctIndex: 1,
        explanation: 'Batch loading locks tables or consumes significant I/O; scheduling it in off-peak hours guarantees optimal query response for daytime users.'
      },
      {
        question: 'What is a job dependency in the Scheduling Manager?',
        options: ['A bug in the software', 'Ensuring Job B only runs after Job A successfully completes', 'A job that runs infinitely', 'A job that requires internet'],
        correctIndex: 1,
        explanation: 'For instance, fact aggregation summaries cannot run until the underlying base fact table load has finished successfully.'
      }
    ]
  },
  event: {
    managerId: 'event',
    managerName: 'System Event Manager',
    category: 'System Management',
    definition: 'The centralized logging and alerting nerve center that records all operational activities, alerts, warnings, and failures across the warehouse.',
    purpose: 'Provides administrators instant visibility into job crashes, disk full warnings, ETL format rejections, and unauthorized query attempts.',
    keyResponsibilities: [
      'Ingest operational telemetry from all other 9 managers.',
      'Categorize events into Information, Warning, Error, and Critical.',
      'Alert administrators with recommended mitigation actions.',
      'Maintain an immutable audit trail for governance and accreditation compliance.'
    ],
    realWorldExample: 'Alerting the DBA when an ETL job rejects 15 student records due to invalid department foreign keys.',
    differenceFromRelated: 'Testing Manager tests data quality rules; Event Manager logs runtime system alerts and audit logs generated by any manager.',
    oneLineTakeaway: 'The black box recorder and alarm system keeping the administrator aware of everything.',
    annaUnivTopic: 'Unit IV: Warehouse Administration - Event Logging, Alerting & Audit Trails',
    quizQuestions: [
      {
        question: 'Which severity level should be assigned when the primary warehouse database crashes?',
        options: ['Information', 'Warning', 'Critical', 'Notice'],
        correctIndex: 2,
        explanation: 'System unavailability directly halts analytical queries and ETL pipelines, demanding immediate Critical incident response.'
      },
      {
        question: 'Why is an audit trail necessary in an educational institution DW?',
        options: ['To occupy free hard drive space', 'To verify when examination records were loaded and who modified configurations', 'To speed up graphics rendering', 'To compile TypeScript'],
        correctIndex: 1,
        explanation: 'Audit trails ensure institutional accountability, verifying that exam marks and attendance figures are tamper-proof and traceable.'
      }
    ]
  },
  database: {
    managerId: 'database',
    managerName: 'System Database Manager',
    category: 'System Management',
    definition: 'Administers the underlying relational DBMS engines, catalogs, schemas, tables, metadata dictionaries, and role-based access security.',
    purpose: 'Maintains table structures, verifies referential integrity, and enforces strict access boundaries so students cannot edit exam marks.',
    keyResponsibilities: [
      'Manage catalogs, schemas, tables, and column data types.',
      'Display physical and logical storage statistics.',
      'Enforce Role-Based Access Control (RBAC): SELECT, INSERT, UPDATE, DELETE.',
      'Prevent unauthorized schema alterations.'
    ],
    realWorldExample: 'Granting read-only SELECT permissions to college NAAC accreditation auditors while keeping DDL changes restricted to DBA.',
    differenceFromRelated: 'Warehouse Manager organizes multidimensional cubes & star schemas; Database Manager manages raw relational tables, storage, and user credentials.',
    oneLineTakeaway: 'The gatekeeper of physical tables, metadata dictionaries, and database security roles.',
    annaUnivTopic: 'Unit IV: Data Warehouse System Management - Database Administration & Security',
    quizQuestions: [
      {
        question: 'If a user has only SELECT permission on Fact_Examination, what happens if they execute an INSERT query?',
        options: ['The record is inserted anyway', 'The query is rejected with a Permission Denied error', 'The database resets', 'The computer reboots'],
        correctIndex: 1,
        explanation: 'Database Manager RBAC rules strictly prohibit write operations for read-only roles to protect historical data integrity.'
      },
      {
        question: 'What is stored in the Data Warehouse Metadata Repository?',
        options: ['Movie files', 'Schema definitions, column types, source-to-target mappings, and lineage', 'Only user passwords', 'CSS style sheets'],
        correctIndex: 1,
        explanation: 'Metadata is data about data—describing table definitions, data types, ETL origins, and refresh timestamps.'
      }
    ]
  },
  backup: {
    managerId: 'backup',
    managerName: 'System Backup Recovery Manager',
    category: 'System Management',
    definition: 'Creates scheduled and ad-hoc snapshots of the data warehouse state and orchestrates rapid point-in-time disaster recovery.',
    purpose: 'Guarantees disaster resilience against hardware crashes, accidental data deletion, ransomware, or corruption during bulk loads.',
    keyResponsibilities: [
      'Generate full and incremental snapshot backups.',
      'Maintain catalog of recovery points with timestamps and record counts.',
      'Simulate system failure / crash scenarios to test disaster readiness.',
      'Perform point-in-time restoration back to a known clean state.'
    ],
    realWorldExample: 'Restoring the warehouse state from the 01:00 AM snapshot after an intern accidentally ran a DROP TABLE command.',
    differenceFromRelated: 'Configuration Manager adjusts live memory/storage; Backup Recovery Manager takes persistent snapshots and restores them after catastrophes.',
    oneLineTakeaway: 'The life insurance policy of the data warehouse that reverses catastrophic losses.',
    annaUnivTopic: 'Unit IV: System Administration - Backup Strategies & Disaster Recovery',
    quizQuestions: [
      {
        question: 'Why should a database snapshot be created before performing a major ETL batch?',
        options: ['To double the size of the tables', 'To provide a guaranteed recovery point in case the ETL corrupts the warehouse', 'To make queries slower', 'Because it is required by CSS'],
        correctIndex: 1,
        explanation: 'If a transformation script fails halfway or introduces corrupted records, rolling back to the pre-ETL snapshot instantly restores data integrity.'
      },
      {
        question: 'What is RPO (Recovery Point Objective)?',
        options: ['The maximum acceptable age of data that can be lost when a failure occurs', 'The speed of the network router', 'The total number of students in college', 'The cost of hard drives'],
        correctIndex: 0,
        explanation: 'RPO defines how much historical data an organization can tolerate losing between the last backup and the crash timestamp.'
      }
    ]
  },
  load: {
    managerId: 'load',
    managerName: 'Load Manager',
    category: 'Process Management',
    definition: 'Executes the core ETL (Extract, Transform, Load) pipeline: ingests raw operational feeds, scrubs inconsistencies, and populates warehouse structures.',
    purpose: 'Bridges raw heterogenous departmental systems (CSV, ERP, Biometrics) into clean, standardized, unified warehouse tables.',
    keyResponsibilities: [
      'Extract data from disparate sources (flat files, CSV, OLTP databases).',
      'Transform: clean null values, deduplicate student IDs, normalize names.',
      'Enforce business validation rules (e.g. CGPA between 0 and 10).',
      'Load clean records into target fact and dimension tables.'
    ],
    realWorldExample: 'Converting department names like "cse", "CSE", "Comp Sci" into standardized "Computer Science and Engineering".',
    differenceFromRelated: 'Scheduling Manager controls timings; Load Manager does the heavy lifting of extracting, cleansing, transforming, and inserting records.',
    oneLineTakeaway: 'The refinery that turns raw, dirty departmental spreadsheets into clean analytical gold.',
    annaUnivTopic: 'Unit II & IV: ETL Architecture - Extraction, Transformation, Cleansing and Loading',
    quizQuestions: [
      {
        question: 'What is the primary danger of loading raw operational data directly into a warehouse without transformation?',
        options: ['It consumes too little memory', 'Dirty, duplicate, and null-laden data corrupts management analytics and decisions', 'It deletes the operating system', 'It changes the font size'],
        correctIndex: 1,
        explanation: 'Garbage in, garbage out. Without cleansing and normalization, executive reports produce misleading metrics and flawed conclusions.'
      },
      {
        question: 'What does the Load Manager do with records that fail validation?',
        options: ['Sends them to the recycle bin and reboots', 'Quarantines them into an error log / rejected table for human review', 'Silently pretends they were valid', 'Deletes the entire database'],
        correctIndex: 1,
        explanation: 'Industrial ETL engines write rejected rows into a bad-records file with rejection reasons, allowing DBAs to review and correct them.'
      }
    ]
  },
  warehouse: {
    managerId: 'warehouse',
    managerName: 'Warehouse Manager',
    category: 'Process Management',
    definition: 'Organizes data into multidimensional models (Star Schema, Snowflake Schema), manages partitioning strategies, and creates summary aggregations.',
    purpose: 'Transforms relational flat tables into intuitive dimensional models that enable slicing, dicing, drilling-down, and fast aggregation.',
    keyResponsibilities: [
      'Design and maintain Fact tables (measurements) and Dimension tables (context).',
      'Implement partitioning (e.g. by Academic Year) for partition-pruning speedup.',
      'Maintain materialized views and summary aggregation tables.',
      'Manage slowly changing dimensions and historical tracking.'
    ],
    realWorldExample: 'Partitioning Fact_Attendance by Academic Year (2021-22, 2022-23, 2023-24) so queries for 2024 only scan 25% of the data.',
    differenceFromRelated: 'Database Manager handles generic tables; Warehouse Manager structures them into Facts, Dimensions, Star Schemas, and OLAP Cubes.',
    oneLineTakeaway: 'The architect of Star Schemas, dimensional cubes, and performance partitions.',
    annaUnivTopic: 'Unit I & IV: Dimensional Modeling - Star Schema, Fact Constellation & Partitioning',
    quizQuestions: [
      {
        question: 'In the PSG iTech Star Schema, which table is a Fact table?',
        options: ['Dim_Student', 'Dim_Department', 'Fact_Attendance', 'Dim_Date'],
        correctIndex: 2,
        explanation: 'Fact tables contain measurable numeric metrics (hours attended, percentages) surrounded by dimension tables providing business context.'
      },
      {
        question: 'How does table partitioning improve query performance in a Data Warehouse?',
        options: ['By compressing the screen resolution', 'By allowing the query engine to prune and skip partitions outside the WHERE year clause', 'By removing all indexes', 'By converting numbers to strings'],
        correctIndex: 1,
        explanation: 'Partition pruning skips irrelevant year partitions completely, saving massive amounts of disk I/O and CPU scan time.'
      }
    ]
  },
  query: {
    managerId: 'query',
    managerName: 'Query Manager',
    category: 'Process Management',
    definition: 'The operational command center that accepts, parses, optimizes, and executes analytical SQL/OLAP queries against warehouse structures.',
    purpose: 'Empowers decision-makers (Principals, HODs, Deans) to ask ad-hoc questions and receive instantaneous analytical answers from millions of records.',
    keyResponsibilities: [
      'Parse SQL queries and validate syntax against metadata catalog.',
      'Generate execution plans and pass queries to the execution engine.',
      'Measure query execution time, memory usage, and row yields.',
      'Maintain query history, cached result sets, and export facilities.'
    ],
    realWorldExample: 'Executing a multi-table JOIN query to find all students with CGPA > 8.5 who have not yet secured a campus placement offer.',
    differenceFromRelated: 'Tuning Manager optimizes slow queries; Query Manager executes queries and delivers the actual data results to the user.',
    oneLineTakeaway: 'The query gateway connecting analytical SQL to warehouse data.',
    annaUnivTopic: 'Unit IV: Process Management - Query Management, Execution & Optimization',
    quizQuestions: [
      {
        question: 'What is the role of the SQL Query Parser in the Query Manager?',
        options: ['Validates SQL grammar and verifies that referenced tables and columns exist in the catalog', 'Draws charts on the screen', 'Deletes old records', 'Checks internet speed'],
        correctIndex: 0,
        explanation: 'The parser converts SQL text into an Abstract Syntax Tree (AST) while verifying table and column existence against metadata.'
      },
      {
        question: 'Why are Data Warehouse queries fundamentally different from OLTP banking queries?',
        options: ['DW queries are written in Latin', 'DW queries scan large volumes of historical data with aggregations (GROUP BY), while OLTP queries touch single rows', 'DW queries never use SELECT', 'OLTP queries cannot use WHERE'],
        correctIndex: 1,
        explanation: 'OLAP queries perform broad statistical scans over historical fact tables, whereas OLTP focuses on rapid single-row updates.'
      }
    ]
  },
  tuning: {
    managerId: 'tuning',
    managerName: 'Tuning Manager',
    category: 'Process Management',
    definition: 'Monitors query bottlenecks, analyzes execution plans, creates specialized indexes (B-Tree, Bitmap), and optimizes memory caching.',
    purpose: 'Drastically reduces query latency from minutes to milliseconds, ensuring dashboards and dean reports render instantly.',
    keyResponsibilities: [
      'Analyze query execution plans (Full Table Scan vs Index Scan).',
      'Create and manage B-Tree and Bitmap indexes.',
      'Simulate and benchmark query speed before and after optimization.',
      'Tune buffer cache hit ratios and storage cluster keys.'
    ],
    realWorldExample: 'Creating a Bitmap Index on department_id and gender, speeding up filtered demographic queries by 4.2x.',
    differenceFromRelated: 'Query Manager just runs whatever SQL is sent; Tuning Manager analyzes bottlenecks and constructs indexes to make future queries fly.',
    oneLineTakeaway: 'The performance mechanic that supercharges slow queries with indexes and optimization plans.',
    annaUnivTopic: 'Unit IV: Tuning and Testing the Data Warehouse - Indexing Strategies & Query Optimization',
    quizQuestions: [
      {
        question: 'When is a Bitmap Index preferred over a B-Tree Index in a Data Warehouse?',
        options: ['When a column has low cardinality (few distinct values like Gender or Department)', 'When a column has unique values like Aadhaar number', 'When the table has only 1 row', 'Never, Bitmap indexes are obsolete'],
        correctIndex: 0,
        explanation: 'Bitmap indexes are ideal for low-cardinality columns (Gender, Dept, Placed/Unplaced) and allow ultra-fast bitwise AND/OR operations in OLAP.'
      },
      {
        question: 'What is a "Full Table Scan" in an un-tuned Data Warehouse?',
        options: ['Scanning every page on physical disk from beginning to end to find matching rows', 'Scanning the computer for viruses', 'Printing the table on paper', 'Restarting the database'],
        correctIndex: 0,
        explanation: 'Without indexes, the engine must read every single block on disk, causing heavy I/O and slow performance.'
      }
    ]
  },
  testing: {
    managerId: 'testing',
    managerName: 'Testing Manager',
    category: 'Process Management',
    definition: 'Performs data quality validation, source-to-target reconciliation, completeness checks, and integrity constraint verification.',
    purpose: 'Ensures that 100% of source records are accurately accounted for and that no phantom duplicates or orphaned records pollute executive reports.',
    keyResponsibilities: [
      'Reconcile source system record count against warehouse table count.',
      'Detect missing records, duplicated primary keys, and unexpected nulls.',
      'Verify referential integrity (foreign keys pointing to existing students/departments).',
      'Run automated regression test suites and generate verification certificates.'
    ],
    realWorldExample: 'Catching a discrepancy where the source college portal had 60 students but the warehouse only had 55 due to an ETL filtering bug.',
    differenceFromRelated: 'Event Manager logs what happened; Testing Manager actively inspects data contents to find logical flaws, missing rows, and discrepancies.',
    oneLineTakeaway: 'The quality inspector guaranteeing that warehouse metrics are 100% accurate, complete, and trustworthy.',
    annaUnivTopic: 'Unit IV: Tuning and Testing the Data Warehouse - Data Quality, Completeness & Reconciliation',
    quizQuestions: [
      {
        question: 'What is Source-to-Target Data Reconciliation?',
        options: ['Deleting source data after loading', 'Comparing source row counts and checksums against warehouse destination to prove no data was lost', 'Renaming tables to match', 'Translating SQL to Python'],
        correctIndex: 1,
        explanation: 'Reconciliation mathematically proves that every record extracted from operational sources made it completely into the warehouse.'
      },
      {
        question: 'What is an "Orphaned Foreign Key" in a Data Warehouse test?',
        options: ['A key without a password', 'A record in Fact_Examination referencing a student_id that does not exist in Dim_Student', 'A deleted database', 'A duplicate primary key'],
        correctIndex: 1,
        explanation: 'Orphaned keys violate referential integrity because facts cannot be joined with nonexistent dimension records.'
      }
    ]
  }
};
