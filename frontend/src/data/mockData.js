// ============================================================
// Kijani / EduTrack Enterprise - Mock Data
// ============================================================

export const currentUser = {
  name: 'Grace Nyerere',
  role: 'Registrar',
  email: 'grace.nyerere@kijani.edu',
  avatar: 'GN',
};

export const stats = {
  totalStudents: 1248,
  attendanceToday: 96.4,
  academicAverage: 78.6,
  feeCollection: 86.2,
  unpaidBalance: 412000,
  studentsNeedingAttention: 12,
};

export const attendanceTrend = [
  { day: 'Mon', value: 97.1 },
  { day: 'Tue', value: 96.8 },
  { day: 'Wed', value: 95.9 },
  { day: 'Thu', value: 96.4 },
  { day: 'Fri', value: 94.2 },
];

export const priorityInterventions = [
  { id: 1, student: 'Amina Yusuf', issue: '3 consecutive absences', priority: 'high', class: 'Form 3A' },
  { id: 2, student: 'James Okello', issue: 'Outstanding fees > 30 days', priority: 'high', class: 'Form 4B' },
  { id: 3, student: 'Fatuma Hassan', issue: 'Academic average dropped 12%', priority: 'medium', class: 'Form 2C' },
  { id: 4, student: 'David Mwangi', issue: 'Guardian contact failed', priority: 'medium', class: 'Form 1A' },
];

export const todaySchedule = [
  { id: 1, time: '08:00', subject: 'Mathematics', class: 'Form 3A', teacher: 'Mr. Kamau', status: 'in-progress', minsLeft: 18 },
  { id: 2, time: '09:30', subject: 'English Literature', class: 'Form 4B', teacher: 'Ms. Wanjiku', status: 'upcoming' },
  { id: 3, time: '11:00', subject: 'Biology Lab', class: 'Form 2C', teacher: 'Dr. Otieno', status: 'confirmed' },
  { id: 4, time: '13:30', subject: 'History', class: 'Form 3B', teacher: 'Mr. Juma', status: 'confirmed' },
];

export const students = [
  {
    id: 'STU-2024-0847',
    _id: '1',
    name: 'Amina Yusuf',
    email: 'amina.yusuf@student.kijani.edu',
    class: 'Form 3A',
    yearGroup: 'Year 11',
    gender: 'Female',
    attendance: 94.2,
    status: 'Active',
    feeBalance: 0,
    phone: '+255 712 345 678',
    age: 17,
    course: 'Sciences',
    enrollmentDate: '2023-01-15',
    avatar: 'AY',
  },
  {
    id: 'STU-2024-0921',
    _id: '2',
    name: 'James Okello',
    email: 'james.okello@student.kijani.edu',
    class: 'Form 4B',
    yearGroup: 'Year 12',
    gender: 'Male',
    attendance: 88.5,
    status: 'Active',
    feeBalance: 185000,
    phone: '+255 754 221 009',
    age: 18,
    course: 'Business',
    enrollmentDate: '2022-01-10',
    avatar: 'JO',
  },
  {
    id: 'STU-2024-1034',
    _id: '3',
    name: 'Fatuma Hassan',
    email: 'fatuma.hassan@student.kijani.edu',
    class: 'Form 2C',
    yearGroup: 'Year 10',
    gender: 'Female',
    attendance: 97.8,
    status: 'Active',
    feeBalance: 45000,
    phone: '+255 678 443 112',
    age: 16,
    course: 'Arts',
    enrollmentDate: '2024-01-20',
    avatar: 'FH',
  },
  {
    id: 'STU-2024-1156',
    _id: '4',
    name: 'David Mwangi',
    email: 'david.mwangi@student.kijani.edu',
    class: 'Form 1A',
    yearGroup: 'Year 9',
    gender: 'Male',
    attendance: 91.0,
    status: 'Pending',
    feeBalance: 320000,
    phone: '+255 700 889 334',
    age: 15,
    course: 'Sciences',
    enrollmentDate: '2024-09-01',
    avatar: 'DM',
  },
  {
    id: 'STU-2024-1289',
    _id: '5',
    name: 'Grace Kimani',
    email: 'grace.kimani@student.kijani.edu',
    class: 'Form 3B',
    yearGroup: 'Year 11',
    gender: 'Female',
    attendance: 99.1,
    status: 'Active',
    feeBalance: 0,
    phone: '+255 765 112 778',
    age: 17,
    course: 'Sciences',
    enrollmentDate: '2023-01-12',
    avatar: 'GK',
  },
  {
    id: 'STU-2024-1342',
    _id: '6',
    name: 'Peter Ochieng',
    email: 'peter.ochieng@student.kijani.edu',
    class: 'Form 4A',
    yearGroup: 'Year 12',
    gender: 'Male',
    attendance: 85.3,
    status: 'Active',
    feeBalance: 95000,
    phone: '+255 723 556 990',
    age: 18,
    course: 'Business',
    enrollmentDate: '2022-01-08',
    avatar: 'PO',
  },
  {
    id: 'STU-2024-1478',
    _id: '7',
    name: 'Sarah Wambui',
    email: 'sarah.wambui@student.kijani.edu',
    class: 'Form 2A',
    yearGroup: 'Year 10',
    gender: 'Female',
    attendance: 96.7,
    status: 'Active',
    feeBalance: 0,
    phone: '+255 711 334 221',
    age: 16,
    course: 'Arts',
    enrollmentDate: '2024-01-18',
    avatar: 'SW',
  },
  {
    id: 'STU-2024-1590',
    _id: '8',
    name: 'Michael Juma',
    email: 'michael.juma@student.kijani.edu',
    class: 'Form 1B',
    yearGroup: 'Year 9',
    gender: 'Male',
    attendance: 92.4,
    status: 'Pending',
    feeBalance: 210000,
    phone: '+255 744 667 883',
    age: 15,
    course: 'Sciences',
    enrollmentDate: '2024-09-02',
    avatar: 'MJ',
  },
];

