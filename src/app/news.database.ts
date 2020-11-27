import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { API_KEY, COUNTRIES, NEWS } from './models';

@Injectable()

export class NewsAppDB extends Dexie {

    apiKey: Dexie.Table<API_KEY, number>
    countries: Dexie.Table<COUNTRIES, number>
    news: Dexie.Table<NEWS, number>

    constructor() {
        super('MyNewsAppDB')

        this.version(1).stores({
            apiKey: '++apiKeyId',
            countries: '++countriesId',
            news: '++newsId'
          })
      
        this.apiKey = this.table('apiKey')
        this.countries = this.table('countries')
        this.news = this.table('news')
    }

    //Api key collection methods
    getApiKey() :Promise<any> {
        return this.apiKey.toArray()
    }

    saveApiKey(apiKey: API_KEY) :Promise<any> {
        return this.apiKey.put(apiKey)
    }

    deleteApiKey(apiKey: API_KEY) {
        return this.apiKey.where('apiKeyId').equals(apiKey.apiKeyId).delete()
    }

    //Countries list collection methods 
    getCountriesList() : Promise<any> {
        return this.countries.toArray()
    }

    saveCountriesList(countriesList: COUNTRIES) :Promise<any> {
        return this.countries.put(countriesList)
    }


    //News
    saveNews(news: NEWS ) {
        return this.news.put(news)
    }

}