import { IPagination } from './models/pagination';
import { IProduct } from './models/product';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'MyKart';
  Products:IProduct[];
  constructor(private http : HttpClient) {}

  ngOnInit():void{
    this.http.get("https://localhost:5001/api/products").subscribe((response:IPagination)=>{
     this.Products=response.data;
    },error=>{
      console.log(error);
    });
  }
}
