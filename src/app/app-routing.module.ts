import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login-visitante',
    loadChildren: () => import('./login-visitante/login-visitante.module').then( m => m.LoginVisitantePageModule)
  },
  {
    path: 'menu-visitante',
    loadChildren: () => import('./menu-visitante/menu-visitante.module').then( m => m.MenuVisitantePageModule)
  },  {
    path: 'rankingpopular',
    loadChildren: () => import('./rankingpopular/rankingpopular.module').then( m => m.RankingpopularPageModule)
  },
  {
    path: 'login-avaliador',
    loadChildren: () => import('./login-avaliador/login-avaliador.module').then( m => m.LoginAvaliadorPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
