import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-gradeamento',
  templateUrl: './gradeamento.page.html',
  styleUrls: ['./gradeamento.page.scss'],
})
export class GradeamentoPage implements OnInit {
  trabalhos: Array<{titulo: string, codigo: string, autores:string, orientador:string, data:string}>
  alltrabalhos:any;
  queryText:string;
   
  constructor(private router:Router, private http: HttpClient, public alertController: AlertController, public loadingController: LoadingController) {
    this.queryText = '';
    this.presentLoading();   
 }
 // Metodo de Alerta.
 async presentAlert(mensagemAlerta, tituloAlerta ) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: tituloAlerta,
    message: mensagemAlerta,
    buttons: ['OK']
  });
  
  await alert.present();
}
// Metodo chamado para carregar os Dados do Gradeamento.
async presentLoading() {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Estamos consultando...',
    duration: 2000
  });
  await loading.present();
  const headers = {'accept': 'application/json'}
    this.http.get<any>('https://localhost:5051/gradeamentos' , { headers }).subscribe(data => {
        this.trabalhos = data;
        this.alltrabalhos = this.trabalhos; 
        
       }, error => {
      this.presentAlert("Aconteceu um Erro ao consultar os dados!", "Nos desculpe");
      this.router.navigate(['../menu-visitante']);
    });
}

  ngOnInit() {
  }
// Metodo para filtrar no buscar
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
}
