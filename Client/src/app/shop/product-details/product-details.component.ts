import { IProduct } from './../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
 product:IProduct
  constructor(private shopService:ShopService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  
  loadProduct(){
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(response=>{
      return this.product=response;
    },error=>{
      console.log(error);
    })
  }

}
