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

  totalCases() {
    return this.http.get(this.url).pipe(map(data => {
      let keys = Object.keys(data);
      let arr = [];
      let totalCasesToday = 0;
      let totalCasesYesterday = 0;
      let totalDeathsToday = 0;
      let totalDeathsYesterday = 0;
      let totalRecoveredToday = 0;
      let totalRecoveredYesterday = 0;
      let activeCasesToday = 0;
      let activeCasesYesterday = 0;
      keys.forEach(item => {
        totalCasesToday += data[item][data[item].length-1]["confirmed"];
        totalCasesYesterday += data[item][data[item].length-2]["confirmed"];
        totalDeathsToday += data[item][data[item].length-1]["deaths"];
        totalDeathsYesterday += data[item][data[item].length-2]["deaths"];
        totalRecoveredToday += data[item][data[item].length-1]["recovered"];
        totalRecoveredYesterday += data[item][data[item].length-2]["recovered"];
        activeCasesToday += (data[item][data[item].length-1]["confirmed"] - data[item][data[item].length-1]["recovered"] - data[item][data[item].length-1]["deaths"]);
        activeCasesYesterday += (data[item][data[item].length-2]["confirmed"] - data[item][data[item].length-2]["recovered"] - data[item][data[item].length-2]["deaths"])
      })

      arr.push(totalCasesToday, totalCasesToday - totalCasesYesterday, totalDeathsToday, totalDeathsToday - totalDeathsYesterday, totalRecoveredToday, totalRecoveredToday - totalRecoveredYesterday, activeCasesToday, activeCasesToday - activeCasesYesterday);


    return arr;
  },
  error => {
    console.log('Failed to fetch users');
  }
  ));
}


latestDate() {
  return this.http.get(this.url).pipe(map(data => {
    return data["Afghanistan"][data["Afghanistan"].length-1]["date"];
  }))
}
}
