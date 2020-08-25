declare var require: any;
import { map } from 'rxjs/operators';
import { Component, OnInit, HostListener } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import HC_exporting from 'highcharts/modules/exporting';
import { ConfigService } from 'src/app/services/config.service';
HC_exporting(Highcharts);

const MEDIUM_WIDTH_BREAKPOINT = 1100;
const SMALL_WIDTH_BREAKPOINT = 720;


const mapWorld = require('@highcharts/map-collection/custom/world.geo.json');


@Component({
  selector: 'app-world-cases',
  templateUrl: './world-cases.component.html',
  styleUrls: ['./world-cases.component.scss']
})
export class WorldCasesComponent implements OnInit {
  country; 
  totalCasesToday;
  totalCasesYesterday;

  totalDeathsToday;
  totalDeathsYesterday;

  totalRecoveredToday;
  totalRecoveredYesterday;

  totalActiveToday;
  totalActiveYesterday;

  private mediaMatcherMEDIUM: MediaQueryList = matchMedia(`(max-width: ${MEDIUM_WIDTH_BREAKPOINT}px)`);
  private mediaMatcherSMALL: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  option = {
    prefix: "(+",
    suffix: ")",
    
  };

  option2 = {
    prefix: "(",
    suffix: ")"
  }

  lastUpdate;
  Highcharts: typeof Highcharts = Highcharts; // required
  updateFlag = true;
  chartMap = {
    chart: {
      map: mapWorld,
      backgroundColor: null
    },
    credits: {
      enabled: false
    },
    title: {
      text: 'Total Active'
    },
    subtitle: {
      text: null
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: 'spacingBox'
      }
    },
    legend: {
      enabled: false
    },
    colorAxis: {
      min: 0
    },
    series: [{
      name: 'Total Active Cases',
      states: {
        hover: {
          color: '#BADA55'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      },
      allAreas: false,
      data: []
    } as Highcharts.SeriesMapOptions,
    // {
      // Specify points using lat/lon
      // type: 'mappoint',
      // name: 'Canada cities',
      // color: 'tomato',
      // data: [
      //   {
      //     name: 'Vancouver',
      //     lat: 49.246292,
      //     lon: -123.116226
      //   },
      //   {
      //     name: 'Quebec City',
      //     lat: 46.829853,
      //     lon: -71.254028
      //   },
      //   {
      //     name: 'Yellowknife',
      //     lat: 62.4540,
      //     lon: -114.3718
    //   //   }
    //   ]
    // } as Highcharts.SeriesMappointOptions
  ]
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isScreenSmallOrMedium();
    };


  constructor(private service: ConfigService) { }

  ngOnInit() {
    setTimeout(() => {
      this.country = this.service.returnActive().subscribe(x => {
        this.chartMap.series[0].data = x;
        this.updateFlag = !this.updateFlag;
       });
       this.lastUpdate = this.service.latestDate();
    }, 500)

    this.isScreenSmallOrMedium();
  }

  isScreenSmallOrMedium() {
    if(this.mediaMatcherMEDIUM.matches || this.mediaMatcherSMALL.matches) {
      this.service.totalCases().subscribe(data => {
        this.totalCasesToday = data[0];
        this.totalCasesYesterday = data[1];
        this.totalDeathsToday = data[2];
        this.totalDeathsYesterday = data[3];
        this.totalRecoveredToday = data[4];
        this.totalRecoveredYesterday = data[5];
        this.totalActiveToday = data[6];
        this.totalActiveYesterday = data[7];
      })
    }
  }


}
