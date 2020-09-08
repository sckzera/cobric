import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradeamentoAvaliadorPage } from './gradeamento-avaliador.page';

const routes: Routes = [
  {
    path: '',
    component: GradeamentoAvaliadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradeamentoAvaliadorPageRoutingModule {}
