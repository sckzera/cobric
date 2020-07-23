import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import _ from 'lodash';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gradeamento',
  templateUrl: './gradeamento.page.html',
  styleUrls: ['./gradeamento.page.scss'],
})
export class GradeamentoPage implements OnInit {
  trabalhos: Array<{titulo: string, codigo: string, autores:string, orientador:string, data:string}>
  alltrabalhos:any;
  queryText:string;
   
  constructor(private router:Router, private http: HttpClient) {
    this.queryText = '';
    const headers = {'accept': 'application/json'}
    this.http.get<any>('https://localhost:5001/gradeamentos' , { headers }).subscribe(data => {
        this.trabalhos = data;
        this.alltrabalhos = this.trabalhos; 
        //console.log(this.trabalhos);
       }, error => {
      console.log("ERRO", error)
    });
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
