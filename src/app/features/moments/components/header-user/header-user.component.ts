import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
})
export class HeaderUserComponent implements OnInit {
  avatarImage =
    'https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg';
  @Input() username!: string;

  constructor() {}

  ngOnInit() {}
}
