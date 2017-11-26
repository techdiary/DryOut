import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private  router: Router) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['',  Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const val = this.loginForm.value;

    if ( val.email && val.password) {
      this.authService.login( val.email, val.password)
        .subscribe( (result) => {
          console.log('User Logged in as: ', result);
          alert(`You have successfully logged in as ${result} `);
          this.router.navigateByUrl('/');
        });
    }
  }

}
