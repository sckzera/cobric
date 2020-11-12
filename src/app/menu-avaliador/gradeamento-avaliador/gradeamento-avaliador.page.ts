import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-gradeamento-avaliador',
  templateUrl: './gradeamento-avaliador.page.html',
  styleUrls: ['./gradeamento-avaliador.page.scss'],
})
export class GradeamentoAvaliadorPage implements OnInit {
  trabalhos: Array<{titulo: string, codigo: string, autor:string, orientador:string, data:string}>
  alltrabalhos:any;
  queryText:string;
   
  constructor(private router:Router, private http: HttpClient, public alertController: AlertController, public loadingController: LoadingController) {
    this.showLoader();
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

CarregaLista(){
  this.queryText = '';
    const headers = {'accept': 'application/json'}
    this.http.get<any>('https://gradeamentobackend2.azurewebsites.net/gradeamentos' , { headers }).subscribe(data => {
      //var elemento = document.getElementById("labelconectando10");
       // elemento.hidden = true;
      //  var elemento2 = document.getElementById("labelconectando11");
      //  elemento2.hidden = true;
      
        this.trabalhos = data;
        this.alltrabalhos = this.trabalhos; 
        this.hideLoader();
       }, error => {
      this.hideLoader();
      this.presentAlert("Desculpe, não conseguimos consultar os dados!", "Aconteceu um Erro");
      this.router.navigate(['../menu-avaliador']);
    });
}
// Metodo chamado para carregar os Dados do Gradeamento.
async presentLoading(apresentacao:any) {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Estamos finalizando a consulta aos dados...',
    //duration: 3500
  });
if(apresentacao=="start"){
  await loading.present();}
else{
  await loading.dismiss();
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

  ngOnInit() {
  }
// Metodo para filtrar no buscar
  filterTrabalho(cid:any){
    let val = cid.target.value;
    if(val && val.trim() != ''){
      this.trabalhos = _.values(this.alltrabalhos);
      this.trabalhos = this.trabalhos.filter((trabalho) => {
        return ((trabalho.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1) || (trabalho.autor.toLowerCase().indexOf(val.toLowerCase()) > -1) || (trabalho.orientador.toLowerCase().indexOf(val.toLowerCase()) > -1) || (trabalho.codigo.toLowerCase().indexOf(val.toLowerCase()) > -1)  );
      })
    }
    else{
      this.trabalhos = this.alltrabalhos;
    }
    }
  voltarMenu(){
    this.router.navigate(['../menu-avaliador']);
  }
}

