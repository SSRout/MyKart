import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss']
})
export class OrderTotalComponent implements OnInit {
  @Input() shippingPrice:number;
  @Input() subtotal:number;
  @Input() total:number;
  constructor() { }

  ngOnInit(): void {
  }

}
