import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const val = this.loginForm.value;

    if ( val.email && val.password) {
      this.authService.login( val.email, val.password)
        .subscribe( (result) => {
          console.log('User Signed in: ', result);
        });
    }
  }

}
