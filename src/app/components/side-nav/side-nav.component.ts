import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { NewsApiService } from 'src/app/services/news-api.service';


const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  panelOpenState = false;
  opened: boolean = true;
  mSources:Array<any>;
  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;


  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(private router: Router,
              private countryService: ConfigService,
              private newsapi: NewsApiService) { }

  ngOnInit() {
    //load news sources
    this.newsapi.initSources().subscribe(data => this.mSources = data['sources']);
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  searchArticles(source) {
    this.newsapi.getArticlesByID(source);
  }

}
