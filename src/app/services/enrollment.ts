
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Enrollment, EnrollmentRequest} from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private apiUrl = 'http://localhost:8080/api/enrollments';

  constructor(private http: HttpClient) {}

  getEnrollments(studentId: number): Observable<Enrollment[]> {

    const params = new HttpParams()
      .set('studentId', studentId);

    return this.http.get<Enrollment[]>(
      this.apiUrl, { params }
    );
  }

  enrollStudent(
    request: EnrollmentRequest
  ): Observable<Enrollment> {

    return this.http.post<Enrollment>(
      `${this.apiUrl}/create`, request
    );
  }

  removeEnrollment(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/delete/${id}`
    );
  }
}