export const academicRecord = [
  { subject: 'Mathematics', score: 84, grade: 'A', teacher: 'Mr. Kamau', comment: 'Excellent problem-solving skills' },
  { subject: 'English', score: 78, grade: 'B+', teacher: 'Ms. Wanjiku', comment: 'Strong written expression' },
  { subject: 'Kiswahili', score: 91, grade: 'A', teacher: 'Mwalimu Asha', comment: 'Outstanding fluency' },
  { subject: 'Biology', score: 72, grade: 'B', teacher: 'Dr. Otieno', comment: 'Good practical skills' },
  { subject: 'Chemistry', score: 68, grade: 'B-', teacher: 'Mrs. Njeri', comment: 'Needs more practice on organic chemistry' },
  { subject: 'History', score: 88, grade: 'A-', teacher: 'Mr. Juma', comment: 'Insightful essay writing' },
];

export const attendanceGrid = [
  { date: 'Sep 29', status: 'P' },
  { date: 'Sep 30', status: 'P' },
  { date: 'Oct 1', status: 'L' },
  { date: 'Oct 2', status: 'P' },
  { date: 'Oct 3', status: 'P' },
  { date: 'Oct 6', status: 'P' },
  { date: 'Oct 7', status: 'A' },
  { date: 'Oct 8', status: 'P' },
  { date: 'Oct 9', status: 'P' },
  { date: 'Oct 10', status: 'P' },
];

export const guardians = [
  { name: 'Hassan Yusuf', relation: 'Father', phone: '+255 712 111 222', email: 'hassan.y@email.com', primary: true },
  { name: 'Fatima Yusuf', relation: 'Mother', phone: '+255 712 333 444', email: 'fatima.y@email.com', primary: false },
];

export const feeTransactions = [
  { id: 'TXN-88421', date: '2026-10-05', student: 'Amina Yusuf', method: 'M-Pesa', amount: 150000, status: 'Completed', ref: 'RJH45KL90' },
  { id: 'TXN-88418', date: '2026-10-04', student: 'Grace Kimani', method: 'Bank Transfer', amount: 320000, status: 'Completed', ref: 'FT23004' },
  { id: 'TXN-88412', date: '2026-10-03', student: 'Sarah Wambui', method: 'Card', amount: 85000, status: 'Completed', ref: 'CARD-9921' },
  { id: 'TXN-88405', date: '2026-10-02', student: 'Peter Ochieng', method: 'M-Pesa', amount: 50000, status: 'Pending', ref: 'RJH33MN12' },
  { id: 'TXN-88398', date: '2026-10-01', student: 'James Okello', method: 'Bank Transfer', amount: 100000, status: 'Failed', ref: 'FT22991' },
];

export const feeSummary = {
  totalInvoiced: 478000000,
  collected: 412000000,
  outstanding: 66000000,
  collectionRate: 86.2,
};

export const attendanceRegister = [
  { id: '1', name: 'Amina Yusuf', class: 'Form 3A', status: 'Present' },
  { id: '2', name: 'James Okello', class: 'Form 4B', status: 'Absent' },
  { id: '3', name: 'Fatuma Hassan', class: 'Form 2C', status: 'Present' },
  { id: '4', name: 'David Mwangi', class: 'Form 1A', status: 'Late' },
  { id: '5', name: 'Grace Kimani', class: 'Form 3B', status: 'Present' },
  { id: '6', name: 'Peter Ochieng', class: 'Form 4A', status: 'Excused' },
  { id: '7', name: 'Sarah Wambui', class: 'Form 2A', status: 'Present' },
  { id: '8', name: 'Michael Juma', class: 'Form 1B', status: 'Present' },
];
