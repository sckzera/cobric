import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-votar',
  templateUrl: './votar.page.html',
  styleUrls: ['./votar.page.scss'],
})
export class VotarPage implements OnInit {
tituloGlobal: any;
aleatorio:[];
  constructor(private userServ: UserService, private router:Router) { }

  ngOnInit() {
    this.userServ.serviceData3
    .subscribe(data =>(this.tituloGlobal = data));
    //console.log(this.tituloGlobal);
  }
  voltarMenu(){

    this.router.navigate(['../menu-visitante/pesquisar']);
  }
}
