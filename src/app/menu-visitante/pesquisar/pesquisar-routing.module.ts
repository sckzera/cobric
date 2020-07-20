import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisarPage } from './pesquisar.page';

const routes: Routes = [
  {
    path: '',
    component: PesquisarPage
  },
  {
    path: 'votar',
    loadChildren: () => import('./votar/votar.module').then( m => m.VotarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesquisarPageRoutingModule {}
