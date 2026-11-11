import { Routes } from '@angular/router';

import { StudentList }
  from './components/student-list/student-list';

import { CourseList }
  from './components/course-list/course-list';

import { EnrollmentComponent }
  from './components/enrollment/enrollment';

export const routes: Routes = [

  {
    path: 'students',
    component: StudentList
  },

  {
    path: 'courses',
    component: CourseList
  },

  {
    path: 'enrollments',
    component: EnrollmentComponent
  },

  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'students'
  }

];