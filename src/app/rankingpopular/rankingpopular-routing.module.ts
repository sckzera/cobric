import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankingpopularPage } from './rankingpopular.page';

const routes: Routes = [
  {
    path: '',
    component: RankingpopularPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingpopularPageRoutingModule {}
