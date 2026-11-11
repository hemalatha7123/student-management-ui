
import { Component } from '@angular/core';

import { MatTabsModule } from
  '@angular/material/tabs';

import { StudentList } from
  './components/student-list/student-list';

import { CourseList } from
  './components/course-list/course-list';

import { EnrollmentComponent} from
  './components/enrollment/enrollment';

@Component({

  selector: 'app-root',

  standalone: true,

  imports: [
    MatTabsModule,
    StudentList,
    CourseList,
    EnrollmentComponent
  ],

  templateUrl: './app.html',

  styleUrl: './app.css'

})

export class App {

  title = 'Student Management System';

}
