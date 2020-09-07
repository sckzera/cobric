import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuAvaliadorPageRoutingModule } from './menu-avaliador-routing.module';

import { MenuAvaliadorPage } from './menu-avaliador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuAvaliadorPageRoutingModule
  ],
  declarations: [MenuAvaliadorPage]
})
export class MenuAvaliadorPageModule {}
