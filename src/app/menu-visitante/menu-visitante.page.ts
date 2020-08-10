import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from "./../services/user.service";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu-visitante',
  templateUrl: './menu-visitante.page.html',
  styleUrls: ['./menu-visitante.page.scss'],
})
export class MenuVisitantePage implements OnInit {
  nomeGlobal: any;
  emailGlobal:any;
  constructor(private userServ: UserService, private router:Router, public alertController: AlertController) { }

  ngOnInit() {
    this.userServ.serviceData
      .subscribe(data => (this.nomeGlobal = data));
      this.userServ.serviceData2
      .subscribe(data2 => (this.emailGlobal = data2));
      if(this.nomeGlobal == "{ERRO}"){
        this.presentAlert("Faça o Login novamente.", "Aconteceu um Erro");
        this.router.navigate(['../login-visitante']);
      }
  }

  voltarMenu(){
    this.nomeGlobal = null;
    this.emailGlobal = null;
    this.router.navigate(['../login-visitante']);
  }
  async presentAlert(mensagemAlerta, tituloAlerta ) {
   
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: tituloAlerta,
      message: mensagemAlerta,
      buttons: ['OK']
    });
    
    await alert.present();
  }
}