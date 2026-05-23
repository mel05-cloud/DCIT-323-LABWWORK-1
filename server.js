const express = require("express");
const app = express();
app.use(express.json());

const students = [
  { id: "s1", firstName: "Alice", lastName: "Johnson", email: "alice@uni.edu", enrollmentDate: "2022-09-01", major: "Computer Science", gpa: 3.8, year: 3, active: true },
  { id: "s2", firstName: "Bob", lastName: "Smith", email: "bob@uni.edu", enrollmentDate: "2021-09-01", major: "Mathematics", gpa: 3.5, year: 4, active: true },
  { id: "s3", firstName: "Carol", lastName: "Williams", email: "carol@uni.edu", enrollmentDate: "2023-09-01", major: "Physics", gpa: 3.9, year: 2, active: true },
  { id: "s4", firstName: "David", lastName: "Brown", email: "david@uni.edu", enrollmentDate: "2022-09-01", major: "Computer Science", gpa: 3.2, year: 3, active: true },
  { id: "s5", firstName: "Eva", lastName: "Davis", email: "eva@uni.edu", enrollmentDate: "2021-09-01", major: "Engineering", gpa: 3.7, year: 4, active: true },
  { id: "s6", firstName: "Frank", lastName: "Miller", email: "frank@uni.edu", enrollmentDate: "2023-09-01", major: "Biology", gpa: 3.4, year: 2, active: false },
  { id: "s7", firstName: "Grace", lastName: "Wilson", email: "grace@uni.edu", enrollmentDate: "2022-09-01", major: "Chemistry", gpa: 3.6, year: 3, active: true },
  { id: "s8", firstName: "Henry", lastName: "Moore", email: "henry@uni.edu", enrollmentDate: "2020-09-01", major: "Mathematics", gpa: 3.1, year: 5, active: true },
];

const instructors = [
  { id: "i1", firstName: "Dr. Sarah", lastName: "Chen", email: "schen@uni.edu", department: "Computer Science", hireDate: "2015-08-15", officeLocation: "CS-301", specialty: "Algorithms" },
  { id: "i2", firstName: "Dr. James", lastName: "Parker", email: "jparker@uni.edu", department: "Mathematics", hireDate: "2010-08-15", officeLocation: "MATH-210", specialty: "Linear Algebra" },
  { id: "i3", firstName: "Dr. Lisa", lastName: "Roberts", email: "lroberts@uni.edu", department: "Physics", hireDate: "2018-08-15", officeLocation: "PHY-105", specialty: "Quantum Mechanics" },
  { id: "i4", firstName: "Dr. Mark", lastName: "Taylor", email: "mtaylor@uni.edu", department: "Engineering", hireDate: "2012-08-15", officeLocation: "ENG-420", specialty: "Thermodynamics" },
  { id: "i5", firstName: "Dr. Nina", lastName: "Anderson", email: "nanderson@uni.edu", department: "Biology", hireDate: "2019-08-15", officeLocation: "BIO-215", specialty: "Genetics" },
];

const courses = [
  { id: "c1", code: "CS301", name: "Data Structures", credits: 3, department: "Computer Science", instructorId: "i1", capacity: 30, schedule: "MWF 10:00-11:00", prerequisites: [] },
  { id: "c2", code: "CS401", name: "Algorithms", credits: 3, department: "Computer Science", instructorId: "i1", capacity: 25, schedule: "TTh 14:00-15:30", prerequisites: ["CS301"] },
  { id: "c3", code: "MATH351", name: "Linear Algebra", credits: 3, department: "Mathematics", instructorId: "i2", capacity: 35, schedule: "MWF 09:00-10:00", prerequisites: [] },
  { id: "c4", code: "MATH201", name: "Calculus II", credits: 4, department: "Mathematics", instructorId: "i2", capacity: 40, schedule: "MWF 11:00-12:00", prerequisites: [] },
  { id: "c5", code: "PHY201", name: "Modern Physics", credits: 3, department: "Physics", instructorId: "i3", capacity: 30, schedule: "TTh 10:00-11:30", prerequisites: [] },
  { id: "c6", code: "ENG301", name: "Thermodynamics", credits: 3, department: "Engineering", instructorId: "i4", capacity: 28, schedule: "MWF 13:00-14:00", prerequisites: [] },
  { id: "c7", code: "BIO201", name: "Genetics", credits: 3, department: "Biology", instructorId: "i5", capacity: 32, schedule: "TTh 08:00-09:30", prerequisites: [] },
];

