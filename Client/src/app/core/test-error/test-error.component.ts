
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl=environment.apiUrl;
  validationsError:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.baseUrl+"products/42").subscribe(response=>{
      console.log(response);
    },err=>{
      console.log(err);
    })
  }

  get500Error(){
    this.http.get(this.baseUrl+"buggy/servererror").subscribe(response=>{
      console.log(response);
    },err=>{
      console.log(err);
    })
  }

  get400Error(){
    this.http.get(this.baseUrl+"buggy/badrequest").subscribe(response=>{
      console.log(response);
    },err=>{
      console.log(err);
    })
  }

  get400ValidationError(){
    this.http.get(this.baseUrl+"products/one").subscribe(response=>{
      console.log(response);
    },err=>{
      console.log(err);
      this.validationsError=err.errors; 
    })
  }

}
