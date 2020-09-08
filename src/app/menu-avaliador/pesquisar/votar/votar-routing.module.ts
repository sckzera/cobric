import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VotarPage } from './votar.page';

const routes: Routes = [
  {
    path: '',
    component: VotarPage
  },
  {
    path: 'avaliar',
    loadChildren: () => import('./avaliar/avaliar.module').then( m => m.AvaliarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VotarPageRoutingModule {}
