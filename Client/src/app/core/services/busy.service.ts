import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})

export class BusyService {
  busyRequestCount = 0;
  constructor(private spinnerServive: NgxSpinnerService) {}
  busy() {
    this.busyRequestCount++;
    this.spinnerServive.show(undefined,{
      type:'ball-spin-clockwise',
      size:'medium',
      bdColor:'rgb(255,255,255,0.7)',
      color:"orange"
    });
  }

  idle(){
    this.busyRequestCount--;
    if(this.busyRequestCount<=0){
      this.busyRequestCount=0;
      this.spinnerServive.hide();
    }
  }
}
