import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewsAppDB } from './news.database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NewsApp';
  API_KEY: string

  constructor(private router: Router, private newsappdb: NewsAppDB) {}

  ngOnInit() {

    this.newsappdb.getApiKey().then(

      result => {
        this.API_KEY = result[0].apiKey
        if(this.API_KEY.length == 0) {
          this.router.navigate(['/auth'])
        }
        else{
          this.router.navigate(['/countries'])
        }
      }
    ).catch(e => this.router.navigate(['/auth']))
  
  }

}
