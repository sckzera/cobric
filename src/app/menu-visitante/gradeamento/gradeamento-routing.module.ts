import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradeamentoPage } from './gradeamento.page';

const routes: Routes = [
  {
    path: '',
    component: GradeamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradeamentoPageRoutingModule {}
