import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { DweetSettingsEnum } from '../../enum/DweetSettingsEnum';
import { Dweet } from '../../models/dweet';
import { With } from '../../models/with';
import { Content } from '../../models/content';

/*
  Generated class for the DweetServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DweetServiceProvider {

  private dweetioApiUrlGetAll = DweetSettingsEnum.DWEET_URL_GET_ALL;
  private dweetioApiUrlGet = DweetSettingsEnum.DWEET_URL_GET;
  private dweetioApiUrlPost = DweetSettingsEnum.DWEET_URL_POST;

  constructor(public http: HttpClient) {
  }

  loadLastDweets(thingName: string){
    return this.http.get(this.dweetioApiUrlGetAll + thingName)
  }

  loadLastDweet(thingName: string){
    return this.http.get(this.dweetioApiUrlGet + thingName)
  }

  sendBuzzerInfo(thingName: string, info: any){
    return this.http.post(this.dweetioApiUrlPost + thingName, { "buzzer": info })
  }

  preencherDweet(data: any){
    let dweet: Dweet;
    let _withs: Array<With>;
    let _date: string;
    let _time: string;

    _withs = new Array<With>();

    if(data.with == undefined) return;
    
    for(let _with of data.with){

      let content: Content;
      content = new Content(_with.content.temp, _with.content.lum, _with.content.button, _with.content.touch, _with.content.status);

      _date = this.formatDate(_with.created);
      _time = this.formatTime(_with.created);

      let awith: With;
      awith = new With(_with.thing, _with.created, content, _date, _time);

      _withs.push(awith);
    }

    dweet = new Dweet(data.this, data.by, data.the, _withs)

    return dweet;
  }

  private formatDate(date: any): string {
    let originalDate: string = date;
    var dateParse = originalDate.slice(0,10);

    return dateParse
  }

  private formatTime(date: any): string {
    let originalDate: string = date;
    var timeParse = originalDate.slice(11,19);

    return timeParse
  }


}

