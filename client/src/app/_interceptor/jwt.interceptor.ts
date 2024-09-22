import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../_services/account.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountSrevice = inject(AccountService);
  if (accountSrevice.currentUser()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accountSrevice.currentUser()?.token}`
      }
    })
  }
  return next(req);
};
