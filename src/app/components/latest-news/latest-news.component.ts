import { Component, OnInit } from '@angular/core';
import { NewsApiService } from 'src/app/services/news-api.service';


@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {

  mArticles:Array<any>;
  mSources:Array<any>;

  constructor(private newsapi:NewsApiService) {
    console.log('component constructor called');
   }

  ngOnInit() {
    //load articles
    // this.newsapi.initArticles().subscribe(data => this.mArticles = data['articles']);
    //load news sources
    this.newsapi.initSources().subscribe(data => this.mSources = data['sources']);
    //subscribe to stream of articles
    this.newsapi.currentSource$.subscribe(value => this.mArticles = value['articles']);
  }

  ngOnChanges() {
    this.newsapi.initArticles().subscribe(data => this.mArticles = data['articles']);
  }

  searchArticles(source) {
    console.log("selected source is: " + source);
    this.newsapi.getArticlesByID(source).subscribe(data => this.mArticles = data['articles']);
  }

}
