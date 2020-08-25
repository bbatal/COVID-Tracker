import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ConfigService } from 'src/app/services/config.service';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  updateFlag = true; //needed
  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions = {
    events: {
      load: this.getData().subscribe(x => {
        this.chartOptions.series[0].data = x;
      }),
      load2: this.getDate().subscribe(x => {
        this.chartOptions.xAxis.categories = x;
      })
    },
    series:[{
      data: [],
      type: 'area',
      showInLegend: false
    }],
    credits: {
      enabled: false
    },
  
    title: {
      text: 'WorldWide Confirmed Cases'
    },
    xAxis: {
      categories:[]
    },
    yAxis: {
      labels: {
        formatter: function() {
          return this.value / 1000000 + 'M';
        }
      },
      title: null
    }
  
    };
  constructor(private service: ConfigService) { }

  ngOnInit() {
    
  }

  //returns an array of total confirmed per day from all countries
getData() {
  return this.service.getFile().pipe(map(data => {
    let confirmedTotal = [];
    let number= data["Afghanistan"].length;
    let keys = Object.keys(data);

    for (let i = 0; i < number; i++) {
      let testArr = [];
      for (let prop of keys) {
        testArr.push(data[prop][i]["confirmed"]);
      }
      confirmedTotal.push(testArr.reduce((a,b) => a + b, 0));
    }
    return confirmedTotal;
 }))
}

//function to create dates for each option
getDate() {
  return this.service.getFile().pipe(map(data => {
    let datesArr = [];

    //need a random country to pull the number of dates from 
    let count = data["Afghanistan"].length

    for (let i = 0; i < count; i++) {
      let date = new Date(data["Afghanistan"][i]["date"]);
      let someDate = moment.utc(date, 'LLL').format('MMM' + '.' + 'D').toString();
      datesArr.push(someDate);
    }
    return datesArr;
  }))
}

}
