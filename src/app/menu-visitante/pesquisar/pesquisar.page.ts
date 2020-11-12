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
trabalhos: Array<{titulo: string, codigo: string, autor:string, orientador:string, data:string}>
alltrabalhos:any;
queryText:string;
date: any = new Date().getDate().toString();

  constructor(private router:Router, private userServ: UserService, private http: HttpClient, public alertController: AlertController, public loadingController: LoadingController) { 
   this.showLoader();

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

CarregaLista(){
  this.queryText = '';
  const headers = {'accept': 'application/json'}
  this.http.get<any>('https://gradeamentobackend2.azurewebsites.net/gradeamentos' , { headers }).subscribe(data => {
      this.trabalhos = data;
      this.alltrabalhos = this.trabalhos; 
      this.hideLoader();
     }, error => {
       this.hideLoader();
      this.presentAlert("Desculpe, não conseguimos consultar os dados! Por gentileza, entre novamente.", "Aconteceu um Erro");
  }); 
}

  filterTrabalho(cid:any){
  let val = cid.target.value;
  if(val && val.trim() != ''){
    this.trabalhos = _.values(this.alltrabalhos);
    this.trabalhos = this.trabalhos.filter((trabalho) => {
      return ((trabalho.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1) || (trabalho.autor.toLowerCase().indexOf(val.toLowerCase()) > -1) || (trabalho.orientador.toLowerCase().indexOf(val.toLowerCase()) > -1) );
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
      message: 'Estamos finalizando a consulta aos dados...',
      duration: 4000
    });
  if(a=="start"){
    await loading.present();}
  else{
    await loading.onDidDismiss();
  }
  }

  showLoader() {

    this.loadingController.create({
      message: 'Estamos consultando os dados...'
    }).then((res) => {
      res.present();
      this.CarregaLista();
    });
  
  }
  
  hideLoader() {
  
    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      this.presentAlert("Aconteceu um erro e não soubemos identificar!", "Nos desculpe");
    this.router.navigate(['../../home']);
    });
  
  }
}
