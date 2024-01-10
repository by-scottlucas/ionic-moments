import { Injectable } from '@angular/core';
import { IEventos } from 'src/app/models/IEventos';
import { StorageService } from 'src/app/services/local-storage.service';

const eventosStorageKey = 'Eventos';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  eventos: IEventos[] = [];

  constructor(private storageService: StorageService) {
    this.eventos = this.storageService.getData(eventosStorageKey) || [];
  }

  private save(): void {
    try {
      this.storageService.setData(eventosStorageKey, this.eventos);
    } catch (error) {
      console.log('Não foi possível salvar o evento. Erro: ', error);
    }
  }

  create(titulo: string, data: string): void {
    const novoEvento: IEventos = { titulo, data };
    this.eventos.push(novoEvento);
    this.save();
  }

  read(index: number): IEventos {
    return this.eventos[index];
  }

  update(index: number, titulo: string, data: string): void {
    if (index >= 0 && this.eventos.length) {
      this.eventos[index] = { titulo, data };
      this.save();
    }
  }

  delete(index: number): void {
    this.eventos.splice(index, 1);
    this.save();
  }

}
