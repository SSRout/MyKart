import { BasketService } from './../../basket/basket.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { IBasket } from 'src/app/shared/models/basket';
import { CdkStepper } from '@angular/cdk/stepper/stepper';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
 @Input() appStepper:CdkStepper;
  basket$:Observable<IBasket>;
  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.basket$=this.basketService.basket$;
  }

  createPayementIntent(){
    return this.basketService.createPaymentIntent().subscribe(()=>{
      this.appStepper.next();
    },error=>{
      console.log(error.message);
    });
  }

}
