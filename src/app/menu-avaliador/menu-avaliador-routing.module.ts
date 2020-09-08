import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuAvaliadorPage } from './menu-avaliador.page';

const routes: Routes = [
  {
    path: '',
    component: MenuAvaliadorPage
  },
  {
    path: 'pesquisar',
    loadChildren: () => import('./pesquisar/pesquisar.module').then( m => m.PesquisarPageModule)
  },
  {
    path: 'gradeamento-avaliador',
    loadChildren: () => import('./gradeamento-avaliador/gradeamento-avaliador.module').then( m => m.GradeamentoAvaliadorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuAvaliadorPageRoutingModule {}
