import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-informacoes',
  templateUrl: './informacoes.page.html',
  styleUrls: ['./informacoes.page.scss'],
})
export class InformacoesPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }


  voltarMenu(){
    this.router.navigate(['../menu-visitante']);
  }
}
