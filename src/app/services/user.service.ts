import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../models/user/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseApiUrl = environment.baseApiUrl;
  private api = `${this.baseApiUrl}/api/v1/users`;

  constructor(private http: HttpClient) { }

  list(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.api);
  }

  create(data: UserDTO) {
    return this.http.post<UserDTO>(this.api, data);
  }

  read(id: number): Observable<UserDTO> {
    const url = `${this.api}/${id}`;
    return this.http.get<UserDTO>(url);
  }

  update(id: number, data: UserDTO): Observable<UserDTO> {
    const url = `${this.api}/${id}`;
    return this.http.patch<UserDTO>(url, data);
  }

  delete(id: number): Observable<void> {
    const url = `${this.api}/${id}`;
    return this.http.delete<void>(url);
  }

}
