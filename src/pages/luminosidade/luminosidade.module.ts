import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LuminosidadePage } from './luminosidade';

@NgModule({
  declarations: [
    LuminosidadePage,
  ],
  imports: [
    IonicPageModule.forChild(LuminosidadePage),
  ],
})
export class LuminosidadePageModule {}
