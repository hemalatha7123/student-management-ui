
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { StudentService } from
  '../../services/student';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-form.html'
})
export class StudentForm
  implements OnInit, OnChanges {

  // Parent sends student ID to child
  @Input() studentId: number | null = null;

  // Child sends notification to parent
 @Output() studentSaved = new EventEmitter<void>();

  studentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {

    this.studentForm = this.fb.group({

      firstName: ['', Validators.required],

      lastName: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      phone: [''],

      dateOfBirth: ['']

    });

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['studentId'] &&
        this.studentForm) {

      if (this.studentId !== null) {

        this.loadStudent(this.studentId);

      } else {

        this.studentForm.reset();

      }

    }

  }

  loadStudent(id: number): void {

    this.studentService.getStudent(id)
      .subscribe({

        next: (student) => {

          this.studentForm.patchValue(student);

        },

        error: (error) => {

          console.error('Unable to load student', error);

        }

      });

  }

  saveStudent(): void {

    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const student = this.studentForm.value;

      if (this.studentId !== null) {
        // Update existing student
        this.studentService.updateStudent(this.studentId, student)
          .subscribe({
            next: (response) => {
              console.log('Student updated successfully:', response);

              this.studentSaved.emit();
              this.studentForm.reset();
            },
            error: (error) => {
              console.error('Error updating student:', error);
            }
          });

      } else {
        // Add new student
        this.studentService.createStudent(student)
          .subscribe({
            next: (response) => {
              console.log('Student created successfully:', response);

              this.studentSaved.emit();
              this.studentForm.reset();
            },
            error: (error) => {
              console.error('Error creating student:', error);
            }
          });
      }
  }
}
