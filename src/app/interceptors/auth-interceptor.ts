import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const username = 'user';
  const password = 'User@123';
  const credentials = btoa(`${username}:${password}`);

  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Basic ${credentials}`
    }
  });

  console.info('Interceptor called:', req.url);
  return next(authRequest);
};
