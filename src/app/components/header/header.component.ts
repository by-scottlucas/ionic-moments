import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMoment } from 'src/app/models/IMoment';
import { MomentService } from '../../services/moment.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  dataAtual = new Date();

  titulo!: string;
  data: any = 'dd/mm/yyyy';
  moments: IMoment[] = [];

  modal = false;

  constructor(private momentService: MomentService, private route: Router) { }

  ngOnInit() {
    this.getMoments();
  }

  private getMoments() {
    this.momentService.getMoments()
      .subscribe(moment => {
        this.moments = moment;
      });
  }

  modalData(isOpen: boolean) {
    this.modal = isOpen;
  }

  selecionarData(): void {
    this.modalData(true);
  }

  salvarData(): void {

    // const dataFormatada = this.dataAtual.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');
    this.data = this.dataAtual;


    if (this.data.length !== 0) {
      this.modalData(false);
    }
  }

  adicionar(): void {

    if (this.titulo && this.data) {

      // const dataFormatada = this.data.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');

      this.momentService.create(this.titulo, this.data).subscribe(() => {
        this.getMoments();
      });

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
