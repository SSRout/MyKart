import { BasketService } from './../../../basket/basket.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IBasket, IBasketItem } from '../../models/basket';
import { IOrderItem } from '../../models/order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  @Output() decrement :EventEmitter<IBasketItem>=new EventEmitter<IBasketItem>();
  @Output() incremet :EventEmitter<IBasketItem>=new EventEmitter<IBasketItem>();
  @Output() remove :EventEmitter<IBasketItem>=new EventEmitter<IBasketItem>();
  @Input() isBasket=true;
  
  @Input() items: IBasketItem[] | IOrderItem[] = [];
  @Input() isOrder = false;
  constructor() { }

  ngOnInit(): void {
  }

  decrementItemQuantity(item:IBasketItem){
    this.decrement.emit(item)
  }

  incrementItemQuantity(item:IBasketItem){
    this.incremet.emit(item)
  }

  removeBasketItem(item:IBasketItem){
    this.remove.emit(item)
  }


}
