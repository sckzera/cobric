import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import _ from 'lodash';
import { UserService } from "../../services/user.service";
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {
trabalhos: Array<{titulo: string, codigo: string, autores:string, orientador:string, data:string}>
alltrabalhos:any;
queryText:string;
date: any = new Date().getDate().toString();

  constructor(private router:Router, private userServ: UserService, private http: HttpClient, public alertController: AlertController, public loadingController: LoadingController) { 
    this.queryText = '';
    const headers = {'accept': 'application/json'}
    this.http.get<any>('https://gradeamentobackend.azurewebsites.net/gradeamentos' , { headers }).subscribe(data => {
      this.presentLoading("start");
        this.trabalhos = data;
        this.alltrabalhos = this.trabalhos; 
       }, error => {
        this.presentAlert("Ao carregar o dados, reabra o Aplicativo.", "Aconteceu um Erro:");
    }); 
    this.presentLoading("stop");

  }

  ngOnInit() {
   // if(this.date == "1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9"){
//this.date = "0"+this.date;
  //  }
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

  filterTrabalho(cid:any){
  let val = cid.target.value;
  if(val && val.trim() != ''){
    this.trabalhos = _.values(this.alltrabalhos);
    this.trabalhos = this.trabalhos.filter((trabalho) => {
      return (trabalho.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
  else{
    this.trabalhos = this.alltrabalhos;
  }
  }

  voltarMenu(){
    this.router.navigate(['../menu-visitante']);
  }
  // VERIFICA SE PODE DEPENDENDO DA DATA, PODE OU NAO VOLTAR
  SelecionaTrabalho(dataTrabalho: any){
    
   // console.log("Minha DATA " + dataTrabalho.data);
  //  console.log("SISTEMA "+ this.date);
  //  if(dataTrabalho.data.includes(this.date)){
    this.userServ.changeData2(dataTrabalho);
    this.router.navigate(['/menu-visitante/pesquisar/votar']);
  //  }
    
   /* else{
      this.presentAlert("Pois esse trabalho ainda não foi apresentado", "Voce não pode votar no grupo:" + dataTrabalho.titulo);
    }*/
  }

  async presentLoading(a:any) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Estamos consultado os dados...',
      duration: 5000
    });
  if(a=="start"){
    await loading.present();}
  else{
    await loading.onDidDismiss();
  }
  }
}
