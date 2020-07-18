import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BasketComponent } from './basket.component';

//Lazy Loading
const routes:Routes=[
  {path:'',component:BasketComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class BasketRoutingModule {}

