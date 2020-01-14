import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { BookComponent } from './components/book/book.component';
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'setPassword',
    component: SetPasswordComponent
  },
  {
    path: '',
    component: BookComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
