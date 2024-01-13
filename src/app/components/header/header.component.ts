import { Component, OnInit, ViewChild } from '@angular/core';
import { IEvento } from 'src/app/models/IEvento';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  dataAtual = new Date().toISOString();

  titulo!: string;
  data: string = 'dd/mm/yyyy';
  listaEventos!: IEvento[];

  modal = false;

  constructor(private crudService: CrudService) {
    this.listaEventos = this.crudService.eventos;
  }

  ngOnInit() { }

  modalData(isOpen: boolean) {
    this.modal = isOpen;
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

  adicionar(): void {

    if (this.titulo && this.data) {

      const dataFormatada = this.data.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');

      this.crudService.create(this.titulo, dataFormatada);
      this.limparInputs();
      alert('Evento registrado com sucesso!');

    } else {

      alert('Por favor preencha todos os campos');

    }

  }

  limparInputs() {
    this.titulo = '';
    this.data = 'dd/mm/aaaa';
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
