import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  url = 'http://localhost:3000/user';
  constructor(private _http: HttpClient) {}

  registerUserData(data: any) {
    return this._http.post<any>(this.url, data);
  }

  getUserData(): Observable<[]> {
    return this._http.get<[]>(this.url);
  }
}
