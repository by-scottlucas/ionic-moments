import { Component, OnInit } from '@angular/core';
import { IEventos } from 'src/app/models/IEventos';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  listaEventos!: IEventos[];

  modal: boolean = false;

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(private crudService: CrudService) {
    this.listaEventos = this.crudService.eventos;
  }

  ngOnInit() { }

  editar(): void {
    alert('Funfou!');
    this.setOpen(true);
  }

}
