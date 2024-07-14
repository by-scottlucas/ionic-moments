import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  sair() {
    this.authService.logout().subscribe(response => {
      console.log(response)
      sessionStorage.clear()
      this.router.navigate(['/']);
      this.modalCtrl.dismiss()
    })
  }

}
