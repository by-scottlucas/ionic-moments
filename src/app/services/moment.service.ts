import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MomentDTO } from 'src/app/models/moment/moment.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  private baseApiUrl = environment.baseApiUrl;
  private api = `${this.baseApiUrl}/api/v1/moments`;

  constructor(private http: HttpClient) { }

  list(): Observable<MomentDTO[]> {
    this.ordemDecrescente();
    return this.http.get<MomentDTO[]>(this.api);
  }

  create(moment: MomentDTO) {
    return this.http.post<MomentDTO>(this.api, moment);
  }

  read(id: number): Observable<MomentDTO[]> {
    const payload = `${this.api}/${id}`;
    return this.http.get<MomentDTO[]>(payload);
  }

  update(id: number, data: MomentDTO) {
    const payload = `${this.api}/${id}`;
    return this.http.patch<MomentDTO>(payload, data);
  }

  delete(id: number) {
    const payload = `${this.api}/${id}`;
    return this.http.delete(payload);
  }

  private ordemDecrescente() {
    const moments: MomentDTO[] = [];
    moments.sort((a, b) => {
      return new Date(b.data).getTime() - new Date(a.data).getTime();
    })
  }

}
