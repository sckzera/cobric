import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-votar',
  templateUrl: './votar.page.html',
  styleUrls: ['./votar.page.scss'],
})
export class VotarPage implements OnInit {
tituloGlobal: any;
aleatorio:[];
newTrustFormVisible = false;
mensagemAlerta:string;
tituloAlerta:string;
anterior = "";
idGradeamento:string;
vetorUser:any;
idUsuario:any;
totalVotos = 0;
tituloTrabalho:string;
  constructor(private userServ: UserService, private router:Router, public alertController: AlertController, private http: HttpClient) { }

  ngOnInit() {
    this.userServ.serviceData3
    .subscribe(data =>(this.tituloGlobal = data));
    this.userServ.serviceData2
    .subscribe(data =>(this.vetorUser = data));
    this.tituloTrabalho = this.tituloGlobal["titulo"];
    this.idGradeamento = this.tituloGlobal["idGradeamento"];
   this.idUsuario = this.vetorUser;
   if(this.idUsuario=="{ERRO}" || this.idGradeamento =="{ERRO}" || this.tituloTrabalho =="{ERRO}"){
    this.presentAlert("Faça o Login novamente.", "Aconteceu um Erro");
    this.router.navigate(['../login-visitante']);
   }
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
      var headers = {'contentType': 'application/json'};
      const body = { idGradeamento: this.idGradeamento, idUsuario: this.idUsuario}
      this.http.post('https://localhost:5001/votacao', body,  {headers} ).subscribe(response => {
        var headers = {'contentType': 'application/json'};
      const body = { idGradeamento: this.idGradeamento, totalVotos: this.totalVotos, tituloTrabalho: this.tituloTrabalho}
      this.http.post('https://localhost:5001/votos', body,  {headers} ).subscribe(response => {
        this.presentAlert(this.tituloTrabalho , "Voce votou no grupo abaixo, Obrigado!");
      }, error => {
        this.presentAlert("Reabra o aplicativo e tente novamente.", "Aconteceu um Erro Inesperado");
      })
        
     }, error => {
      this.presentAlert("Contate um organizador.", " Parece que voce já votou nesse grupo!");
      })}
     
  
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
