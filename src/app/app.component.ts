import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  username: string;
  message: string;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser().subscribe(
      (data) => {
        this.username = data.local.email.toString();
        console.log(data.local.email);
      });
  }

  logout() {
    this.authService.logout().subscribe(
      (data) => {
        this.username = ''
        this.message = data.toString();
        console.log(data);
      });
  }
}
