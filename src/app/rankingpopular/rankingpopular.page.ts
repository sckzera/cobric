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
    this.queryText = '';
    const headers = {'accept': 'application/json'}
  this.http.get<any>('https://votacaobackend.azurewebsites.net/votos' , { headers }).subscribe(data => {
    this.presentLoading();
      this.trabalhos = data;
      this.alltrabalhos = this.trabalhos; 
      var elemento = document.getElementById("labelconectando");
    elemento.hidden = true;
     }, error => {
    //this.presentAlert("Aconteceu um Erro ao consultar os dados!", "Nos desculpe");
    //this.router.navigate(['./home']);
    var elemento = document.getElementById("labelconectando");
    elemento.hidden = false;
  });
  
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

async presentLoading() {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Estamos consultando...',
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
}
