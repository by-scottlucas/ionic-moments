import { Component, OnInit } from '@angular/core';
import { CalendarDays, Home, Plus, Search, UserRound } from 'lucide-angular';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.page.html',
  styleUrls: ['./moments.page.scss'],
})
export class MomentsPage implements OnInit {
  readonly searchIcon = Search;
  readonly itemIcon = CalendarDays;

  user = {
    name: 'Lucas Silva',
    avatar:
      'https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg',
  };

  moments = [
    { date: '02/01/2025', title: 'Comecei o curso de desenvolvimento mobile' },
    {
      date: '15/02/2025',
      title: 'Primeiro aplicativo publicado na Play Store',
    },
    { date: '08/03/2025', title: 'Vi o nascer do sol na praia' },
    { date: '21/04/2025', title: 'Fiz minha primeira viagem sozinho' },
    { date: '10/06/2025', title: 'Aprendi a tocar violão' },
    {
      date: '28/07/2025',
      title: 'Ganhei meu primeiro projeto como freelancer',
    },
    { date: '14/08/2025', title: 'Completei 6 meses de academia' },
    { date: '30/09/2025', title: 'Ajudei um amigo a criar seu portfólio' },
    { date: '25/10/2025', title: 'Passei o fim de semana com a família' },
    { date: '11/11/2025', title: 'Aprendi desenho realista' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
