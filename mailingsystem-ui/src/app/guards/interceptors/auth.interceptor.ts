import {
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

export const BYPASS_SERVER = new HttpContextToken(() => false);
@Injectable({
  providedIn: 'root',
})
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject('API_BASE_URL') private apiBaseUrl: string
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.shallIgnoreUrl(req.url)) {
      return next.handle(req);
    }
    if (req.context.get(BYPASS_SERVER)) {
      /** Bypass http server call */
      return next.handle(req);
    }
    const token = localStorage.getItem('authToken');

    /** Cloning request */
    req = req.clone({
      // setHeaders: { Authorization: 'Bearer ' + authInfo.jwToken },
      setHeaders: {
        'Content-Type': 'application/json',
        'X-MAIL-SYS-CSO': `${token}`
      },
      url: `${this.apiBaseUrl}/${req.url}`,
    });

    /** Executing request and then capturing response from backend and redirecting to login in case of 401 error */
    return next
      .handle(req)
      .pipe(catchError((err) => this.processUserNotLoggedInResponse(err)));
  }

  private shallIgnoreUrl(url: string): boolean {
    return url.startsWith('http://') || url.startsWith('https://');
  }

  private processUserNotLoggedInResponse(err: any): Observable<never> {
    // if unauthorized
    if (err.status == 401) {
      localStorage.removeItem('authToken');
      // redirect to login page
      /* this.router.navigate(['/auth/login'], {
         queryParams: {
           returnUrl: this.route.snapshot['_routerState'].url
         }
       }).then(r => );*/
    }

    // if bad request
    if (err.status == 400) {
      if (err.error.errors && err.error.errors.length) {
        const messages = err.error.errors.join('\n');
        return throwError(() => new Error(messages));
      }
    }

    // if else: create a friendly error and continue
    const error = err.error.message || err.statusText;
    return throwError(() => err);
  }
}
