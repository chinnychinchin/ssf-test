import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsAppDB } from '../news.database';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  constructor(private fb: FormBuilder, private newsappdb: NewsAppDB, private router: Router) { }

  apiKeyForm: FormGroup = this.fb.group({
    apiKey: this.fb.control('', [Validators.required])
  })

  ngOnInit(): void {

  }

  onAdd(){
    //console.log(this.apiKeyForm.value)
    this.newsappdb.saveApiKey(this.apiKeyForm.value)
    this.router.navigate(['/countries'])
  }

}
