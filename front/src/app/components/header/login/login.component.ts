import { Component, OnInit, inject } from '@angular/core';
import { SigninComponent } from '../signin/signin.component';
import { AuthService } from '../../../services/auth/auth.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SigninComponent, RouterModule, RouterOutlet, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  public cookies = inject (CookieService);
  public authService = inject (AuthService);
  
  ngOnInit(): void {
    // this.loginForm.reset({userName: (poner lo que venfa del sign in)})
  }
  // public loginForm : FormGroup = new FormGroup ({
  //   userName: new FormControl(''),
  //   password: new FormControl(''),
  // })

  public loginForm: FormGroup = this.fb.group({
    userName : ['', [Validators.required, Validators.minLength(3)]],
    password : ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor(private fb:FormBuilder){

  }

  onSave():void{
    if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    } 
    this.login();
    this.loginForm.reset(); //reestablecer el formulario con valores iniciales. Otro uso muy comun es hacerlo en el ngOnInit
  }

  isValidField(field: string): boolean | null{
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  }
  
  getFieldError( field: string ):string| null{
    if ( !this.loginForm.controls[field] ) return null;
    const errors = this.loginForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
          if(field === 'userName'){
            return 'username is required';
          }
          else{
            return 'password is required';
          }

        case 'minlength':
          if(field === 'userName'){
            return 'username must contain at least 3 characters';
          }
          else{
            return 'password must contain at least 6 characters, including...';
          }
      }
      
    }
    return null;
  }

  login(){
    this.authService.login(this.loginForm.get('userName')?.value, this.loginForm.get('password')?.value);
  }
 
}
