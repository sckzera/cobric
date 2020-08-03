import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Console } from 'console';

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
idGradeamento:string;
// USUARIO UNICO PARA TESTE - TEM QUE SER RETIRADO
idUsuario="3fa85f64-5717-4562-b3fc-2c963f66afa3";
totalVotos = 0;
tituloTrabalho:string;
  constructor(private userServ: UserService, private router:Router, public alertController: AlertController, private http: HttpClient) { }

  ngOnInit() {
    this.userServ.serviceData3
    .subscribe(data =>(this.tituloGlobal = data, console.log(data)));
    this.tituloTrabalho = this.tituloGlobal["titulo"];
    this.idGradeamento = this.tituloGlobal["idGradeamento"];
   
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
      const body = { idGradeamento: this.idGradeamento, idUsuario: this.idUsuario, totalVotos: this.totalVotos}
      this.http.post('https://localhost:5001/votacao', body,  {headers} ).subscribe(response => {
        var headers = {'contentType': 'application/json'};
      const body = { idGradeamento: this.idGradeamento, totalVotos: this.totalVotos, tituloTrabalho: this.tituloTrabalho}
      this.http.post('https://localhost:5001/votos', body,  {headers} ).subscribe(response => {
        this.presentAlert(this.tituloTrabalho , "Voce votou no grupo abaixo, Obrigado!");
      }, error => {
        this.presentAlert("Reabra o aplicativo e tente novamente.", "Aconteceu um Erro Inesperado");
        console.log("DEU ERRO 1 " + error['error']);
      })
        
     }, error => {
      this.presentAlert(this.tituloTrabalho , error['error']['mensagem'] + " Se achar que for um problema, contate a equipe.");
        console.log("DEU ERRO 2 " + error['error']['mensagem']);
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
