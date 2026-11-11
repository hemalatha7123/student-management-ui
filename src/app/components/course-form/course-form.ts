
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css'
})
export class CourseForm implements OnChanges {

  @Input() courseId: number | null = null;

  @Output() courseSaved = new EventEmitter<void>();

  course: Course = this.emptyCourse();

  constructor(private courseService: CourseService) {}

  emptyCourse(): Course {
    return {
      courseName: '',
      courseCode: '',
      description: '',
      duration: 0,
      status: 'ACTIVE'
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId']) {
      if (this.courseId) {
        this.loadCourse(this.courseId);
      } else {
        this.course = this.emptyCourse();
      }
    }
  }

  loadCourse(id: number): void {
    this.courseService.getCourseById(id).subscribe({
      next: (data) => {
        this.course = { ...data };
      },
      error: (error) => {
        console.error('Error loading course', error);
      }
    });
  }

  saveCourse(): void {

    const request = this.courseId
      ? this.courseService.updateCourse(
          this.courseId, this.course
        )
      : this.courseService.addCourse(this.course);

    request.subscribe({
      next: () => {
        this.courseSaved.emit();
      },
      error: (error) => {
        console.error('Error saving course', error);
      }
    });
  }
}
