import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'
import { HttpClient } from '@angular/common/http';
import { SetDataCommand, GetDataCommand, GetDataCommandResponse, SetDataCommandResponse, UserData, GetUserDataCommand, ControlData} from '../types'
import { User, CreateUserCommand, CreateUserCommandResponse} from '../types'
import { from, Observable } from 'rxjs';
import { shareReplay,flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl:string = 'https://fbq7kpo0t6.execute-api.us-east-1.amazonaws.com/prd'
  private cache: Observable<UserData>;

  constructor(private auth: AuthService,
              private http: HttpClient) { }

  requestUserData(): Observable<UserData> {
    let user = from(this.auth.getCurrentUser());

    const proceed = flatMap((user: User) => {
      let command: GetUserDataCommand = { email : user.attributes.email };
      return this.http.post<UserData>(`${this.apiUrl}/data/get`, command);
    });
    return proceed(user);
  }

  getData(ctrl): Observable<ControlData> {
    if (!this.cache) {
      this.cache = this.requestUserData().pipe(
        shareReplay(1)
      );
    }
    return this.cache.pipe(
      map((userData: UserData) => userData.items.find(i=>i.ctrl === ctrl))
    );
  }

//   getData(ctrl): Observable<GetDataCommandResponse> {
//     let user = from(this.auth.getCurrentUser());
//
//     const proceed = flatMap((user: User) => {
//       let command: GetDataCommand = { email : user.attributes.email, ctrl : ctrl};
//       return this.http.post<GetDataCommandResponse>(`${this.apiUrl}/data/get`, command);
//     });
//     return proceed(user);
//   }

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
