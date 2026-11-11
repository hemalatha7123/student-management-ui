export interface Enrollment {
  id?: number;
  studentId: number;
  courseId: number;
  courseName?: string;
  courseCode?: string;
}

export interface EnrollmentRequest {
  studentId: number;
  courseId: number;
}
