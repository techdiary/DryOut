import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { FlexLayoutModule} from '@angular/flex-layout';
import { MaterialModule} from './material/material.module';

import { AppComponent } from './app.component';
import { ShoutComponent } from './shout/shout.component';
import { DialogOverviewComponent } from './shout/shout.component';
import { ListnerComponent } from './listner/listner.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './login/login.component';

import { ShoutService} from './shout.service';
import {AppRoutingModule} from './app-routing.module';
import { AboutComponent } from './about.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    AppComponent,
    ShoutComponent,
    ListnerComponent,
    PageNotFoundComponent,
    LoginComponent,
    AboutComponent,
    SignupComponent,
    DialogOverviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  entryComponents: [
    DialogOverviewComponent
  ],
  providers: [ShoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
