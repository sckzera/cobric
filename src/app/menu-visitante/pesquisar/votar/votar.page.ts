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
    var elemento = document.getElementById("labelconectando14");
    elemento.hidden = false;
    var elemento2 = document.getElementById("labelconectando13");
    elemento2.hidden = false;
      var headers = {'contentType': 'application/json'};
      const body = { idGradeamento: this.idGradeamento, idUsuario: this.idUsuario}
      this.http.post('https://votacaobackend.azurewebsites.net/votacao', body,  {headers} ).subscribe(response => {
        var headers = {'contentType': 'application/json'};
      const body = { idGradeamento: this.idGradeamento, totalVotos: this.totalVotos, tituloTrabalho: this.tituloTrabalho}
      this.http.post('https://votacaobackend.azurewebsites.net/votos', body,  {headers} ).subscribe(response => {
        elemento2.hidden = true;
        elemento.hidden = true;
        this.presentAlert(this.tituloTrabalho , "Obrigado! Você votou no grupo:");
        
      }, error => {
        elemento2.hidden = true;
        elemento.hidden = true;
        this.presentAlert("Por gentileza, entre novamente.", "Aconteceu um Erro");
        this.router.navigate(['../../home']);
      })
        
     }, error => {
      elemento2.hidden = true;
      elemento.hidden = true;
      this.presentAlert("Se for um erro, contate um Organizador.", "Parece que você já votou neste grupo!");
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
