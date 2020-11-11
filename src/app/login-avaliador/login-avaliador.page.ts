import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSlides, IonCheckbox, IonRadio, IonToggle, IonInput } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from "./../services/user.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-avaliador',
  templateUrl: './login-avaliador.page.html',
  styleUrls: ['./login-avaliador.page.scss'],
})
export class LoginAvaliadorPage implements OnInit {
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
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
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
  // Sistema de Login
  login(){
    var elemento = document.getElementById("labelconectando");
    elemento.hidden = false;
    var elemento2 = document.getElementById("labelconectando2");
    elemento2.hidden = false;
      var headers = {'contentType': 'application/json'};
      const body = { email: this.emailLogin, senha: this.passwordLogin}
      this.http.post('https://usuariosbackend2.azurewebsites.net/usuarios/login', body,  {headers} ).subscribe(response => {
        if(response['tipoUsuario'] == "3"){
         this.router.navigate(['../menu-avaliador']);
         this.userServ.changeData(response['nome'],response['idUsuario']);
         elemento.hidden = true;
         elemento2.hidden = true;
        }else{
         // Retorna para Menu Principal
         this.router.navigate(['../home']);
         this.presentAlert("Essa conta não é uma conta Avaliador.", "Aconteceu um Erro");
         elemento.hidden = true;
         elemento2.hidden = true;
        }
      }, error => {
        this.presentAlert(error['error']['mensagem'], "Aconteceu um Erro");
        elemento.hidden = true;
        elemento2.hidden = true;
      })
    }
  
  }
  