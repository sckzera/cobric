import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradeamentoPageRoutingModule } from './gradeamento-routing.module';

import { GradeamentoPage } from './gradeamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GradeamentoPageRoutingModule
  ],
  declarations: [GradeamentoPage]
})
export class GradeamentoPageModule {}
