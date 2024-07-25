import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(UserService);
  const token = tokenService.getToken();
  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }
  return next(req);
};
