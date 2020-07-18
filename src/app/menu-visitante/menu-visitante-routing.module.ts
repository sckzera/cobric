import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuVisitantePage } from './menu-visitante.page';

const routes: Routes = [
  {
    path: '',
    component: MenuVisitantePage
  },
  {
    path: 'localizacao',
    loadChildren: () => import('./localizacao/localizacao.module').then( m => m.LocalizacaoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuVisitantePageRoutingModule {}
