import { BasketService } from './../../basket/basket.service';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { IBasket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  @Input() checkoutForm:FormGroup;
  basket$:Observable<IBasket>;
  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.basket$=this.basketService.basket$;
  }

}
