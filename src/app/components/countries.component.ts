import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COUNTRIES } from '../models';
import { NewsAppDB } from '../news.database';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(private http: HttpClient, private newsappdb: NewsAppDB) { }

  supportedCountries = 'ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za'
  countriesList


  async ngOnInit() {
    try{ 
      const r = await this.newsappdb.getCountriesList()
      //@ts-ignore
      if(r.length == 0) {
        console.log(">>> no countriesList, making http request")
        const result = await this.http.get(this.obtainURL()).toPromise()
        //console.log(result)
        //@ts-ignore
        this.countriesList = result.map(c => { return {name: c.name, flag: c.flag, code: c.alpha2Code.toLowerCase()}})
        await this.newsappdb.saveCountriesList(this.countriesList)
      }
      else{this.countriesList = r[0]}
    }catch(e){console.log(e)}
  }

    //Obtain baseURL
  obtainURL() {
    const supportCountryCodes = this.supportedCountries.split(" ");
    let baseURL = 'https://restcountries.eu/rest/v2/alpha?codes=';
    for (let cc in supportCountryCodes) {
      baseURL = baseURL + `${supportCountryCodes[cc]};`
    }
    return baseURL
  }

}
