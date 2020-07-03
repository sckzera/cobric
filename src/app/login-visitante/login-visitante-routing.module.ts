import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginVisitantePage } from './login-visitante.page';

const routes: Routes = [
  {
    path: '',
    component: LoginVisitantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginVisitantePageRoutingModule {}
