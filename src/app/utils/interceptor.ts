


import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private router: Router){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // const headers = new HttpHeaders({
        //     token: localStorage.getItem('bill-token'),
        // });
        // const options = {
        //     headers,
        // };

        // request = request.clone({ headers });

        return next.handle(request).pipe(
            catchError(response => {
                this.router.navigate(['/login']);
                return throwError(response);
            }),
            map((event: HttpEvent<any>) => {
                return event;
            }));
    }
}

