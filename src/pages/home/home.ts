import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { TemperaturaPage } from '../temperatura/temperatura';
import { LuminosidadePage } from '../luminosidade/luminosidade';
import { DweetServiceProvider } from '../../providers/dweet-service/dweet-service';
import { DweetSettingsEnum } from '../../enum/DweetSettingsEnum';
import { Dweet } from '../../models/dweet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  private thingName: any;
  private thingNameBzz: any;
  private isLoading: boolean = true;
  private dweet: Dweet;
  private time: any;
  
  private botao: string = "Aguardando...";
  private toque: string = "Aguardando...";;
  private estado: string = "Aguardando...";;

  constructor(public navCtrl: NavController, private dweetService: DweetServiceProvider) {
    this.time = setInterval(() => {
      this.getLastDweets();
    },3000);
  }

  private getLastDweets(){
    this.dweetService.loadLastDweet(this.thingName).subscribe(
      data => this.preencherDweet(data),
      err => console.log(err),
      () => this.isLoading = false
    );
  }

  private preencherDweet(data: any){
    this.dweet = this.dweetService.preencherDweet(data);
    if(this.dweet != undefined){
      this.botao = this.dweet.with[0].content.getBotao();
      if(this.botao == '0') this.botao = "not pressed"
      else this.botao = "pressed"
      this.toque = this.dweet.with[0].content.getToque();
      this.estado = this.dweet.with[0].content.getEstado();
    }
  }

  goToTempPage(){
    this.navCtrl.push(TemperaturaPage);
  }

  goToLumPage(){
    this.navCtrl.push(LuminosidadePage);
  }

  startRingBuzzer(){
    this.dweetService.sendBuzzerInfo(this.thingNameBzz, 1).subscribe();
  }

  stopRingBuzzer(){
    this.dweetService.sendBuzzerInfo(this.thingNameBzz, 0).subscribe();
  }

  ngOnInit(){
    this.thingName = DweetSettingsEnum.DWEET_THING_NAME;
    this.thingNameBzz = DweetSettingsEnum.DWEET_BUZZER_NAME;
  }

}
