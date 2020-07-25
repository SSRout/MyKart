import { CheckoutComponent } from './checkout.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';

//Lazy Loading
const routes:Routes=[
  {path:'',component:CheckoutComponent},
  {path:'success',component:CheckoutSuccessComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class CheckoutRoutingModule { }

