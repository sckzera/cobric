import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuVisitantePageRoutingModule } from './menu-visitante-routing.module';

import { MenuVisitantePage } from './menu-visitante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuVisitantePageRoutingModule
  ],
  declarations: [MenuVisitantePage]
})
export class MenuVisitantePageModule {}
