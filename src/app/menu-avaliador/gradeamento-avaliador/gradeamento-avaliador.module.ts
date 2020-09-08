import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradeamentoAvaliadorPageRoutingModule } from './gradeamento-avaliador-routing.module';

import { GradeamentoAvaliadorPage } from './gradeamento-avaliador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GradeamentoAvaliadorPageRoutingModule
  ],
  declarations: [GradeamentoAvaliadorPage]
})
export class GradeamentoAvaliadorPageModule {}