const enrollments = [
  { id: "e1", studentId: "s1", courseId: "c1", enrollmentDate: "2024-01-15", grade: "A", status: "completed", semester: "Spring 2024" },
  { id: "e2", studentId: "s1", courseId: "c3", enrollmentDate: "2024-01-15", grade: "B+", status: "completed", semester: "Spring 2024" },
  { id: "e3", studentId: "s1", courseId: "c2", enrollmentDate: "2024-08-20", grade: null, status: "active", semester: "Fall 2024" },
  { id: "e4", studentId: "s2", courseId: "c3", enrollmentDate: "2024-01-15", grade: "A-", status: "completed", semester: "Spring 2024" },
  { id: "e5", studentId: "s2", courseId: "c4", enrollmentDate: "2024-01-15", grade: "B", status: "completed", semester: "Spring 2024" },
  { id: "e6", studentId: "s3", courseId: "c5", enrollmentDate: "2024-08-20", grade: null, status: "active", semester: "Fall 2024" },
  { id: "e7", studentId: "s3", courseId: "c1", enrollmentDate: "2024-08-20", grade: null, status: "active", semester: "Fall 2024" },
  { id: "e8", studentId: "s4", courseId: "c1", enrollmentDate: "2024-01-15", grade: "B-", status: "completed", semester: "Spring 2024" },
  { id: "e9", studentId: "s4", courseId: "c2", enrollmentDate: "2024-08-20", grade: null, status: "active", semester: "Fall 2024" },
  { id: "e10", studentId: "s5", courseId: "c6", enrollmentDate: "2024-01-15", grade: "A", status: "completed", semester: "Spring 2024" },
  { id: "e11", studentId: "s6", courseId: "c7", enrollmentDate: "2024-01-15", grade: "C+", status: "completed", semester: "Spring 2024" },
  { id: "e12", studentId: "s7", courseId: "c3", enrollmentDate: "2024-08-20", grade: null, status: "active", semester: "Fall 2024" },
  { id: "e13", studentId: "s8", courseId: "c4", enrollmentDate: "2024-01-15", grade: "B+", status: "completed", semester: "Spring 2024" },
  { id: "e14", studentId: "s8", courseId: "c3", enrollmentDate: "2024-08-20", grade: null, status: "active", semester: "Fall 2024" },
];

const assignments = [
  { id: "a1", courseId: "c1", title: "Linked List Implementation", description: "Implement a doubly linked list", dueDate: "2024-02-15", maxPoints: 100, type: "project" },
  { id: "a2", courseId: "c1", title: "Midterm Exam", description: "Covers arrays, linked lists, stacks, queues", dueDate: "2024-03-01", maxPoints: 150, type: "exam" },
  { id: "a3", courseId: "c2", title: "Sorting Algorithm Analysis", description: "Analyze time complexity of sorting algorithms", dueDate: "2024-09-20", maxPoints: 100, type: "assignment" },
  { id: "a4", courseId: "c3", title: "Matrix Operations", description: "Complete matrix transformation problems", dueDate: "2024-02-20", maxPoints: 80, type: "assignment" },
  { id: "a5", courseId: "c3", title: "Eigenvalues Quiz", description: "10-question quiz on eigenvalues/eigenvectors", dueDate: "2024-03-10", maxPoints: 50, type: "quiz" },
  { id: "a6", courseId: "c5", title: "Quantum Lab Report", description: "Write up photoelectric effect experiment", dueDate: "2024-09-25", maxPoints: 120, type: "lab" },
];

