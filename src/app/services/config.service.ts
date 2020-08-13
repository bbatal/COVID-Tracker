import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { keys } from 'highcharts';
import { CountryCodeService } from './country-code.service';
import { Country } from '../models/country';

type iresponse = { 
  [key: string]: [{
    "date": string,
    "confirmed": number,
    "deaths": number,
    "recovered": number
  }]
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  url = 'https://pomber.github.io/covid19/timeseries.json';


  constructor(private http: HttpClient, private service: CountryCodeService) { }

  returnActive(): Observable<iresponse[]> {
    return this.http.get<iresponse[]>(this.url).pipe(map(data => {
        let keys = Object.keys(data);
        let temparr= [];
        keys.forEach(item => {
          let countryCode = this.service.getCountryName(item);
          temparr.push([countryCode, + '' + data[item][data[item].length-1]["confirmed"]-data[item][data[item].length-1]["recovered"]-data[item][data[item].length-1]["deaths"]]);
        })
        return temparr;
      }))
  }
i: number = 0;
  returnConfirmed(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url).pipe(map(data => {
      let keys = Object.keys(data);
      let temparr= [];
      keys.forEach(item => {
        temparr.push([this.i, item, data[item][data[item].length-1]["confirmed"]]);
        this.i++;
      })
      return temparr;
    }))
  }
}
