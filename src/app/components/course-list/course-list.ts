import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course';
import { CourseForm } from '../course-form/course-form';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseForm],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  courses: Course[] = [];

  selectedCourseId: number | null = null;

  showForm = false;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  onCourseCancelled(): void {
    this.showForm = false;
    this.selectedCourseId = null;
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

  addCourse(): void {
    this.selectedCourseId = null;
    this.showForm = true;
  }

  editCourse(id: number): void {
    this.selectedCourseId = id;
    this.showForm = true;
  }

  onCourseSaved(): void {
    this.showForm = false;
    this.selectedCourseId = null;

    // Automatically refresh after child saves
    this.loadCourses();
  }

  deleteCourse(id: number): void {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }

    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        this.loadCourses();
      },
      error: (error) => {
        console.error('Error deleting course', error);
      }
    });
  }
}
