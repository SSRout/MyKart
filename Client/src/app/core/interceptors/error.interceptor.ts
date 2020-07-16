import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Router, NavigationExtras} from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import {ToastrService} from 'ngx-toastr';
import { delay } from 'rxjs/operators';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private route:Router,private toastr:ToastrService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error=>{
                if(error){
                    if(error.status===400){
                        if(error.error.errors){
                            throw error.error;
                        }
                       else{
                        this.toastr.error(error.error.message,error.error.statusCode);
                       }
                    }
                    if(error.status===401){
                        this.toastr.error(error.error.message,error.error.statusCode);
                    }
                    if(error.status===404){
                        this.route.navigateByUrl('/not-found');
                    }
                    if(error.status===500){
                        const navigationExtras:NavigationExtras={state:{error:error.error}};
                        this.route.navigateByUrl('/server-error',navigationExtras);
                    }
                }
                return throwError(error);
            })
        );
    }
}