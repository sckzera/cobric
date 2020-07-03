import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginVisitantePageRoutingModule } from './login-visitante-routing.module';

import { LoginVisitantePage } from './login-visitante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginVisitantePageRoutingModule
  ],
  declarations: [LoginVisitantePage]
})
export class LoginVisitantePageModule {}
