import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AmplifyService } from 'aws-amplify-angular';
import { BookComponent } from './components/book/book.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotPasswordConfirmComponent } from './components/forgot-password-confirm/forgot-password-confirm.component';
import { TextAreaComponent } from './components/book/text-area/text-area.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookComponent,
    SetPasswordComponent,
    ForgotPasswordComponent,
    ForgotPasswordConfirmComponent,
    TextAreaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
//     AmplifyAngularModule,
    ReactiveFormsModule,
  ],
  providers: [
    AmplifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
