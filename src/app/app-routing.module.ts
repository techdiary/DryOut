import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {LoginComponent} from './login/login.component';
import {AboutComponent} from './about.component';
import {ShoutComponent} from './shout/shout.component';
import {SignupComponent} from './signup/signup.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'about', component: AboutComponent},
  {path: 'shout', component: ShoutComponent},
  {path: '', redirectTo: '/shout', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
