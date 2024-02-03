import { Component, OnInit } from '@angular/core';
import { IMoment } from 'src/app/models/IMoment';
import { MomentService } from '../../services/moment.service';

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
  moments: IMoment[] = [];

  modal = false;
  modalDate = false;

  search!: string;

  constructor(private momentService: MomentService) {
    this.moments = this.momentService.moments;
  }

  ngOnInit() { }

  searchInput(event: any) {
    this.search = event.target.value.trim().toLowerCase();

    if (this.search === '') {
      this.moments = this.momentService.moments;
    } else {
      const filtroMoments = this.momentService.moments.filter((moment) => {
        return moment.titulo.toLowerCase().includes(this.search);
      });

      if (filtroMoments.length === 0) {
        alert("Nenhuma movimentação encontrada");
        this.search = '';
      } else {
        this.moments = filtroMoments;
      }
    }
  }

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

  editar(moment: IMoment): void {
    this.index = this.moments.indexOf(moment);
    this.titulo = moment.titulo;
    this.data = moment.data;

    this.modalEdicao(true);
  }

  salvarEdicao(): void {
    if (this.index !== null && this.titulo) {
      this.momentService.update(this.index, this.titulo, this.data);
    }
    this.modalEdicao(false);

  }

  excluir(index: number): void {
    this.momentService.delete(index);
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
