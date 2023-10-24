import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginDto} from "../../models/login/login-dto";
import {map, Observable} from "rxjs";
import {LoginResponse} from "../../models/login/login-response";
import {ApiResponseModel} from "../../models/api-reponse-dtos";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private client: HttpClient) {}

  login(user: LoginDto): Observable<LoginResponse> {
    return this.client.post<LoginResponse>('https://localhost:7111/api/Account/login', user)
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
    localStorage.removeItem('email');
  }
}
