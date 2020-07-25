import { BasketService } from './../../basket/basket.service';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from './../checkout.service';
import { Component, OnInit, Input } from '@angular/core';
import {IDeliveryMethod} from 'src/app/shared/models/deliveryMethod';
@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm:FormGroup;
  deliveryMethods:IDeliveryMethod[];
  constructor(private checkoutService: CheckoutService, private basketService: BasketService) { }

  ngOnInit() {
    this.checkoutService.getDeliveryMethods().subscribe((dm: IDeliveryMethod[]) => {
      this.deliveryMethods = dm;
    }, error => {
      console.log(error);
    });
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.basketService.setShippingCharge(deliveryMethod);
  }

}
