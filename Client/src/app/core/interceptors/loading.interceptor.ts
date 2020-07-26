import { delay, finalize } from 'rxjs/operators';
import { BusyService } from './../services/busy.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,} from '@angular/common/http';
import { Observable, bindCallback } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busyService:BusyService){}
  intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.method==='POST' &&  req.url.includes('orders')){
      return next.handle(req);
    }
    
    if(!req.url.includes('emailexists')){
      this.busyService.busy();
    }
  
   return next.handle(req).pipe(
       delay(1000),
       finalize(()=>{
           this.busyService.idle();
       })
   );
  }
}
