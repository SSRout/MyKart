import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop/shop.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'test-error',component:TestErrorComponent},
  {path:'server-error',component:ServerErrorComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'shop',loadChildren:()=>import('./shop/shop.module').then(m=>m.ShopModule)},//lazy loading
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
