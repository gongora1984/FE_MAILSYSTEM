import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginDto} from "../../models/login/login-dto";
import {map, Observable} from "rxjs";
import {LoginResponse} from "../../models/login/login-response";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private client: HttpClient) {}

  login(user: LoginDto): Observable<LoginResponse> {
    const apiUrl = environment.apiBaseUrl;
    const loginUrl = environment.endpoints.login.url
    return this.client.post<LoginResponse>(`${apiUrl}/${loginUrl}`, user)
      .pipe(
        map(res => {
          if (!res.loginStatus) {
            throw Error("LoginDto Failed.");
          }
          return res;
        })
      );
  }

  setLocalStorage(data: any): void {
    localStorage.setItem('authToken', data);
  }

  removeLocalStorge(): void {
    localStorage.removeItem('authToken');
  }
}
