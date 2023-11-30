import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  api_key = 'fb91ed73ca334daa86cb03d3af7d83a1';
  private Source = new BehaviorSubject('techcrunch&');
  currentSource$ = this.Source.asObservable();
  defaultValue = 'techcrunch';

  constructor(private http:HttpClient) { }

  initSources(){
    return this.http.get('https://newsapi.org/v2/sources?language=en&' + 'category=business&' + 'apiKey='+this.api_key);
  }

  initArticles(){
    this.currentSource$.subscribe(e => this.defaultValue = e);
    return this.http.get('https://newsapi.org/v2/everything?' + 'q=Coronavirus&' + 'from=2020-10-31&' +
    'sortBy=popularity&' + 'sources='+this.defaultValue+'language=en&' + 'apiKey=' +this.api_key);
   }

   getArticlesByID(source) {
     this.Source.next(source);
     this.defaultValue = source;
     this.currentSource$.pipe(mergeMap(value => { return this.http.get('https://newsapi.org/v2/everything?' + 'q=Coronavirus&' + 'from=2020-10-31&' + 'sortBy=popularity&' + 'sources='+value+'&apiKey='+this.api_key)})).subscribe(value => console.log(value));
     return this.http.get('https://newsapi.org/v2/everything?' + 'q=Coronavirus&' + 'from=2020-10-31&' + 'sortBy=popularity&' + 'sources='+this.defaultValue+'&apiKey='+this.api_key);
   }
}
