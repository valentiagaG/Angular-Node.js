import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { NgIf } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, NgIf, LoginComponent, RouterModule, RouterOutlet, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, NgxUiLoaderModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  public authService = inject (AuthService);
  public signupForm: FormGroup = this.fb.group({
    name : ['', [Validators.required]],
    userName : ['', [Validators.required, Validators.minLength(3)]],
    password : ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,32}$')]],
    repPassword:['', [Validators.required]]
  })

  constructor(private fb:FormBuilder){

  }

  hide = true;

  get name(){
    return this.signupForm.get('userName')?.value;
  }
  get password(){
    return this.signupForm.get('password')?.value;
  }
  get repPassword(){
    return this.signupForm.get('userName')?.value;
  }
  


  signin(){
    // console.log(this.userName, this.password, this.repass);
    
    this.authService.signin(this.signupForm.get('name')?.value, this.signupForm.get('userName')?.value, this.signupForm.get('password')?.value);
  }

}
