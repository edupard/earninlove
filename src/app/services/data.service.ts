import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'
import { HttpClient } from '@angular/common/http';
import { SetDataCommand, GetDataCommand, GetDataCommandResponse, SetDataCommandResponse} from '../types'
import { User, CreateUserCommand, CreateUserCommandResponse} from '../types'
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

  getData(ctrl): Observable<GetDataCommandResponse> {
    let user = from(this.auth.getCurrentUser());

    const proceed = flatMap((user: User) => {
      let command: GetDataCommand = { email : user.attributes.email, ctrl : ctrl};
      return this.http.post<GetDataCommandResponse>(`${this.apiUrl}/data/get`, command);
    });
    return proceed(user);
  }

  setData(ctrl, json): Observable<SetDataCommandResponse> {
    let user = from(this.auth.getCurrentUser());

    const proceed = flatMap((user: User) => {
      let command: SetDataCommand = { email : user.attributes.email, ctrl : ctrl, json: json};
      return this.http.post<SetDataCommandResponse>(`${this.apiUrl}/data/set`, command);
    });
    return proceed(user);
  }

  createUser(email, secret): Observable<CreateUserCommandResponse> {
    let command: CreateUserCommand = { email : email, secret: secret };
    return this.http.post<CreateUserCommandResponse>(`${this.apiUrl}/createuser`, command);
  }
}
