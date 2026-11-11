
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Course } from '../../models/course.model';
import { Enrollment } from '../../models/enrollment.model';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';
import { StudentService } from '../../services/student';

interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  status?: string;
}

@Component({
  selector: 'app-enrollment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment.html',
  styleUrl: './enrollment.css'
})
export class EnrollmentComponent implements OnInit {

  students: Student[] = [];
  courses: Course[] = [];
  enrollments: Enrollment[] = [];

  selectedStudentId: number | null = null;

  selectedCourseIds: number[] = [];

  loading = false;
  message = '';

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (error) => {
        console.error('Error loading students', error);
      }
    });
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data.filter(
          course => course.status === 'ACTIVE'
        );
      },
      error: (error) => {
        console.error('Error loading courses', error);
      }
    });
  }

  onStudentChange(): void {

    this.selectedCourseIds = [];
    this.enrollments = [];
    this.message = '';

    if (this.selectedStudentId === null) {
      return;
    }

    this.loadEnrollments();
  }

  loadEnrollments(): void {

    if (this.selectedStudentId === null) {
      return;
    }

    this.enrollmentService
      .getEnrollments(this.selectedStudentId)
      .subscribe({
        next: (data) => {
          this.enrollments = data;
        },
        error: (error) => {
          console.error('Error loading enrollments', error);
        }
      });
  }

  toggleCourse(courseId: number, checked: boolean): void {

    if (checked) {
      if (!this.selectedCourseIds.includes(courseId)) {
        this.selectedCourseIds.push(courseId);
      }
    } else {
      this.selectedCourseIds =
        this.selectedCourseIds.filter(id => id !== courseId);
    }
     console.log('Selected course IDs:', this.selectedCourseIds);
  }

  isAlreadyEnrolled(courseId: number): boolean {
    return this.enrollments.some(
      enrollment => enrollment.courseId === courseId
    );
  }

  enrollCourses(): void {

    if (this.selectedStudentId === null ||
        this.selectedCourseIds.length === 0) {
      this.message = 'Select a student and at least one course.';
      return;
    }

    const studentId = this.selectedStudentId;

    const newCourseIds = this.selectedCourseIds.filter(
      id => !this.isAlreadyEnrolled(id)
    );

    if (newCourseIds.length === 0) {
      this.message = 'Student is already enrolled in these courses.';
      return;
    }

    this.loading = true;
    this.message = '';

    const requests = newCourseIds.map(courseId =>
      this.enrollmentService.enrollStudent({
        studentId,
        courseId
      })
    );

    console.log("requests being sent"+requests);

    forkJoin(requests).pipe(
      switchMap(() => this.enrollmentService.getEnrollments(studentId))
    ).subscribe({
      next: (data) => {
        this.enrollments = data;
        this.selectedCourseIds = [];
        this.message = 'Courses enrolled successfully!';
        this.loading = false;
      },
      error: (error) => {
        console.error('Enrollment failed', error);
        this.message = 'Error enrolling courses.';
        this.loading = false;
        this.loadEnrollments();
      }
    });
  }

  removeEnrollment(enrollmentId: number): void {

    this.enrollmentService
      .removeEnrollment(enrollmentId)
      .subscribe({
        next: () => {
          this.loadEnrollments();
          this.message = 'Enrollment removed successfully!';
        },
        error: (error) => {
          console.error('Error removing enrollment', error);
        }
      });
  }
}
