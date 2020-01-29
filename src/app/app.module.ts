import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContenteditableModule } from '@ng-stack/contenteditable';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BookComponent } from './components/book/book.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotPasswordConfirmComponent } from './components/forgot-password-confirm/forgot-password-confirm.component';
import { TextAreaComponent } from './components/book/text-area/text-area.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ListComponent } from './components/book/list/list.component';
import { EmojiComponent } from './components/book/emoji/emoji.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookComponent,
    SetPasswordComponent,
    ForgotPasswordComponent,
    ForgotPasswordConfirmComponent,
    TextAreaComponent,
    CreateUserComponent,
    ListComponent,
    EmojiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    NgbModule,
    ContenteditableModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
