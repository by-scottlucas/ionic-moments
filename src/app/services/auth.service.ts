import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthForgetDTO } from '../models/auth/auth.forget.dto';
import { AuthLoginDTO } from '../models/auth/auth.login.dto';
import { AuthRegisterDTO } from '../models/auth/auth.register.dto';
import { AuthResetDTO } from '../models/auth/auth.reset.dto';
import { UserDTO } from '../models/user/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseApiUrl = environment.baseApiUrl;
  private api = `${this.baseApiUrl}/api/v1/auth`;

  constructor(private http: HttpClient) { }

  register(data: AuthRegisterDTO): Observable<any> {
    const url = `${this.api}/register`;
    return this.http.post<AuthRegisterDTO>(url, data, { withCredentials: true });
  }

  login(data: AuthLoginDTO): Observable<any> {
    const url = `${this.api}/login`;
    return this.http.post<AuthLoginDTO>(url, data, { withCredentials: true });
  }

  profile(user: UserDTO, token: string): Observable<any> {
    const url = `${this.api}/profile`;
    return this.http.post<any>(url, { user, token }, { withCredentials: true });
  }

  forget(data: AuthForgetDTO): Observable<any> {
    const url = `${this.api}/forget`;
    return this.http.post<AuthForgetDTO>(url, data, { withCredentials: true });
  }

  reset(data: AuthResetDTO): Observable<any> {
    const url = `${this.api}/reset`;
    return this.http.post<AuthResetDTO>(url, data, { withCredentials: true });
  }
}
