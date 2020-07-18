import { Observable } from 'rxjs';
import { BasketService } from './basket.service';
import { Component, OnInit } from '@angular/core';
import { IBasket, IBasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$:Observable<IBasket>;
  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.basket$=this.basketService.basket$;
  }

  removeBasketItem(item:IBasketItem){
    this.basketService.removeItemFormBasket(item);
  }

  incrementItemQuantity(item:IBasketItem){
    this.basketService.incrementItemQunatity(item);
  }


  decrementItemQuantity(item:IBasketItem){
    this.basketService.decrementItemQunatity(item);
  }

}
