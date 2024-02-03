import { Injectable } from '@angular/core';
import { IMoment } from 'src/app/models/IMoment';
import { StorageService } from 'src/app/services/local-storage.service';

const eventosStorageKey = 'Lista_Eventos';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  moments: IMoment[] = [];

  constructor(private storageService: StorageService) {
    this.moments = this.storageService.getData(eventosStorageKey) || [];
  }

  private save(): void {
    try {
      this.storageService.setData(eventosStorageKey, this.moments);
    } catch (error) {
      console.log('Não foi possível salvar o evento. Erro: ', error);
    }
  }

  create(titulo: string, data: string): void {
    const novoEvento: IMoment = { titulo, data };
    this.moments.unshift(novoEvento);
    this.save();
  }

  read(index: number): IMoment {
    return this.moments[index];
  }

  update(index: number, titulo: string, data: string): void {
    if (index >= 0 && this.moments.length) {
      this.moments[index] = { titulo, data };
      this.save();
    }
  }

  delete(index: number): void {
    this.moments.splice(index, 1);
    this.save();
  }

}
