import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'
import { HttpClient } from '@angular/common/http';
import {SetTextCommand, GetTextCommand, GetTextCommandResponse, User} from '../types'
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 apiUrl = 'https://fbq7kpo0t6.execute-api.us-east-1.amazonaws.com/prd'

  getUrl = 'assets/response.json';
  postUrl = "google.com"

  constructor(private auth: AuthService,
              private http: HttpClient) { }

  getText(ctrl): Observable<GetTextCommandResponse> {
    let user = from(this.auth.getCurrentUser());

    const proceed = flatMap((user: User) => {
      let command: GetTextCommand = { user : user.attributes.email, ctrl : ctrl};
      return this.http.post<GetTextCommandResponse>(`${this.apiUrl}/gettext`, command);
    });
    return proceed(user);
  }

  setText(ctrl, text): Observable<any> {
    let user = from(this.auth.getCurrentUser());

    const proceed = flatMap((user: User) => {
      let command: GetTextCommand = { user : user.attributes.email, ctrl : ctrl};
      return this.http.post<GetTextCommandResponse>(`${this.apiUrl}/settext`, command);
    });
    return proceed(user);
  }
}
