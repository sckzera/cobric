import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-votar',
  templateUrl: './votar.page.html',
  styleUrls: ['./votar.page.scss'],
})
export class VotarPage implements OnInit {
tituloGlobal: any;
aleatorio:[];
//newTrustFormVisible: boolean;
newTrustFormVisible = false;
mensagemAlerta:string;
tituloAlerta:string;
anterior = "";
  constructor(private userServ: UserService, private router:Router, public alertController: AlertController) { }

  ngOnInit() {
    this.userServ.serviceData3
    .subscribe(data =>(this.tituloGlobal = data));
  }
  voltarMenu(){

    this.router.navigate(['../menu-visitante/pesquisar']);
  }

  MenuHidden(){
    
    if(this.newTrustFormVisible == false){
      this.newTrustFormVisible = true;
    }
    else{
    this.newTrustFormVisible = false;
    }
    
  }
  votar(){
    if(this.tituloGlobal.titulo == this.anterior){
    this.presentAlert(this.tituloGlobal.titulo,"ERRO! Voce ja votou no grupo abaixo!");
    }
    else{
       this.anterior = this.tituloGlobal.titulo 
      this.presentAlert(this.tituloGlobal.titulo,"Voce votou no grupo:");

    }
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
