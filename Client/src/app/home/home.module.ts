import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule
  ],
  exports:[HomeComponent]
})
export class HomeModule { }