const grades = [
  { id: "g1", enrollmentId: "e1", assignmentId: "a1", score: 95, submittedDate: "2024-02-14", feedback: "Excellent implementation!" },
  { id: "g2", enrollmentId: "e1", assignmentId: "a2", score: 138, submittedDate: "2024-03-01", feedback: "Strong performance on stacks and queues." },
  { id: "g3", enrollmentId: "e4", assignmentId: "a4", score: 74, submittedDate: "2024-02-19", feedback: "Good work, minor errors in row reduction." },
  { id: "g4", enrollmentId: "e4", assignmentId: "a5", score: 47, submittedDate: "2024-03-09", feedback: "Well done on eigenvalues." },
  { id: "g5", enrollmentId: "e8", assignmentId: "a1", score: 82, submittedDate: "2024-02-15", feedback: "Good logic, needs better edge case handling." },
  { id: "g6", enrollmentId: "e8", assignmentId: "a2", score: 115, submittedDate: "2024-03-01", feedback: "Solid understanding of core concepts." },
];

const notFound = (res, entity, id) =>
  res.status(404).json({ error: `${entity} with id '${id}' not found` });

const gradeToPoints = (grade) => {
  const map = { "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2.0, "C-": 1.7, "D": 1.0, "F": 0.0 };
  return map[grade] ?? null;
};


app.get("/api/students", (req, res) => res.json({ count: students.length, data: students }));
app.get("/api/students/:id", (req, res) => { const s = students.find(s => s.id === req.params.id); if (!s) return notFound(res, "Student", req.params.id); res.json(s); });
app.get("/api/instructors", (req, res) => res.json({ count: instructors.length, data: instructors }));
app.get("/api/instructors/:id", (req, res) => { const i = instructors.find(i => i.id === req.params.id); if (!i) return notFound(res, "Instructor", req.params.id); res.json(i); });
app.get("/api/courses", (req, res) => res.json({ count: courses.length, data: courses }));
app.get("/api/courses/:id", (req, res) => { const c = courses.find(c => c.id === req.params.id); if (!c) return notFound(res, "Course", req.params.id); res.json(c); });
app.get("/api/enrollments", (req, res) => res.json({ count: enrollments.length, data: enrollments }));
app.get("/api/enrollments/:id", (req, res) => { const e = enrollments.find(e => e.id === req.params.id); if (!e) return notFound(res, "Enrollment", req.params.id); res.json(e); });
app.get("/api/assignments", (req, res) => res.json({ count: assignments.length, data: assignments }));
app.get("/api/assignments/:id", (req, res) => { const a = assignments.find(a => a.id === req.params.id); if (!a) return notFound(res, "Assignment", req.params.id); res.json(a); });
app.get("/api/grades", (req, res) => res.json({ count: grades.length, data: grades }));
app.get("/api/grades/:id", (req, res) => { const g = grades.find(g => g.id === req.params.id); if (!g) return notFound(res, "Grade", req.params.id); res.json(g); });


app.get("/api/students/:id/enrollments", (req, res) => { const s = students.find(s => s.id === req.params.id); if (!s) return notFound(res, "Student", req.params.id); const result = enrollments.filter(e => e.studentId === req.params.id); res.json({ student: `${s.firstName} ${s.lastName}`, count: result.length, data: result }); });
app.get("/api/students/:id/courses", (req, res) => { const s = students.find(s => s.id === req.params.id); if (!s) return notFound(res, "Student", req.params.id); const ids = enrollments.filter(e => e.studentId === req.params.id).map(e => e.courseId); res.json({ student: `${s.firstName} ${s.lastName}`, data: courses.filter(c => ids.includes(c.id)) }); });
app.get("/api/courses/:id/students", (req, res) => { const c = courses.find(c => c.id === req.params.id); if (!c) return notFound(res, "Course", req.params.id); const ids = enrollments.filter(e => e.courseId === req.params.id).map(e => e.studentId); res.json({ course: c.name, data: students.filter(s => ids.includes(s.id)) }); });
app.get("/api/instructors/:id/courses", (req, res) => { const i = instructors.find(i => i.id === req.params.id); if (!i) return notFound(res, "Instructor", req.params.id); res.json({ instructor: `${i.firstName} ${i.lastName}`, data: courses.filter(c => c.instructorId === req.params.id) }); });
app.get("/api/courses/:id/assignments", (req, res) => { const c = courses.find(c => c.id === req.params.id); if (!c) return notFound(res, "Course", req.params.id); res.json({ course: c.name, data: assignments.filter(a => a.courseId === req.params.id) }); });
app.get("/api/enrollments/:id/grades", (req, res) => { const e = enrollments.find(e => e.id === req.params.id); if (!e) return notFound(res, "Enrollment", req.params.id); res.json({ enrollmentId: req.params.id, data: grades.filter(g => g.enrollmentId === req.params.id) }); });


app.get("/api/students/:id/gpa", (req, res) => {
  const s = students.find(s => s.id === req.params.id);
  if (!s) return notFound(res, "Student", req.params.id);
  const completed = enrollments.filter(e => e.studentId === req.params.id && e.grade !== null);
  if (!completed.length) return res.json({ student: `${s.firstName} ${s.lastName}`, gpa: null });
  let totalPoints = 0, totalCredits = 0;
  completed.forEach(e => { const c = courses.find(c => c.id === e.courseId); const p = gradeToPoints(e.grade); if (c && p !== null) { totalPoints += p * c.credits; totalCredits += c.credits; } });
  res.json({ student: `${s.firstName} ${s.lastName}`, gpa: parseFloat((totalPoints / totalCredits).toFixed(2)), totalCredits, completedCourses: completed.length });
});

app.get("/api/courses/:id/average", (req, res) => {
  const c = courses.find(c => c.id === req.params.id);
  if (!c) return notFound(res, "Course", req.params.id);
  const graded = enrollments.filter(e => e.courseId === req.params.id && e.grade !== null);
  if (!graded.length) return res.json({ course: c.name, averageGrade: null });
  const points = graded.map(e => gradeToPoints(e.grade)).filter(p => p !== null);
  const avg = points.reduce((sum, p) => sum + p, 0) / points.length;
  const distribution = {};
  graded.forEach(e => { distribution[e.grade] = (distribution[e.grade] || 0) + 1; });
  res.json({ course: c.name, averageGradePoints: parseFloat(avg.toFixed(2)), gradedStudents: graded.length, gradeDistribution: distribution });
});

app.get("/api/instructors/:id/students", (req, res) => {
  const i = instructors.find(i => i.id === req.params.id);
  if (!i) return notFound(res, "Instructor", req.params.id);
  const courseIds = courses.filter(c => c.instructorId === req.params.id).map(c => c.id);
  const studentIds = [...new Set(enrollments.filter(e => courseIds.includes(e.courseId)).map(e => e.studentId))];
  res.json({ instructor: `${i.firstName} ${i.lastName}`, data: students.filter(s => studentIds.includes(s.id)) });
});

app.get("/api/students/:id/schedule", (req, res) => {
  const s = students.find(s => s.id === req.params.id);
  if (!s) return notFound(res, "Student", req.params.id);
  const active = enrollments.filter(e => e.studentId === req.params.id && e.status === "active");
  if (!active.length) return res.json({ student: `${s.firstName} ${s.lastName}`, schedule: [] });
  const schedule = active.map(e => { const c = courses.find(c => c.id === e.courseId); const i = instructors.find(i => i.id === c?.instructorId); return { course: { code: c.code, name: c.name, schedule: c.schedule, credits: c.credits }, instructor: i ? `${i.firstName} ${i.lastName}` : "N/A", assignments: assignments.filter(a => a.courseId === e.courseId) }; });
  res.json({ student: `${s.firstName} ${s.lastName}`, semester: active[0].semester, totalCredits: schedule.reduce((sum, s) => sum + s.course.credits, 0), schedule });
});

app.listen(3000, () => console.log("University API running on http://localhost:3000"));