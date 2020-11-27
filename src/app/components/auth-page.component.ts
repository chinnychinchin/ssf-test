import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_KEY } from '../models';
import { NewsAppDB } from '../news.database';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  constructor(private fb: FormBuilder, private newsappdb: NewsAppDB, private router: Router) { }

  API_KEY
  apiKeyForm: FormGroup

  async ngOnInit() {

    this.makeForm()
    //Get api key from db(if any)
    try{
      this.API_KEY = await this.newsappdb.getApiKey()
      this.apiKeyForm.get('apiKey').setValue(this.API_KEY[0].apiKey)
    }
    catch{e => console.log(e)}

    
  }


  onAdd(){
    //console.log(this.apiKeyForm.value)
    this.newsappdb.saveApiKey(this.apiKeyForm.value)
    this.router.navigate(['/countries'])
  }

  makeForm() {
    this.apiKeyForm = this.fb.group({
      apiKey: this.fb.control('', [Validators.required])
    })
  }


  onDelete() {
    //console.log(this.API_KEY[0].apiKey)
    this.newsappdb.deleteApiKey(this.API_KEY)
  }

}
