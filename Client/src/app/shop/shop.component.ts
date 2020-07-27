import { IType } from '../shared/models/productType';
import { IBrand } from '../shared/models/brands';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/product';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ShopParams} from '../shared/models/shopParams'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{static:false}) searchTerm:ElementRef;
  Products:IProduct[];
  Brands:IBrand[];
  Types:IType[];
  totalCount:number;
  shopParams:ShopParams;
  sortOptions=[
    {name:'Alphabetical',value:'name'},
    {name:'Price : High to Low',value:'priceDesc'},
    {name:'Price : Low to High',value:'priceAsc'}
  ];
  constructor(private shopService:ShopService) { 
    this.shopParams=shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  getProducts(useCache=false){
    this.shopService.getProducts(useCache).subscribe(response=>{
      this.Products=response.data;
      this.totalCount=response.count;
    },error=>{
      console.log(error);
    })
  }

  getBrands(){
    this.shopService.getBrands().subscribe(response=>{
      this.Brands=[{id:0,name:'All'},...response];
    },error=>{
      console.log(error);
    })
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response=>{
      this.Types=[{id:0,name:'All'},...response];;
    },error=>{
      console.log(error);
    })
  }

  onBrandSelcted(brandId:number){
    const params=this.shopService.getShopParams();
    params.brandId=brandId;
    params.pageNumber=1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onTypeSelected(typeId:number){
    const params=this.shopService.getShopParams();
    params.typeId=typeId;
    params.pageNumber=1;
    this.shopService.setShopParams(params);

    this.getProducts();
  }

  onSortSelected(sort:string){
    const params=this.shopService.getShopParams();
    params.sort=sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event:any){
    const params=this.shopService.getShopParams();
    if(params.pageNumber!==event){
      params.pageNumber=event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    } 
  }

  onSearch(){
    const params=this.shopService.getShopParams();
    params.search=this.searchTerm.nativeElement.value;
    params.pageNumber=1;
    this.shopService.setShopParams(params);
    this.getProducts()
  }

  onReset(){
    this.searchTerm.nativeElement.value='';
    this.shopParams=new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts()
  }

}
