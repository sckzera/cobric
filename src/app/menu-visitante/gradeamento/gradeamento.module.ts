import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradeamentoPageRoutingModule } from './gradeamento-routing.module';

import { GradeamentoPage } from './gradeamento.page';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GradeamentoPageRoutingModule,
    HttpClientModule

  ],
  declarations: [GradeamentoPage]
})
export class GradeamentoPageModule {}
