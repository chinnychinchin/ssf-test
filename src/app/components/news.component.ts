import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_KEY, NEWS } from '../models';
import { NewsAppDB } from '../news.database';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private newsappdb: NewsAppDB) { }

  country 
  API_KEY: API_KEY
  news: []
  newsObj: NEWS

  async ngOnInit() {

    this.country = this.activatedRoute.snapshot.params.country
    try{
      this.API_KEY = await this.newsappdb.getApiKey()
      //console.log(this.API_KEY)
    }
    catch{e => console.log(e)}

    //Make request to News Api
    try{

      const results = await this.getNewNews(this.API_KEY[0].apiKey, this.country)
      //@ts-ignore
      this.news = results.articles.map(a => {return {source: a.source.name, author: a.author, title: a.title, description: a.description, url: a.url, image: a.urlToImage, date: a.publishedAt, content: a.content }})
      //Make news object into model for saving


    }catch{e => {console.log(e)}}
    
  }


  getNewNews(key,country) {
    const ENDPOINT = 'https://newsapi.org/v2/top-headlines?'
    const params = new HttpParams().set('country', country).set('pageSize', '30').set('category', 'general')
    return this.http.get(ENDPOINT, {headers: new HttpHeaders({
      'X-Api-Key': key
    }), params: params}).toPromise()
  }

}
