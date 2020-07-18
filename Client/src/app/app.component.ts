import { BasketService } from './basket/basket.service';
import { IProduct } from './shared/models/product';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'MyKart';
  constructor(private basketService:BasketService) {}

  ngOnInit():void{
    const basketId=localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(()=>{
        console.log('Intialized basket')
      },error=>{
        console.log(error)
      });
    }
  }
}
