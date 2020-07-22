import { AccountService } from './../account.service';
import { FormGroup, FormBuilder, Validators, AsyncValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer, of } from 'rxjs';
import {map,switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  errors:string[];
  constructor(private fb:FormBuilder,private accountService:AccountService,private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm=this.fb.group({//same as new FormGroup
      displayName:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
            [this.validateEmail()]],
      password:[null,Validators.required]
    })
  }
  onSubmit(){
   this.accountService.register(this.registerForm.value).subscribe(()=>{
     console.log("Register success");
     this.router.navigateByUrl('/shop');
   },error=>{
     console.log(error);
     this.errors=error.errors;
     
   })
  }

  //check email exist or not
  validateEmail():AsyncValidatorFn{
     return control=>{
       return timer(500).pipe(
        switchMap(()=>{
           if(!control.value){
             return of(null);
           }
           return this.accountService.checkEmailExists(control.value).pipe(
             map(res=>{
               return res?{emailExists:true}:null
             })
           );
         })
       );
     };
  }

}
