import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MaterialModule} from './material/material.module';
import { ShoutComponent } from './shout/shout.component';
import { ListnerComponent } from './listner/listner.component';
import { ShoutService} from './shout.service';


@NgModule({
  declarations: [
    AppComponent,
    ShoutComponent,
    ListnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [ShoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
