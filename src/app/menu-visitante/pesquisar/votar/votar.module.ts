import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VotarPageRoutingModule } from './votar-routing.module';

import { VotarPage } from './votar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VotarPageRoutingModule
  ],
  declarations: [VotarPage]
})
export class VotarPageModule {}
