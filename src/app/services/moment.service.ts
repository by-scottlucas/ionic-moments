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

  create(titulo: string, data: string): Observable<IMoment> {
    const novoMomento: IMoment = { titulo, data };
    return this.http.post<IMoment>(this.api, novoMomento);
  }

  read(id: number): Observable<IMoment> {
    const url = `${this.api}/${id}`;
    return this.http.get<IMoment>(url);
  }

  update(id: number, titulo: string, data: string): Observable<IMoment> {
    const url = `${this.api}/${id}`;
    const eventoAtualizado: IMoment = { id, titulo, data };
    return this.http.put<IMoment>(url, eventoAtualizado);
  }

  delete(id: any) {
    const url = `${this.api}/${id}`;
    return this.http.delete(url);
  }
}
