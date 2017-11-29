import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    public snackBar: MatSnackBar,
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
      this.authService.signup( val.email, val.password, val.username)
        .subscribe(
          (data) => {
            console.log('User registered', data);
            this.snackBar.open('Successfully Registered', null, { duration: 2000});
            this.router.navigateByUrl('/');
          });
    }
  }


}
