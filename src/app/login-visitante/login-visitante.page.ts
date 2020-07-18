import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSlides, IonCheckbox, IonRadio, IonToggle, IonInput } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from "./../services/user.service";
import { isBuffer } from 'util';


@Component({
  selector: 'app-login-visitante',
  templateUrl: './login-visitante.page.html',
  styleUrls: ['./login-visitante.page.scss'],
 
})
export class LoginVisitantePage implements OnInit {
@ViewChild(IonSlides) slides: IonSlides;
@ViewChild(IonToggle) toggle: IonToggle;
emailLogin:string;
passwordLogin:string;
nomeregistrar:string;
emailregistrar:string;
senharegistrar:string;
tipousuario:string;
telefone:string;
ra:string;
mensagemAlerta:string;
tituloAlerta:string;

burlar:"123";
constructor(private http: HttpClient, public alertController: AlertController, private router:Router, private userServ: UserService) {
}

  ngOnInit() {
    this.ra = null;
    this.telefone = null;
    this.tipousuario = "2";
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
  
  segmentChanged(event: any){
 
  if(event.detail.value ==="register"){
    this.slides.slideNext();
  }
  else
  {
   this.slides.slidePrev();
  }
}
login(){
  if(this.burlar == "123"){
    var headers = {'contentType': 'application/json'};
    const body = { email: this.emailLogin, senha: this.passwordLogin}
    this.http.post('https://localhost:5001/usuarios/login', body,  {headers} ).subscribe(response => {
      console.log(response);
      
      if(response['tipoUsuario'] == "3"){
       //Falta redirecionamento
      }else{
       //Falta redirecionamento
       this.router.navigate(['../menu-visitante']);
       this.userServ.changeData(response['nome'],response['email']);
  
      }
    }, error => {
      this.presentAlert(error['error']['mensagem'], "Aconteceu um Erro");
    })}
  
  else{

    this.userServ.changeData("Kauan","kauan2");
    console.log("EOQ");
    this.router.navigate(['../menu-visitante']);
}}






cadastrar(){
  if(this.toggle.checked === true)
  this.tipousuario = "1";
  else
  this.tipousuario = "2";

 var headers = {'contentType': 'application/json','tipoUsuario': this.tipousuario};
 const body = { nome: this.nomeregistrar, email: this.emailregistrar, senha: this.senharegistrar, ra: this.ra, telefone: this.telefone }
 this.http.post('https://localhost:5001/usuarios/cadastro', body,  {headers} ).subscribe(response => {
  this.presentAlert("Usuario Criado com Sucesso.", "Bem Vindo")
  this.slides.slidePrev();
  document.getElementById("idLogin").click();
 }, error => {
  this.presentAlert(error['error']['mensagem'], "Aconteceu um Erro");
 })
}

  checkboxRadio() {
    var elemento3 = document.getElementById("classTelefone");
    var elemento = document.getElementById("classRA");
    var elemento2 = document.getElementById("labelnao");
    var elemento4 = document.getElementById("labelsim");
    if(this.toggle.checked === true){
      elemento3.hidden=true;
      this.telefone = null;
      elemento.hidden=false;
      elemento4.style.color = "green" ;
      elemento2.style.color = "White" ;
    } else if(this.toggle.checked === false){
      elemento3.hidden=false;
      elemento.hidden=true;
      elemento4.style.color = "white" ;
      elemento2.style.color = "green" ;
      this.ra = null
    }
    
  }


}
