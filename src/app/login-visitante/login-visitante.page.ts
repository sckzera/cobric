import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSlides, IonCheckbox, IonRadio, IonToggle, IonInput } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from "./../services/user.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-visitante',
  templateUrl: './login-visitante.page.html',
  styleUrls: ['./login-visitante.page.scss'],
 
})
export class LoginVisitantePage implements OnInit {
  clicked:boolean;
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
registerForm: FormGroup;
submitted = false;
recuperarSenha:string;
constructor(private http: HttpClient, public alertController: AlertController, private router:Router, private userServ: UserService, private formBuilder: FormBuilder) {
}

  ngOnInit() {
    // Setando para quando iniciar, os RA e Tipo de Telefone vir Nulo obrigando o cadastramento de um ou outro.
    this.ra = null;
    this.telefone = null;
    // Setando o tipo de usuario ao iniciar, já que o primario é Não Aluno.
    this.tipousuario = "2";
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefone: ['', [Validators.pattern("^[0-9]*$")]],
      ra: ['']
      
  });
  }
  get f() { return this.registerForm.controls; }
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
  onSubmit() {
    this.submitted = true;
    this.clicked = false;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    else{
      this.clicked = true;
      this.cadastrar();
    }
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
  var elemento = document.getElementById("labelconectando");
  elemento.hidden = false;
  var elemento2 = document.getElementById("labelconectando2");
  elemento2.hidden = false;
    var headers = {'contentType': 'application/json'};
    const body = { email: this.emailLogin.toLowerCase(), senha: this.passwordLogin}
    this.http.post('https://usuariosbackend2.azurewebsites.net/usuarios/login', body,  {headers} ).subscribe(response => {
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
      elemento.hidden = true;
      elemento2.hidden = true;
    })
  }

  actionMethod(){
    this.cadastrar();
  } 

// Sistema de Cadastror - Se for 1 é Aluno, 2 Não aluno
cadastrar(){
  var elemento77 = document.getElementById("labelconectando77");
    elemento77.hidden = false;
    var elemento78 = document.getElementById("labelconectando78");
    elemento78.hidden = false;
  if(this.toggle.checked === true)
  this.tipousuario = "1";
  else
  this.tipousuario = "2";
 var headers = {'contentType': 'application/json','tipoUsuario': this.tipousuario};
 const body = { nome: this.nomeregistrar.toUpperCase(), email: this.emailregistrar.toLowerCase(), senha: this.senharegistrar, ra: this.ra, telefone: this.telefone }
 this.http.post('https://usuariosbackend2.azurewebsites.net/usuarios/cadastro', body,  {headers} ).subscribe(response => {
  this.presentAlert("Usuário criado com Sucesso.", "Bem-Vindo")
  this.slides.slidePrev();
  elemento77.hidden = true;
  elemento78.hidden = true;
  document.getElementById("idLogin").click();
  this.clicked = false;
 }, error => {
  this.presentAlert(error['error']['mensagem'], "Aconteceu um Erro");
  this.clicked = false;
  elemento77.hidden = true;
  elemento78.hidden = true;
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

  EsqueceuSenha(){
   this.presentAlertConfirm()

  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Recuperação de Senha',
      message: 'Por favor, informe o seu e-mail abaixo para que seja enviado um e-mail contendo a sua senha',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Digite seu e-mail'
        }
      ],
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Sim',
          handler: data => {
            const body = { destino: data.name1.toLowerCase() }
            this.http.post('https://usuariosbackend2.azurewebsites.net/usuarios/recuperar', body ).subscribe(response => {
              this.presentAlert("Senha enviado para :" + body.destino, "E-mail de Recuperação enviado com Sucesso");
           
          
        },error => {
      if(error['error'] == null){
        this.presentAlert("Desculpa mas não conseguimos identificar o erro.", "Aconteceu um Erro");
      }
      else{
        this.presentAlert(error['error'], "Aconteceu um Erro");
      }
        })
      }}
      ]
    });
  
    await alert.present();
  }
}
