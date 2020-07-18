import { BasketService } from './../../../basket/basket.service';
import { IBasketTotals } from './../../models/basket';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss']
})
export class OrderTotalComponent implements OnInit {
  basketTotal$:Observable<IBasketTotals>;
  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.basketTotal$=this.basketService.basketTotal$;
  }

}
