export type Student = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'active' | 'inactive';
  lastLesson: string;
};

export const students: Student[] = [
    { id: '1', name: 'Alex Johnson', email: 'alex@example.com', avatar: 'https://placehold.co/32x32.png', status: 'active', lastLesson: '2024-07-20' },
    { id: '2', name: 'Maria Garcia', email: 'maria@example.com', avatar: 'https://placehold.co/32x32.png', status: 'active', lastLesson: '2024-07-19' },
    { id: '3', name: 'James Smith', email: 'james@example.com', avatar: 'https://placehold.co/32x32.png', status: 'inactive', lastLesson: '2024-06-15' },
    { id: '4', name: 'Sunita Patel', email: 'sunita@example.com', avatar: 'https://placehold.co/32x32.png', status: 'active', lastLesson: '2024-07-21' },
    { id: '5', name: 'Chen Wei', email: 'chen@example.com', avatar: 'https://placehold.co/32x32.png', status: 'active', lastLesson: '2024-07-22' },
];

export type Class = {
    id: string;
    title: string;
    studentName: string;
    startTime: string;
    endTime: string;
    date: string;
};

export const classes: Class[] = [
    { id: 'c1', title: 'Algebra II', studentName: 'Alex Johnson', startTime: '10:00', endTime: '11:00', date: '2024-07-25' },
    { id: 'c2', title: 'Chemistry', studentName: 'Maria Garcia', startTime: '11:00', endTime: '12:00', date: '2024-07-25' },
    { id: 'c3', title: 'English Literature', studentName: 'Sunita Patel', startTime: '13:00', endTime: '14:00', date: '2024-07-26' },
];

export type Payment = {
    id: string;
    studentName: string;
    amount: number;
    status: 'paid' | 'unpaid' | 'overdue';
    dueDate: string;
    paidDate?: string;
};

export const payments: Payment[] = [
    { id: 'p1', studentName: 'Alex Johnson', amount: 50, status: 'paid', dueDate: '2024-07-15', paidDate: '2024-07-14' },
    { id: 'p2', studentName: 'Maria Garcia', amount: 75, status: 'unpaid', dueDate: '2024-07-25' },
    { id: 'p3', studentName: 'James Smith', amount: 60, status: 'overdue', dueDate: '2024-07-01' },
    { id: 'p4', studentName: 'Sunita Patel', amount: 50, status: 'paid', dueDate: '2024-07-20', paidDate: '2024-07-19' },
    { id: 'p5', studentName: 'Chen Wei', amount: 100, status: 'unpaid', dueDate: '2024-08-01' },
];

export type Resource = {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'video' | 'doc';
  size: string;
  lastModified: string;
};

export const resources: Resource[] = [
  { id: 'r1', name: 'Math Worksheets', type: 'folder', size: '15.2 MB', lastModified: '2024-07-10' },
  { id: 'r2', name: 'Chemistry Intro.pdf', type: 'pdf', size: '2.1 MB', lastModified: '2024-07-05' },
  { id: 'r3', name: 'Shakespearean Sonnets.doc', type: 'doc', size: '300 KB', lastModified: '2024-06-28' },
  { id: 'r4', name: 'Calculus Explained', type: 'video', size: '128 MB', lastModified: '2024-07-12' },
];
