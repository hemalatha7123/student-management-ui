
import { Component, OnInit } from '@angular/core';

import { Student } from
  '../../models/student.model';

import { StudentService } from
  '../../services/student';

import { StudentForm } from
  '../student-form/student-form';

@Component({

  selector: 'app-student-list',

  standalone: true,

  imports: [StudentForm],

  templateUrl: './student-list.html'

})

export class StudentList implements OnInit {

  students: Student[] = [];

  selectedStudentId: number | null = null;

  constructor(
    private studentService: StudentService
  ) {}

  loadStudents(): void {

    this.studentService.getStudents()
      .subscribe({

        next: (data) => {
          console.log('Refreshing student list:', data);
          this.students = data.filter(
                            student => student.status === 'ACTIVE'
                          );
        },

        error: (error) => {

          console.error('Error loading students', error);

        }

      });

  }

  ngOnInit(): void {
    this.loadStudents();
  }

  editStudent(id: number): void {

    this.selectedStudentId = id;

  }

  addStudent(): void {

    this.selectedStudentId = null;
    this.loadStudents();

  }

  refreshStudents(): void {

    console.log('Child component notified parent to refresh');
    this.selectedStudentId = null;
    this.loadStudents();
  }

  deleteStudent(id: number): void {

        if (!confirm('Are you sure you want to delete this student?')) {
          return;
        }
    
        this.studentService.deleteStudent(id).subscribe({
          next: () => {
            this.loadStudents();
          },
          error: (error) => {
            console.error('Error deleting student', error);
          }
        });
      
  }

}
