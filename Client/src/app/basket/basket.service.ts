import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { IBasketItem, Basket, IBasketTotals } from './../shared/models/basket';
import { IProduct } from './../shared/models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBasket } from '../shared/models/basket';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private baseketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.baseketSource.asObservable();
  
  private baseketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.baseketTotalSource.asObservable();

  shipping=0;

  constructor(private http: HttpClient) {}

  setShippingCharge(deliveryMethod:IDeliveryMethod){
    this.shipping=deliveryMethod.price;
    this.calculateTotals();
  }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.baseketSource.next(basket);
        this.calculateTotals();
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe(
      (response: IBasket) => {
        this.baseketSource.next(response);
        this.calculateTotals();
      },error => {
        console.log(error);
      }
    );
  }

  getCurrentBasketValue() {
    return this.baseketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductToBasket(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    //console.log(basket);
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }
  
  incrementItemQunatity(item:IBasketItem){
    const basket=this.getCurrentBasketValue();
    const foundItemIndex=basket.items.findIndex(x=>x.id===item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQunatity(item:IBasketItem){
    const basket=this.getCurrentBasketValue();
    const foundItemIndex=basket.items.findIndex(x=>x.id===item.id);
    if(basket.items[foundItemIndex].quantity>1){
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    }
    else{
      this.removeItemFormBasket(item);
    }
  }

  removeItemFormBasket(item: IBasketItem) {
    const basket=this.getCurrentBasketValue();
    if(basket.items.some(x=>x.id===item.id)){
      basket.items=basket.items.filter(i=>i.id!==item.id);
      if(basket.items.length>0){
        this.setBasket(basket);
      }
      else{
        this.deleteBasket(basket);
      }
    }
  }

  deleetLocalBasket(id:string){
      this.baseketSource.next(null);
      this.baseketTotalSource.next(null);
      localStorage.removeItem('basket_id');
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl+'basket?id='+basket.id).subscribe(()=>{
      this.baseketSource.next(null);
      this.baseketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    },error=>{
      console.log(error);
    });
  }

  private addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    //console.log(items);
    const index = items.findIndex((i) => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private calculateTotals(){
    const basket=this.getCurrentBasketValue();
    const shipping=this.shipping;
    const subtotal=basket.items.reduce((a,b)=>(b.price*b.quantity)+a,0);
    const total=shipping+subtotal;
    this.baseketTotalSource.next({shipping,total,subtotal});
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductToBasket(item: IProduct, quantity: any): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity: quantity,
      brand: item.productBrand,
      type: item.productType,
    };
  }
}
