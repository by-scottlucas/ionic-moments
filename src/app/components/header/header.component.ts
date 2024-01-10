import { Component, OnInit } from '@angular/core';
import { IEventos } from 'src/app/models/IEventos';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  titulo!: string;
  data!: string;
  listaEventos!: IEventos[];

  constructor(private crudService: CrudService) {
    this.listaEventos = this.crudService.eventos;
  }

  ngOnInit() { }

  adicionar(): void {

    if (this.titulo && this.data) {

      this.crudService.create(this.titulo, this.data);
      this.limparInputs();
      alert('Evento registrado com sucesso!');

    } else {

      alert('Por favor preencha todos os campos');

    }

  }

  limparInputs() {
    this.titulo = '';
    this.data = '';
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
