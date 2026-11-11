import { HttpInterceptorFn } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn =
  (req, next) => {

    return next(req).pipe(

      catchError(error => {

        let message = 'Something went wrong';

        if (error.status === 400) {
          message = 'Invalid request';
        }

        else if (error.status === 404) {
          message = 'Requested resource not found';
        }

        else if (error.status === 409) {
          message = 'Duplicate record or conflicting operation';
        }

        else if (error.status === 500) {
          message = 'Internal server error';
        }

        else if (error.status === 0) {
          message = 'Unable to connect to backend';
        }

        console.error(message, error);

        return throwError(() => error);

      })

    );

  };