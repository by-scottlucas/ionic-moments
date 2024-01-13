import { Component, OnInit } from '@angular/core';
import { IEvento } from 'src/app/models/IEvento';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  dataAtual = new Date().toISOString();

  index: number | null = null
  titulo!: string;
  data!: string;
  listaEventos!: IEvento[];

  modal = false;
  modalDate = false;

  constructor(private crudService: CrudService) {
    this.listaEventos = this.crudService.eventos;
  }

  ngOnInit() { }

  modalEdicao(open: boolean) {
    this.modal = open;
  }

  modalData(open: boolean) {
    this.modalDate = open;
  }

  selecionarData(): void {
    this.modalData(true);
  }

  salvarData(): void {

    const dataFormatada = this.dataAtual.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');
    this.data = dataFormatada;


    if (this.data.length !== 0) {
      this.modalData(false);
    }
  }

  editar(evento: IEvento): void {
    this.index = this.listaEventos.indexOf(evento);
    this.titulo = evento.titulo;
    this.data = evento.data;

    this.modalEdicao(true);
  }

  salvarEdicao(): void {
    if (this.index !== null && this.titulo) {
      this.crudService.update(this.index, this.titulo, this.data);
    }
    this.modalEdicao(false);

  }

  excluir(index: number): void {
    this.crudService.delete(index);
  }

  formatarData(event: any): void {
    let input = event.target.value;

    // Remover caracteres não numéricos
    input = input.replace(/\D/g, '');

    // Adicionar a máscara
    if (input.length <= 2) {
      this.data = input;
    } else if (input.length <= 4) {
      this.data = `${input.substring(0, 2)}/${input.substring(2)}`;
    } else if (input.length <= 8) {
      this.data = `${input.substring(0, 2)}/${input.substring(2, 4)}/${input.substring(4, 8)}`;
    } else {
      // Lidar com entrada maior que 8 caracteres (opcional)
      input = input.substring(0, 8);
      this.data = `${input.substring(0, 2)}/${input.substring(2, 4)}/${input.substring(4, 8)}`;
    }
  }

}
