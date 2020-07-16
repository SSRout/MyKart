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
  shopParams=new ShopParams();
  sortOptions=[
    {name:'Alphabetical',value:'name'},
    {name:'Price : High to Low',value:'priceDesc'},
    {name:'Price : Low to High',value:'priceAsc'}
  ];
  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(response=>{
      this.Products=response.data;
      this.shopParams.pageNumber=response.pageIndex;
      this.shopParams.pageSize=response.pageSize;
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
    this.shopParams.brandId=brandId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  onTypeSelected(typeId:number){
    this.shopParams.typeId=typeId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  onSortSelected(sort:string){
    this.shopParams.sort=sort;
    this.getProducts();
  }

  onPageChanged(event:any){
    if(this.shopParams.pageNumber!==event){
      this.shopParams.pageNumber=event;
      this.getProducts();
    } 
  }

  onSearch(){
    this.shopParams.search=this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber=1;
    this.getProducts()
  }

  onReset(){
    this.searchTerm.nativeElement.value='';
    this.shopParams=new ShopParams();
    this.getProducts()
  }

}
