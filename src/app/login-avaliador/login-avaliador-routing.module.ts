import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginAvaliadorPage } from './login-avaliador.page';

const routes: Routes = [
  {
    path: '',
    component: LoginAvaliadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginAvaliadorPageRoutingModule {}
