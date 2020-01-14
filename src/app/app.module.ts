import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { BookComponent } from './components/book/book.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAngularModule,
    ReactiveFormsModule,
  ],
  providers: [
    AmplifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
