import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from "./../services/user.service";

@Component({
  selector: 'app-menu-visitante',
  templateUrl: './menu-visitante.page.html',
  styleUrls: ['./menu-visitante.page.scss'],
})
export class MenuVisitantePage implements OnInit {
  nomeGlobal: any;
  emailGlobal:any;
  constructor(private userServ: UserService, private router:Router) { }

  ngOnInit() {
    this.userServ.serviceData
      .subscribe(data => (this.nomeGlobal = data));
      this.userServ.serviceData2
      .subscribe(data2 => (this.emailGlobal = data2));
  }

  voltarMenu(){
    this.nomeGlobal = null;
    this.emailGlobal = null;
    this.router.navigate(['../login-visitante']);
  }
}