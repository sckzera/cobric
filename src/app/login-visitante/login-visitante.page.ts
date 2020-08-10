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
constructor(private http: HttpClient, public alertController: AlertController, private router:Router, private userServ: UserService) {
}

  ngOnInit() {
    // Setando para quando iniciar, os RA e Tipo de Telefone vir Nulo obrigando o cadastramento de um ou outro.
    this.ra = null;
    this.telefone = null;
    // Setando o tipo de usuario ao iniciar, já que o primario é Não Aluno.
    this.tipousuario = "2";
  }
  // Metodo de Alerta
  async presentAlert(mensagemAlerta, tituloAlerta ) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: tituloAlerta,
      message: mensagemAlerta,
      buttons: ['OK']
    });
    
    await alert.present();
   
  }
  // Evento para Transição entre LOGIN e Cadastrar "Animação".
  segmentChanged(event: any){
 
  if(event.detail.value ==="register"){
    this.slides.slideNext();
  }
  else
  {
   this.slides.slidePrev();
  }
}
// Sistema de Login
login(){
    var headers = {'contentType': 'application/json'};
    const body = { email: this.emailLogin, senha: this.passwordLogin}
    this.http.post('https://localhost:5050/usuarios/login', body,  {headers} ).subscribe(response => {
      if(response['tipoUsuario'] == "3"){
       // this.presentAlert("Utilize o Menu Avaliador para logar corretamente.", "Caro Avaliador");
       // this.router.navigate(['../menu-avaliador']);
       // this.userServ.changeData(response['nome'],response['idUsuario']);
      }else{
       // Caso o Login conferir, redirecionando, e salvando os dados.
       this.router.navigate(['../menu-visitante']);
       this.userServ.changeData(response['nome'],response['idUsuario']);
  
      }
    }, error => {
      this.presentAlert(error['error']['mensagem'], "Aconteceu um Erro");
    })
  }

// Sistema de Cadastror - Se for 1 é Aluno, 2 Não aluno
cadastrar(){
  if(this.toggle.checked === true)
  this.tipousuario = "1";
  else
  this.tipousuario = "2";

 var headers = {'contentType': 'application/json','tipoUsuario': this.tipousuario};
 const body = { nome: this.nomeregistrar, email: this.emailregistrar, senha: this.senharegistrar, ra: this.ra, telefone: this.telefone }
 this.http.post('https://localhost:5050/usuarios/cadastro', body,  {headers} ).subscribe(response => {
  this.presentAlert("Usuario Criado com Sucesso.", "Bem Vindo")
  this.slides.slidePrev();
  document.getElementById("idLogin").click();
 }, error => {
  this.presentAlert(error['error']['mensagem'], "Aconteceu um Erro");
 })
}
// Metodo para alterar as views, caso seja aluno ou nao.
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
