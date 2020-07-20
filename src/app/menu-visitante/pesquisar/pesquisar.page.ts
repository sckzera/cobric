import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {
trabalhos: Array<{titulo: string, codigo: string}>
alltrabalhos:any;
queryText:string;
  constructor(private router:Router) { 
    this.queryText = '';
    this.trabalhos = [
      {titulo: 'Paulo Freire na saúde pública', codigo:'6655'},
      {titulo: 'Mercanee Treinamento para PCD', codigo: '6655'},
      {titulo: 'Jogos pedagógicos', codigo:'6655'},
      {titulo: 'Vértice software para auxílio educacional', codigo:'6655'}
    ];
 this.alltrabalhos = this.trabalhos;
                                    }

  ngOnInit() {
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
}
