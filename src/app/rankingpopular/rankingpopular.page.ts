import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-rankingpopular',
  templateUrl: './rankingpopular.page.html',
  styleUrls: ['./rankingpopular.page.scss'],
})
export class RankingpopularPage implements OnInit {
  trabalhos: Array<{idVotos: string, idGradeamento: string, totalVotos:number, tituloTrabalho:string}>
  alltrabalhos:any;
  queryText:string;
   
  constructor(private router:Router, private http: HttpClient, public alertController: AlertController, public loadingController: LoadingController) {
  
  this.showLoader();
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
  this.http.get<any>('https://votacaobackend2.azurewebsites.net/votos' , { headers }).subscribe(data => {
      this.trabalhos = data;
      this.alltrabalhos = this.trabalhos; 
      this.hideLoader();
     }, error => {
       this.hideLoader();
    this.presentAlert("Aconteceu um Erro ao consultar os dados!", "Nos desculpe");
    this.router.navigate(['./home']);
  });
};


async presentLoading() {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Estamos finalizando a consulta aos dados...',
    duration: 3000
  });
  
  await loading.present();
}

  ngOnInit() {
  }

  filterTrabalho(cid:any){
    let val = cid.target.value;
    if(val && val.trim() != ''){
      this.trabalhos = _.values(this.alltrabalhos);
      this.trabalhos = this.trabalhos.filter((trabalho) => {
        return (trabalho.tituloTrabalho.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else{
      this.trabalhos = this.alltrabalhos;
    }
    }
  voltarMenu(){
    this.router.navigate(['./home']);
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
    this.router.navigate(['../home']);
    });
  
  }
}
