import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from "../../../../services/user.service";
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.page.html',
  styleUrls: ['./avaliar.page.scss'],
})
export class AvaliarPage implements OnInit {
q1resposta:number;
q2resposta:number;
q3resposta:number;
q4resposta:number;
q5resposta:number;
q6resposta:number;
q7resposta:number;
q8resposta:number;
q9resposta:number;
q10resposta:number;
q11resposta:number;
qtotal:number;

tituloGlobal: string;
newTrustFormVisible = false;
idGradeamento:string;
vetorUser:string;
idUsuario:string;
totalVotos = 0;
tituloTrabalho:string;
variavelqualquer:string;
CodigoUuid:string;
  constructor(public alertController: AlertController, private router:Router, private userServ: UserService, private http: HttpClient, public loadingController: LoadingController) { }

  ngOnInit() {
    this.userServ.serviceData3
      .subscribe(data =>(this.tituloGlobal = data));
      this.userServ.serviceData2
      .subscribe(data =>(this.vetorUser = data));
      this.tituloTrabalho = this.tituloGlobal["titulo"];
      this.idGradeamento = this.tituloGlobal["idGradeamento"];
     if(this.vetorUser=="{ERRO}" || this.tituloGlobal["idGradeamento"] =="{ERRO}"){
      this.presentAlert("Faça o Login novamente.", "Aconteceu um Erro");
     // this.router.navigate(['../../home']);
     }
   
  }

  votar(){
    if(this.q1resposta == null || this.q2resposta == null || this.q3resposta == null || this.q4resposta == null || this.q5resposta == null || this.q6resposta == null || this.q7resposta == null || this.q8resposta == null || this.q9resposta == null || this.q10resposta == null || this.q11resposta == null){
      this.presentAlert("", "Atenção, possuem campos não preenchidos.");
    }
    else{
      this.showLoader();
  
      
    }
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
CarregaVotacao(){
  this.qtotal = Number(this.q1resposta) + Number(this.q2resposta) + Number(this.q3resposta) + Number(this.q4resposta) + Number(this.q5resposta) + Number(this.q6resposta) + Number(this.q7resposta) + Number(this.q8resposta) + Number(this.q9resposta) + Number(this.q10resposta) ;
      var headers = {'codigoAvaliador': this.vetorUser, 'codigoResumo': this.idGradeamento};
      const body = { relevancia: Number(this.q1resposta), adequacao: Number(this.q2resposta), coerencia: Number(this.q3resposta), apresentacaoAdequada: Number(this.q4resposta), avaliacaoResumo: Number(this.q5resposta),  qualidade : Number(this.q6resposta), apresentacaoOral: Number(this.q7resposta), contribuicaoDesenvolvimento: Number(this.q8resposta) , contribuicaoComunidade: Number(this.q9resposta) , avaliacaoGeral:Number(this.q10resposta), somaDasNotas: Number(this.qtotal), premioTeixeira: Number(this.q11resposta) }
      this.http.post('https://avaliadoresbackend2.azurewebsites.net/avaliacoes', body,  {headers} ).subscribe(response => {
        this.hideLoader();
        if(this.q11resposta == 1)
        {
          this.presentAlert("Enviado a Votação com Total de " + this.qtotal + " e o grupo FOI indicado ao prêmio Milton Teixeira", "GRUPO (" + this.tituloTrabalho + ")");

        }
        else{
          this.presentAlert("Enviado a Votação com Total de " + this.qtotal + " e o grupo NÃO foi indicado ao prêmio Milton Teixeira", "GRUPO (" + this.tituloTrabalho + ")");
          
        }
      }, error => {
        this.hideLoader();
       this.variavelqualquer = error['error']['mensagem'];
        if(this.variavelqualquer.includes('avaliacao')){
         this.CodigoUuid = this.variavelqualquer.substr(51,87);
          this.presentAlertConfirm(this.CodigoUuid);

        }
        else{
          this.presentAlert("Votação não foi Concluida!", "Aconteceu um Erro");
          this.router.navigate(['../../home']);

        }
      })
}
voltarMenu(){

  this.router.navigate(['../menu-avaliador/pesquisar']);
}

async presentAlertConfirm(Uuid:string) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Caro Avaliador, parece que você ja votou nesse Grupo!',
    message: 'Você deseja sobrescrever a sua votação?',
    buttons: [
      {
        text: 'Não',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'Sim',
        handler: () => {
          this.qtotal = Number(this.q1resposta) + Number(this.q2resposta) + Number(this.q3resposta) + Number(this.q4resposta) + Number(this.q5resposta) + Number(this.q6resposta) + Number(this.q7resposta) + Number(this.q8resposta) + Number(this.q9resposta) + Number(this.q10resposta) ;
     var headers = {'accept': '*/*', 'Content-Type': 'application/json'};
      const body = { relevancia: Number(this.q1resposta), adequacao: Number(this.q2resposta), coerencia: Number(this.q3resposta), apresentacaoAdequada: Number(this.q4resposta), avaliacaoResumo: Number(this.q5resposta),  qualidade : Number(this.q6resposta), apresentacaoOral: Number(this.q7resposta), contribuicaoDesenvolvimento: Number(this.q8resposta) , contribuicaoComunidade: Number(this.q9resposta) , avaliacaoGeral:Number(this.q10resposta), somaDasNotas: Number(this.qtotal), premioTeixeira: Number(this.q11resposta) }
      this.http.put('https://avaliadoresbackend2.azurewebsites.net/avaliacoes/'+Uuid, body, {headers} ).subscribe(response => {
        if(this.q11resposta == 1)
        {
          this.presentAlert("Enviado a Votação com Total de " + this.qtotal + " e o grupo FOI indicado ao prêmio Milton Teixeira", "Dados atualizados com Sucesso.");
        }
        else{
          this.presentAlert("Enviado a Votação com Total de " + this.qtotal + " e o grupo NÃO foi indicado ao prêmio Milton Teixeira", "Dados atualizados com Sucesso.");
        }
      }, error => {
    
        this.presentAlert("ao Atualizar os dados, por gentileza, tente novamente!", "Aconteceu um Erro");
        this.router.navigate(['../../home']);
      })
        }
      }
    ]
  });

  await alert.present();
}


showLoader() {

  this.loadingController.create({
    message: 'Validando informações...'
  }).then((res) => {
    res.present();
    this.CarregaVotacao();
  });

}

hideLoader() {

  this.loadingController.dismiss().then((res) => {
    console.log('Loading dismissed!', res);
  }).catch((error) => {
    this.presentAlert("Aconteceu um erro e não soubemos identificar!", "Nos desculpe");
    this.router.navigate(['../../../../home']);
  });

}
}
