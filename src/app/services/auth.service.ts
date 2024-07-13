import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthRegisterDTO } from '../models/auth/auth.register.dto';
import { Observable } from 'rxjs';
import { AuthLoginDTO } from '../models/auth/auth.login.dto';
import { UserDTO } from '../models/user/user.dto';
import { AuthForgetDTO } from '../models/auth/auth.forget.dto';
import { AuthResetDTO } from '../models/auth/auth.reset.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseApiUrl = environment.baseApiUrl;
  private api = `${this.baseApiUrl}/api/v1/auth`;

  constructor(private http: HttpClient) { }

  async register(data: AuthRegisterDTO) {
    const url = `${this.api}/register`;
    return this.http.post<AuthRegisterDTO>(url, data);
  }

  login(data: AuthLoginDTO): Observable<any> {
    const url = `${this.api}/login`;
    return this.http.post<AuthLoginDTO>(url, data);
  }

  profile(user: UserDTO, token: string) {
    const url = `${this.api}/profile`;
    return this.http.post<any>(url, { user, token });
  }

  forget(data: AuthForgetDTO) {
    const url = `${this.api}/forget`;
    return this.http.post<AuthForgetDTO>(url, data);
  }

  reset(data: AuthResetDTO) {
    const url = `${this.api}/reset`;
    return this.http.post<AuthResetDTO>(url, data);
  }

}
