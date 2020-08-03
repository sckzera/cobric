import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import _ from 'lodash';
import { UserService } from "../../services/user.service";
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

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
  constructor(private router:Router, private userServ: UserService, private http: HttpClient, public alertController: AlertController) { 
    
    this.queryText = '';
    const headers = {'accept': 'application/json'}
    this.http.get<any>('https://localhost:5001/gradeamentos' , { headers }).subscribe(data => {
        this.trabalhos = data;
        this.alltrabalhos = this.trabalhos; 
        //console.log(this.trabalhos);
       }, error => {
      console.log("ERRO", error)
    });
 //this.alltrabalhos = this.trabalhos;
                                   }

  ngOnInit() {
    console.log(this.date);
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
  SelecionaTrabalho(seila: any){
    console.log("Minha DATA " + seila.data);
    console.log("SISTEMA "+ this.date);
    console.log(seila);
    if(seila.data.includes(this.date)){
    this.userServ.changeData2(seila);
    this.router.navigate(['/menu-visitante/pesquisar/votar']);
    }
    
    else{
      this.presentAlert("Pois esse trabalho ainda não foi apresentado", "Voce não pode votar no grupo:" + seila.titulo);
    }
  }
}
