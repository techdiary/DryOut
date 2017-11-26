import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: [ '', Validators.required],
      password: ['', Validators.required]
    });
  }

  signup() {
    const val = this.signupForm.value;

  if (val.email && val.username && val.password) {
      this.authService.signup( val.email, val.password)
        .subscribe(
          (data) => {
            console.log('User registered', data);
            this.router.navigate(['login']);
          });
    }
  }


}
