import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'
import { HttpClient } from '@angular/common/http';
import { SetControlDataCommand, SetControlDataResponse, UserData, GetUserDataCommand, ControlData, ControlDataChangeEvent} from '../types'
import { User, CreateUserCommand, CreateUserCommandResponse} from '../types'
import { from, Observable, Subject } from 'rxjs';
import { shareReplay,flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl:string = 'https://fbq7kpo0t6.execute-api.us-east-1.amazonaws.com/prd'
  // private cache: Observable<UserData>;
  public controlDataChangeSubject: Subject<ControlDataChangeEvent> = new Subject<ControlDataChangeEvent>();
  public reloadDataSubject: Subject<UserData> = new Subject<UserData>();

  constructor(private auth: AuthService,
              private http: HttpClient) { }

  async loadUserData() {
    try {
      let user = await this.auth.getCurrentUser();
      let command: GetUserDataCommand = { email : user.attributes.email };
      this.http.post<UserData>(`${this.apiUrl}/data/get`, command).subscribe(
        data=> { this.reloadDataSubject.next(data); },
        err => { this.reloadDataSubject.error(err); }
      );
    }
    catch (err)
    {
      this.reloadDataSubject.error(err);
    }
  }

  // requestUserData(): Observable<UserData> {
  //   let currentUser = from(this.auth.getCurrentUser());

  //   const proceed = flatMap((user: User) => {
  //     console.log(user);
  //     let command: GetUserDataCommand = { email : user.attributes.email };
  //     return this.http.post<UserData>(`${this.apiUrl}/data/get`, command);
  //   });
  //   return proceed(currentUser);
  // }

  // getData(ctrl): Observable<ControlData> {
  //   if (!this.cache) {
  //     this.cache = this.requestUserData().pipe(
  //       shareReplay(1)
  //     );
  //   }
  //   return this.cache.pipe(
  //     map((userData: UserData) => userData.items.find(i=>i.ctrl === ctrl))
  //   );
  // }

  setData(ctrl, id, json): Observable<SetControlDataResponse> {
    let getUserObservable = from(this.auth.getCurrentUser());

    const setDataForUser = flatMap((user: User) => {
      let command: SetControlDataCommand = { email : user.attributes.email, ctrl : ctrl, json: json};
      return this.http.post<SetControlDataResponse>(`${this.apiUrl}/data/set`, command);
    });
    let observable = setDataForUser(getUserObservable);
    observable.subscribe(
      next => this.controlDataChangeSubject.next({id: id, data: {ctrl: ctrl, json: json}})
    );
    return observable;
  }

  createUser(email, secret): Observable<CreateUserCommandResponse> {
    let command: CreateUserCommand = { email : email, secret: secret };
    return this.http.post<CreateUserCommandResponse>(`${this.apiUrl}/createuser`, command);
  }
}
