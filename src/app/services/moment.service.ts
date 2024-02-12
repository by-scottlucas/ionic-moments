import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMoment } from 'src/app/models/IMoment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  private baseApiUrl = environment.baseApiUrl;
  private api = `${this.baseApiUrl}/api/v1/moments`;

  constructor(private http: HttpClient) { }

  getMoments(): Observable<IMoment[]> {
    return this.http.get<IMoment[]>(this.api);
  }

  create(moment: IMoment) {
    return this.http.post<IMoment>(this.api, moment);
  }

  read(id: number): Observable<IMoment> {
    const payload = `${this.api}/${id}`;
    return this.http.get<IMoment>(payload);
  }

  update(id: number, data: IMoment) {
    const payload = `${this.api}/${id}`;
    return this.http.put<IMoment>(payload, data);
  }

  delete(id: number) {
    const payload = `${this.api}/${id}`;
    return this.http.delete(payload);
  }
}
