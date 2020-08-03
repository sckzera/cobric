import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingpopularPageRoutingModule } from './rankingpopular-routing.module';

import { RankingpopularPage } from './rankingpopular.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingpopularPageRoutingModule,
    HttpClientModule
  ],
  declarations: [RankingpopularPage]
})
export class RankingpopularPageModule {}
