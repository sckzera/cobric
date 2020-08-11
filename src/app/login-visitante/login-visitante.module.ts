import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginVisitantePageRoutingModule } from './login-visitante-routing.module';

import { LoginVisitantePage } from './login-visitante.page';

import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginVisitantePageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [LoginVisitantePage]
})
export class LoginVisitantePageModule {}
