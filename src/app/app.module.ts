import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ChartModule } from 'angular2-highcharts';
import { TemperaturaPage } from '../pages/temperatura/temperatura';
import { DweetServiceProvider } from '../providers/dweet-service/dweet-service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import * as highcharts from 'Highcharts';
import { LuminosidadePage } from '../pages/luminosidade/luminosidade';

@NgModule({
  declarations: [
    MyApp,
    Home,
    TemperaturaPage,
    LuminosidadePage 
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    ChartModule.forRoot(highcharts),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    TemperaturaPage,
    LuminosidadePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DweetServiceProvider
  ]
})
export class AppModule {}
